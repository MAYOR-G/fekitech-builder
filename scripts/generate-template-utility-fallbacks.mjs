import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

const templateRoot = join(process.cwd(), "src/templates");
const fallbackStart = "/* GENERATED TEMPLATE TOKEN FALLBACKS START */";
const fallbackEnd = "/* GENERATED TEMPLATE TOKEN FALLBACKS END */";

const templateCssFiles = [
  "barber-website/index.css",
  "cake-website/index.css",
  "coffee-website/index.css",
  "dentist-website/index.css",
  "electrician-website/index.css",
  "gym-website/index.css",
  "ink-and-iron/index.css",
  "premium-coffee-website/index.css",
];

const colorUtilities = new Map([
  ["accent", "accent-color"],
  ["bg", "background-color"],
  ["border", "border-color"],
  ["caret", "caret-color"],
  ["decoration", "text-decoration-color"],
  ["fill", "fill"],
  ["outline", "outline-color"],
  ["ring", "--tw-ring-color"],
  ["stroke", "stroke"],
  ["text", "color"],
]);

function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return filesIn(path);
    return [path];
  });
}

function extractThemeTokens(css, type) {
  return [...css.matchAll(new RegExp(`--${type}-([a-zA-Z0-9-]+):\\s*([^;]+);`, "g"))].map((match) => ({
    name: match[1],
    value: match[2].trim(),
  }));
}

function stripGeneratedBlock(css) {
  const start = css.indexOf(fallbackStart);
  if (start === -1) return css.trimEnd();
  const end = css.indexOf(fallbackEnd, start);
  if (end === -1) return css.trimEnd();
  return (css.slice(0, start) + css.slice(end + fallbackEnd.length)).trimEnd();
}

function cssEscapeClass(className) {
  return className.replace(/[^a-zA-Z0-9_-]/g, (char) => `\\${char}`);
}

function colorWithOpacity(value, opacity) {
  if (!opacity) return value;
  if (opacity.startsWith("[") && opacity.endsWith("]")) {
    const raw = opacity.slice(1, -1);
    const numeric = Number(raw);
    const percent = Number.isFinite(numeric) && numeric <= 1 ? `${numeric * 100}%` : raw;
    return `color-mix(in srgb, ${value} ${percent}, transparent)`;
  }
  return `color-mix(in srgb, ${value} ${opacity}%, transparent)`;
}

function selectorFor(className) {
  const variants = className.split(":");
  const base = variants.pop();
  let selector = `.${cssEscapeClass(className)}`;
  const wrappers = [];

  for (const variant of variants) {
    if (variant === "hover") selector += ":hover";
    else if (variant === "active") selector += ":active";
    else if (variant === "focus") selector += ":focus";
    else if (variant === "focus-visible") selector += ":focus-visible";
    else if (variant === "focus-within") selector += ":focus-within";
    else if (variant === "disabled") selector += ":disabled";
    else if (variant === "group-hover") selector = `.group:hover ${selector}`;
    else if (variant === "selection") selector += "::selection";
    else if (variant === "sm") wrappers.push(["@media (width >= 40rem)", "}"]);
    else if (variant === "md") wrappers.push(["@media (width >= 48rem)", "}"]);
    else if (variant === "lg") wrappers.push(["@media (width >= 64rem)", "}"]);
    else if (variant === "xl") wrappers.push(["@media (width >= 80rem)", "}"]);
  }

  return { selector, wrappers, base };
}

function ruleForColorClass(className, utility, value, opacity) {
  const { selector, wrappers } = selectorFor(className);
  const color = colorWithOpacity(value, opacity);
  let body;

  if (utility === "divide") {
    body = `${selector} > :not(:last-child){border-color:${color};}`;
  } else if (utility === "from") {
    body = `${selector}{--tw-gradient-from:${color};--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from) var(--tw-gradient-from-position),var(--tw-gradient-to) var(--tw-gradient-to-position));}`;
  } else if (utility === "via") {
    body = `${selector}{--tw-gradient-via:${color};--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from) var(--tw-gradient-from-position),var(--tw-gradient-via) var(--tw-gradient-via-position),var(--tw-gradient-to) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops);}`;
  } else if (utility === "to") {
    body = `${selector}{--tw-gradient-to:${color};}`;
  } else {
    body = `${selector}{${colorUtilities.get(utility)}:${color};}`;
  }

  for (const [prefix, suffix] of wrappers.reverse()) {
    body = `${prefix}{${body}${suffix}`;
  }
  return body;
}

function ruleForFontClass(className, value) {
  const { selector, wrappers } = selectorFor(className);
  let body = `${selector}{font-family:${value};}`;
  for (const [prefix, suffix] of wrappers.reverse()) {
    body = `${prefix}{${body}${suffix}`;
  }
  return body;
}

function findUsedClasses(source, token, utilities) {
  const utilityPattern = utilities.join("|");
  const matcher = new RegExp(
    "\\b(?:(?:sm|md|lg|xl|hover|active|focus|focus-visible|focus-within|disabled|group-hover|selection):)*(?:" +
      utilityPattern +
      ")-" +
      token +
      "(?:\\/(?:\\d+|\\[[^\\]]+\\]))?(?=[\\s\"'`<>)}])",
    "g",
  );
  return [...source.matchAll(matcher)].map((match) => match[0]);
}

for (const cssFile of templateCssFiles) {
  const cssPath = join(templateRoot, cssFile);
  const templateDir = cssPath.slice(0, cssPath.lastIndexOf("/"));
  const templateSource = filesIn(templateDir)
    .filter((file) => [".tsx", ".css"].includes(extname(file)))
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");

  const originalCss = readFileSync(cssPath, "utf8");
  const baseCss = stripGeneratedBlock(originalCss);
  const colors = extractThemeTokens(baseCss, "color");
  const fonts = extractThemeTokens(baseCss, "font");
  const rules = [];

  for (const { name, value } of colors) {
    const utilityNames = [...colorUtilities.keys(), "divide", "from", "via", "to"];
    const classes = new Set(findUsedClasses(templateSource, name, utilityNames));
    for (const className of classes) {
      const [, utility, opacity] = className.match(/(?:^|:)(accent|bg|border|caret|decoration|divide|fill|from|outline|ring|stroke|text|to|via)-[^/\s"'`<>)}]+(?:\/([^\s"'`<>)}]+))?$/) ?? [];
      if (utility) rules.push(ruleForColorClass(className, utility, value, opacity));
    }
  }

  for (const { name, value } of fonts) {
    const classes = new Set(findUsedClasses(templateSource, name, ["font"]));
    for (const className of classes) {
      rules.push(ruleForFontClass(className, value));
    }
  }

  const block = rules.length
    ? `\n\n${fallbackStart}\n@layer utilities {\n${rules.map((rule) => `  ${rule}`).join("\n")}\n}\n${fallbackEnd}`
    : "";
  writeFileSync(cssPath, `${baseCss}${block}\n`);
  console.log(`${relative(process.cwd(), cssPath)}: ${rules.length} fallback utilities`);
}
