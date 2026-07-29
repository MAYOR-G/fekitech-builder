import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

const templateRoot = join(process.cwd(), "src/templates");

const templateTokenAliases = {
  "cake-website": {
    prefix: "sweet-cake",
    oldColors: ["almond", "blush", "champagne", "chantilly", "chocolate", "cocoa", "cream", "ganache", "petal", "pistachio", "rose"],
    oldFonts: ["body", "display"],
  },
  "coffee-website": {
    prefix: "artisan-coffee",
    oldColors: ["coffee-accent", "coffee-brown", "coffee-cream", "coffee-dark", "coffee-green", "coffee-light", "coffee-terracotta"],
    oldFonts: ["sans", "serif"],
  },
  "dentist-website": {
    prefix: "bright-dental",
    oldColors: ["porcelain", "pearl", "cloud", "mint", "lagoon", "ocean", "ink", "graphite", "mist", "sand", "champagne", "coral", "navy", "teal", "ocean-dark"],
    oldFonts: ["body", "display"],
  },
  "electrician-website": {
    prefix: "spark-electric",
    oldColors: ["navy", "midnight", "cobalt", "cyan", "safety", "amber", "slate", "mist", "cloud", "line", "ink", "steel"],
    oldFonts: ["body", "display"],
  },
  "gym-website": {
    prefix: "iron-gym",
    oldColors: ["gym-dark", "gym-darker", "gym-charcoal", "gym-accent", "gym-accentHover", "gym-gray", "gym-light"],
    oldFonts: ["sans", "display"],
  },
  "ink-and-iron": {
    prefix: "ink-iron",
    oldColors: ["charcoal", "deep-black", "gold", "blood", "off-white", "muted-gray"],
    oldFonts: ["anton", "display", "inter", "sans"],
  },
};

const variants = "(?:[a-z-]+:)*";
const utilityPrefixes = ["accent", "bg", "border", "decoration", "divide", "fill", "from", "outline", "ring", "stroke", "text", "to", "via"];

function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return filesIn(path);
    return [path];
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findTokenUses(source, tokens, kind) {
  const prefix = kind === "font" ? "font" : `(?:${utilityPrefixes.join("|")})`;
  return tokens.flatMap((token) => {
    const matcher = new RegExp(
      "\\b" + variants + prefix + "-" + escapeRegExp(token) + "(?:\\/[^\\s\"'`<>)}]+)?(?=[\\s\"'`<>)}])",
      "g",
    );
    return [...source.matchAll(matcher)].map((match) => match[0]);
  });
}

const findings = [];

for (const [templateId, config] of Object.entries(templateTokenAliases)) {
  const files = filesIn(join(templateRoot, templateId)).filter((file) => [".tsx", ".css"].includes(extname(file)));
  const oldColorUses = new Set();
  const oldFontUses = new Set();

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const use of findTokenUses(source, config.oldColors, "color")) {
      if (!use.includes(`${config.prefix}-`)) oldColorUses.add(`${file.replace(process.cwd() + "/", "")}: ${use}`);
    }
    for (const use of findTokenUses(source, config.oldFonts, "font")) {
      if (!use.includes(`${config.prefix}-`)) oldFontUses.add(`${file.replace(process.cwd() + "/", "")}: ${use}`);
    }
  }

  if (oldColorUses.size || oldFontUses.size) {
    findings.push({ templateId, oldColorUses: [...oldColorUses], oldFontUses: [...oldFontUses] });
  }
}

if (findings.length) {
  console.log(JSON.stringify(findings, null, 2));
  process.exitCode = 1;
} else {
  console.log("No stale local token utility classes found.");
}
