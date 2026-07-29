export type TemplateValue = string | number | boolean | null | TemplateData | TemplateValue[];
export type TemplateData = { [key: string]: TemplateValue };

export function isTemplateValue(value: unknown, depth = 0): value is TemplateValue {
  if (depth > 12) return false;
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.every((entry) => isTemplateValue(entry, depth + 1));
  return isTemplateData(value, depth + 1);
}

export function isTemplateData(value: unknown, depth = 0): value is TemplateData {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((entry) => isTemplateValue(entry, depth + 1));
}

function mergeValue(defaultValue: TemplateValue, overrideValue: TemplateValue): TemplateValue {
  if (
    defaultValue && typeof defaultValue === "object" && !Array.isArray(defaultValue) &&
    overrideValue && typeof overrideValue === "object" && !Array.isArray(overrideValue)
  ) {
    return mergeRecords(defaultValue, overrideValue);
  }
  return overrideValue;
}

function isColorRecord(value: TemplateValue | undefined): value is TemplateData {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function legacyColors(colors: TemplateData): TemplateData {
  const read = (...keys: string[]) => {
    for (const key of keys) {
      const value = colors[key];
      if (typeof value === "string") return value;
    }
    return undefined;
  };

  return {
    ...colors,
    primary: read("primary", "accent") ?? "#3146d3",
    secondary: read("secondary", "accentSecondary", "sectionAlt", "surface") ?? "#eef2ff",
    accent: read("accent", "primary") ?? "#3146d3",
    background: read("pageBackground", "background") ?? "#ffffff",
    text: read("bodyText", "text", "textPrimary") ?? "#111827",
    buttonText: read("buttonText") ?? "#ffffff",
  };
}

function mergeRecords(defaults: TemplateData, overrides: TemplateData): TemplateData {
  const result: TemplateData = { ...defaults };
  const overrideColors = isColorRecord(overrides.colors) ? legacyColors(overrides.colors) : undefined;

  if (overrideColors && isRuntimeRecord(defaults.brand)) {
    const defaultBrand = defaults.brand as TemplateData;
    if (isRuntimeRecord(defaultBrand.colors)) {
      result.brand = {
        ...defaultBrand,
        colors: mergeRecords(defaultBrand.colors as TemplateData, overrideColors),
      };
    }
  }

  for (const [key, value] of Object.entries(overrides)) {
    result[key] = key === "colors" && overrideColors
      ? key in defaults ? mergeValue(defaults[key], overrideColors) : overrideColors
      : key in defaults ? mergeValue(defaults[key], value) : value;
  }
  return result;
}

export function mergeTemplateData<T extends Record<string, unknown>>(defaults: T, overrides: TemplateData | undefined): T & TemplateData {
  return mergeRecords(defaults as TemplateData, overrides ?? {}) as T & TemplateData;
}

function isRuntimeRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isRuntimeComponent(value: unknown): boolean {
  return typeof value === "function" || (
    isRuntimeRecord(value) &&
    "$$typeof" in value &&
    typeof value.$$typeof === "symbol"
  );
}

function mergeRuntimeValue(defaultValue: unknown, overrideValue: unknown): unknown {
  if (overrideValue === undefined) return defaultValue;
  // React 19 forward-ref components (including Lucide icons) are objects,
  // not functions. Keep runtime components instead of replacing them with
  // their editable JSON labels such as "Star" or "MapPin".
  if (isRuntimeComponent(defaultValue)) return defaultValue;
  if (Array.isArray(defaultValue) && Array.isArray(overrideValue)) {
    return overrideValue.map((entry, index) =>
      index in defaultValue ? mergeRuntimeValue(defaultValue[index], entry) : entry,
    );
  }
  if (isRuntimeRecord(defaultValue) && isRuntimeRecord(overrideValue)) {
    const result: Record<string, unknown> = { ...defaultValue };
    for (const [key, value] of Object.entries(overrideValue)) {
      result[key] = key in defaultValue ? mergeRuntimeValue(defaultValue[key], value) : value;
    }
    return result;
  }
  return overrideValue;
}

export function bindTemplateContent<T extends Record<string, unknown>>(defaults: T, overrides: unknown): T & TemplateData {
  return mergeRuntimeValue(defaults, isRuntimeRecord(overrides) ? overrides : {}) as T & TemplateData;
}

export type TemplateTextGroup = {
  title: string;
  subtitle: string;
  button: string;
  text: string;
};

export function readTemplateTextGroup(source: TemplateData, key: string, fallback: Partial<TemplateTextGroup> = {}): TemplateTextGroup {
  const value = source[key];
  const record = isRuntimeRecord(value) ? value : {};
  return {
    title: typeof record.title === "string" ? record.title : fallback.title ?? "",
    subtitle: typeof record.subtitle === "string" ? record.subtitle : fallback.subtitle ?? "",
    button: typeof record.button === "string" ? record.button : fallback.button ?? "",
    text: typeof record.text === "string" ? record.text : fallback.text ?? "",
  };
}

function hasCompatibleShape(defaultValue: TemplateValue, candidate: TemplateValue): boolean {
  if (Array.isArray(defaultValue)) {
    if (!Array.isArray(candidate) || candidate.length !== defaultValue.length) return false;
    return candidate.every((entry, index) => hasCompatibleShape(defaultValue[index], entry));
  }
  if (defaultValue !== null && typeof defaultValue === "object") {
    if (candidate === null || typeof candidate !== "object" || Array.isArray(candidate)) return false;
    const candidateEntries = Object.entries(candidate);
    return candidateEntries.every(
      ([key, value]) => key in defaultValue && hasCompatibleShape(defaultValue[key], value),
    );
  }
  if (defaultValue === null) return candidate === null || ["string", "number", "boolean"].includes(typeof candidate);
  return typeof candidate === typeof defaultValue;
}

const EDITOR_COLOR_KEYS = new Set([
  "primary",
  "secondary",
  "background",
  "surface",
  "card",
  "text",
  "pageBackground",
  "sectionAlt",
  "cardBackground",
  "headingText",
  "bodyText",
  "mutedText",
  "textPrimary",
  "textSecondary",
  "accent",
  "accentSecondary",
  "buttonBg",
  "buttonText",
  "link",
  "border",
  "icon",
  "footerBg",
  "footerText",
  "footerMuted",
]);

function isCompatibleEditorMetadata(value: TemplateValue): boolean {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const metadata = value as TemplateData;
  return Object.entries(metadata).every(([key, entry]) => {
    if (key === "styles") {
      if (entry === null || typeof entry !== "object" || Array.isArray(entry)) return false;
      return Object.values(entry).every((style) => {
        if (style === null || typeof style !== "object" || Array.isArray(style)) return false;
        return Object.entries(style).every(([styleKey, styleValue]) =>
          ["fontSize", "fontWeight", "fontStyle", "textAlign", "letterSpacing"].includes(styleKey) &&
          typeof styleValue === "string" &&
          styleValue.length <= 32,
        );
      });
    }
    if (key === "hiddenSections") {
      if (entry === null || typeof entry !== "object" || Array.isArray(entry)) return false;
      return Object.values(entry).every((hidden) => typeof hidden === "boolean");
    }
    return false;
  });
}

export function isCompatibleTemplateData(defaults: TemplateData, candidate: TemplateData): boolean {
  return Object.entries(candidate).every(([key, value]) => {
    if (key === "colors") {
      if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
      return Object.entries(value).every(
        ([colorKey, color]) =>
          EDITOR_COLOR_KEYS.has(colorKey) &&
          typeof color === "string" &&
          /^#[0-9a-f]{6}$/i.test(color),
      );
    }
    if (key === "_editor") return isCompatibleEditorMetadata(value);
    return key in defaults && hasCompatibleShape(defaults[key], value);
  });
}
