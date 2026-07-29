import { isTemplateData, type TemplateData, type TemplateValue } from "@/lib/template-data";

const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

function collectStrings(value: TemplateValue, path = "", acc: Array<{ path: string; value: string }> = []) {
  if (typeof value === "string") {
    if (/(href|url|link|email|phone)$/i.test(path)) acc.push({ path, value });
    return acc;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectStrings(entry, `${path}.${index}`, acc));
    return acc;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => collectStrings(entry, path ? `${path}.${key}` : key, acc));
  }
  return acc;
}

function pageSlugs(data: TemplateData) {
  const editor = data._editor;
  if (!editor || typeof editor !== "object" || Array.isArray(editor)) return new Set([""]);
  const pages = editor.pages;
  if (!pages || typeof pages !== "object" || Array.isArray(pages) || !Array.isArray(pages.items)) return new Set([""]);
  return new Set(pages.items.filter((page) => page && typeof page === "object" && !Array.isArray(page)).map((page) => {
    const slug = (page as Record<string, unknown>).slug;
    return typeof slug === "string" ? slug.replace(/^\/+|\/+$/g, "") : "";
  }));
}

export function validateEditableLinks(data: TemplateData): { valid: true } | { valid: false; error: string } {
  const slugs = pageSlugs(data);
  const links = collectStrings(data);
  for (const link of links) {
    const href = link.value.trim();
    if (!href || href === "#") continue;
    if (href.startsWith("#")) continue;
    if (href.startsWith("/")) {
      const slug = href.replace(/^\/+|\/+$/g, "");
      if (!slugs.has(slug) && slugs.size > 1) {
        return { valid: false, error: `The link at ${link.path} points to an unknown page.` };
      }
      continue;
    }
    try {
      const url = new URL(href);
      if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
        return { valid: false, error: `The link at ${link.path} uses an unsupported protocol.` };
      }
    } catch {
      if (/^[a-z0-9][a-z0-9/_#.-]*$/i.test(href)) continue;
      if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(href) && !/^\+?[0-9][0-9\s().-]{6,}$/.test(href)) {
        return { valid: false, error: `The link at ${link.path} is not valid.` };
      }
    }
  }
  return { valid: true };
}

export function hasTemplateData(value: unknown): value is TemplateData {
  return isTemplateData(value);
}
