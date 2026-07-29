import { isEditorObject, type EditorObject, type EditorValue } from "@/store/visualEditorStore";
import { iconSvg } from "@/lib/icon-library";

export type ElementKind = "text" | "image" | "link" | "icon" | "section";

export type EditableElementInfo = {
  path: string;
  type: ElementKind;
  hrefPath?: string;
  targetPath?: string;
  altPath?: string;
  resetValue?: string;
};

export type StyleMetadata = {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
  objectFit?: string;
  objectPosition?: string;
  width?: string;
  height?: string;
};

export const TEXT_SELECTOR = "h1,h2,h3,h4,h5,h6,p,span,strong,small,li,blockquote,figcaption,label,legend,button,a";
export const SECTION_SELECTOR = "section,header,footer,main,article,aside,[role='region']";

const IGNORED_TEXT_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH"]);
const STORAGE_KEYS = new Set(["_editor", "colors", "typography", "pages"]);

export function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function parsePath(path: string): Array<string | number> {
  return path.split(".").map((segment) => {
    const n = Number(segment);
    return Number.isInteger(n) && n >= 0 ? n : segment;
  });
}

export function getAtPath(root: EditorObject, path: string): EditorValue | undefined {
  let current: unknown = root;
  for (const segment of parsePath(path)) {
    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string | number, unknown>)[segment];
  }
  return current as EditorValue | undefined;
}

export function stableHash(value: string): string {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(36);
}

function flattenEditableStrings(value: EditorValue, prefix = "", acc: Array<{ path: string; value: string }> = []) {
  if (typeof value === "string") {
    if (prefix && !STORAGE_KEYS.has(prefix.split(".")[0])) acc.push({ path: prefix, value });
    return acc;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => flattenEditableStrings(entry, prefix ? `${prefix}.${index}` : String(index), acc));
    return acc;
  }
  if (isEditorObject(value)) {
    Object.entries(value).forEach(([key, entry]) => flattenEditableStrings(entry, prefix ? `${prefix}.${key}` : key, acc));
  }
  return acc;
}

function isImagePath(path: string): boolean {
  return /(image|images|logo|photo|photos|src|avatar|thumbnail|background)$/i.test(path);
}

function isHrefPath(path: string): boolean {
  return /(href|url|link|facebook|instagram|twitter|x|linkedin|youtube|tiktok|email|phone)$/i.test(path);
}

function isAltPath(path: string): boolean {
  return /(alt|imageAlt|logoAlt)$/i.test(path);
}

function isTextPath(path: string): boolean {
  return !isImagePath(path) && !isHrefPath(path) && !isAltPath(path) && !/(icon)$/i.test(path);
}

function buildOccurrenceMap(
  entries: Array<{ path: string; value: string }>,
  predicate: (path: string) => boolean,
  normalize = normalizeText,
) {
  const map = new Map<string, string[]>();
  for (const entry of entries) {
    if (!predicate(entry.path)) continue;
    const text = normalize(entry.value);
    if (!text) continue;
    const list = map.get(text) ?? [];
    list.push(entry.path);
    map.set(text, list);
  }
  return map;
}

function takeOccurrence(map: Map<string, string[]>, key: string) {
  const list = map.get(key);
  if (!list || list.length === 0) return undefined;
  return list.shift();
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("#") || /^(mailto|tel|sms):/i.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed, window.location.origin);
    const encodedImageUrl = url.searchParams.get("url");
    if (encodedImageUrl) return decodeURIComponent(encodedImageUrl);
    if (url.origin === window.location.origin) return url.pathname + url.search + url.hash;
    if (url.pathname === "/" && !url.search && !url.hash) return `${url.protocol}//${url.host}`;
    return url.href;
  } catch {
    return trimmed;
  }
}

function readRecord(root: EditorObject, path: string): EditorObject | undefined {
  const value = getAtPath(root, path);
  return isEditorObject(value) ? value : undefined;
}

export function getStyleMetadata(data: EditorObject, path: string): StyleMetadata {
  const value = readRecord(data, `_editor.styles.${stableHash(path)}`) ?? readRecord(data, `_editor.stylesByPath.${path}`);
  return value as StyleMetadata | undefined ?? {};
}

export function applyElementStyle(element: HTMLElement, style: StyleMetadata) {
  if (style.fontFamily) element.style.fontFamily = style.fontFamily;
  if (style.fontSize) element.style.fontSize = style.fontSize;
  if (style.fontWeight) element.style.fontWeight = style.fontWeight;
  if (style.fontStyle) element.style.fontStyle = style.fontStyle;
  if (style.textDecoration) element.style.textDecoration = style.textDecoration;
  if (style.textAlign) element.style.textAlign = style.textAlign;
  if (style.lineHeight) element.style.lineHeight = style.lineHeight;
  if (style.letterSpacing) element.style.letterSpacing = style.letterSpacing;
  if (style.color) element.style.color = style.color;
  if (style.width) element.style.width = style.width;
  if (style.height) element.style.height = style.height;
  if (style.textAlign) element.style.textAlign = style.textAlign;
  if (element instanceof HTMLImageElement) {
    if (style.objectFit) element.style.objectFit = style.objectFit;
    if (style.objectPosition) element.style.objectPosition = style.objectPosition;
  }
}

function applyIconName(element: HTMLElement, name: string) {
  const svg = iconSvg(name);
  if (!svg) return;
  if (element instanceof SVGElement) {
    element.innerHTML = svg.replace(/^<svg[^>]*>|<\/svg>$/g, "");
    element.setAttribute("viewBox", "0 0 24 24");
    element.setAttribute("fill", "none");
    element.setAttribute("stroke", "currentColor");
    element.setAttribute("stroke-width", "2");
    element.setAttribute("stroke-linecap", "round");
    element.setAttribute("stroke-linejoin", "round");
  } else {
    element.innerHTML = svg;
  }
  element.dataset.iconName = name;
}

function shouldBindTextElement(element: HTMLElement): boolean {
  if (IGNORED_TEXT_TAGS.has(element.tagName)) return false;
  if (element.closest(".ve-floating-toolbar,.ve-panel,.ve-toolbar")) return false;
  const text = normalizeText(element.innerText || element.textContent || "");
  if (!text || text.length > 600) return false;
  const childTextElement = Array.from(element.children).some((child) => child.matches(TEXT_SELECTOR));
  return !childTextElement || element.matches("a,button,label,legend");
}

function setEditableDataset(element: HTMLElement, info: EditableElementInfo, editable: boolean) {
  if (!editable) return;
  element.dataset.editablePath = info.path;
  element.dataset.editableType = info.type;
  if (info.hrefPath) element.dataset.editableHrefPath = info.hrefPath;
  if (info.targetPath) element.dataset.editableTargetPath = info.targetPath;
  if (info.altPath) element.dataset.editableAltPath = info.altPath;
  if (info.resetValue) element.dataset.editableResetValue = info.resetValue;
}

function hardcodedTextPath(templateId: string, element: HTMLElement, text: string, index: number) {
  return `_editor.content.${stableHash(`${templateId}:text:${element.tagName}:${text}:${index}`)}.text`;
}

function hardcodedLinkPath(templateId: string, href: string, index: number) {
  return `_editor.links.${stableHash(`${templateId}:link:${href}:${index}`)}.href`;
}

function hardcodedImagePath(templateId: string, src: string, index: number) {
  return `_editor.images.${stableHash(`${templateId}:image:${src}:${index}`)}.src`;
}

export function bindTemplateDom(root: HTMLElement, data: EditorObject, templateId: string, editable: boolean) {
  const entries = flattenEditableStrings(data);
  const textMap = buildOccurrenceMap(entries, isTextPath);
  const urlMap = buildOccurrenceMap(entries, (path) => isImagePath(path) || isHrefPath(path), normalizeUrl);
  const altMap = buildOccurrenceMap(entries, isAltPath);
  const textSeen = new Map<string, number>();
  const linkSeen = new Map<string, number>();
  const imageSeen = new Map<string, number>();

  root.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((element) => {
    if (!shouldBindTextElement(element)) return;
    const originalText = normalizeText(element.innerText || element.textContent || "");
    const occurrence = textSeen.get(originalText) ?? 0;
    textSeen.set(originalText, occurrence + 1);
    const path = element.dataset.editablePath || takeOccurrence(textMap, originalText) || hardcodedTextPath(templateId, element, originalText, occurrence);
    const override = getAtPath(data, path);
    if (typeof override === "string" && normalizeText(element.textContent ?? "") !== normalizeText(override)) {
      element.textContent = override;
    }
    element.dataset.editableOriginal = element.dataset.editableOriginal || originalText;

    const anchor = element instanceof HTMLAnchorElement ? element : element.closest("a");
    let hrefPath: string | undefined;
    if (anchor?.getAttribute("href")) {
      const href = normalizeUrl(anchor.getAttribute("href") ?? "");
      const linkIndex = linkSeen.get(href) ?? 0;
      linkSeen.set(href, linkIndex + 1);
      hrefPath = anchor.dataset.editableHrefPath || takeOccurrence(urlMap, href) || hardcodedLinkPath(templateId, href, linkIndex);
      const hrefOverride = getAtPath(data, hrefPath);
      if (typeof hrefOverride === "string") anchor.setAttribute("href", hrefOverride || "#");
      const targetPath = hrefPath.replace(/\.href$/, ".target");
      const targetOverride = getAtPath(data, targetPath);
      if (targetOverride === "_blank") {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      } else if (typeof targetOverride === "string") {
        anchor.removeAttribute("target");
        anchor.removeAttribute("rel");
      }
      applyElementStyle(element, getStyleMetadata(data, path));
      setEditableDataset(element, { path, type: "link", hrefPath, targetPath, resetValue: originalText }, editable);
      return;
    }

    applyElementStyle(element, getStyleMetadata(data, path));
    setEditableDataset(element, { path, type: "text", resetValue: originalText }, editable);
  });

  root.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
    const originalSrc = normalizeUrl(image.currentSrc || image.src || image.getAttribute("src") || "");
    if (!originalSrc) return;
    const index = imageSeen.get(originalSrc) ?? 0;
    imageSeen.set(originalSrc, index + 1);
    const path = image.dataset.editablePath || takeOccurrence(urlMap, originalSrc) || hardcodedImagePath(templateId, originalSrc, index);
    const srcOverride = getAtPath(data, path);
    if (typeof srcOverride === "string" && srcOverride) image.src = srcOverride;
    const originalAlt = image.alt || "";
    const altPath = image.dataset.editableAltPath || takeOccurrence(altMap, normalizeText(originalAlt)) || `_editor.images.${stableHash(path)}.alt`;
    const altOverride = getAtPath(data, altPath);
    if (typeof altOverride === "string") image.alt = altOverride;
    image.dataset.editableOriginal = image.dataset.editableOriginal || originalSrc;
    applyElementStyle(image, getStyleMetadata(data, path));
    setEditableDataset(image, { path, type: "image", altPath, resetValue: originalSrc }, editable);
  });

  root.querySelectorAll<HTMLElement>("svg,[class*='fa-'],[class*='icon'],[aria-hidden='true']").forEach((icon, index) => {
    if (icon.dataset.editablePath || icon.closest("[data-editable-path]")) return;
    const label = icon.getAttribute("aria-label") || icon.getAttribute("class") || icon.tagName;
    const path = `_editor.icons.${stableHash(`${templateId}:icon:${label}:${index}`)}.name`;
    const iconOverride = getAtPath(data, path);
    if (typeof iconOverride === "string") applyIconName(icon, iconOverride);
    applyElementStyle(icon, getStyleMetadata(data, path));
    setEditableDataset(icon, { path, type: "icon", resetValue: label }, editable);
  });

  root.querySelectorAll<HTMLElement>(SECTION_SELECTOR).forEach((section, index) => {
    if (section.dataset.editableType === "section") return;
    const editableElement = section.querySelector<HTMLElement>("[data-editable-path]");
    const sectionId = editableElement?.dataset.editablePath?.split(".")[0] || `section-${index + 1}`;
    const hidden = getAtPath(data, `_editor.hiddenSections.${stableHash(sectionId)}`);
    if (hidden === true) section.hidden = true;
    if (editable) {
      section.dataset.editableSectionPath = sectionId;
    }
  });
}
