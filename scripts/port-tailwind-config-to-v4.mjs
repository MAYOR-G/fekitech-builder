// Port Tailwind v3-tailwind.config.js-driven tokens (`colors`, `fontFamily`,
// `boxShadow`, `backgroundImage`, `keyframes`, `animation`, `letterSpacing`)
// into Tailwind v4 `@theme` blocks and append them to each template's existing
// `index.css`/`globals.css`. The original Vite projects declared colors in
// tailwind.config.js; the v4 port stripped that and only kept `index.css`
// (which never carried those color tokens), so utilities like `bg-gym-dark`
// silently resolve to nothing.
//
// Also purges the broken `--foo: var(--foo)` self-referential entries injected
// into src/app/globals.css by the port script (the actual values now live in
// each template's own CSS under their own `@theme`).
//
// Rules for translation:
//   colors: { gym: { dark: '#0a0a0a' } }   -> --color-gym-dark: #0a0a0a;
//   colors: { navy: '#0a192f' }            -> --color-navy: #0a192f;
//   colors: { gold: { DEFAULT: '#C9A45C' } } -> --color-gold: #C9A45C;  (variant used as `gold` not `gold-DEFAULT`)
//   colors: { gold: { hover: '#b59353' } }  -> --color-gold-hover: #b59353;
//   fontFamily: { sans: ['Inter','sans-serif'] } -> --font-sans: 'Inter', sans-serif;
//   boxShadow: { card: '...' }             -> --shadow-card: ...;     (utility: shadow-card)
//   backgroundImage: { 'circuit-hero': 'linear-gradient(...)' }
//                                          -> --bg-circuit-hero: linear-gradient(...); (NOTE: v4 uses --color-* for colors but `bg-<name>` utility resolution from @theme requires `--background-image-<name>` or you keep using literal `bg-url-class`. To avoid breaking v4 we emit a `--background-image-<name>` token.)
//   animation: { marquee: 'marquee 25s linear infinite' }   -> --animate-marquee: marquee 25s linear infinite;
//   keyframes: { marquee: {...} }           -> emit real CSS @keyframes marquee { ... }  (outside @theme)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW = path.join(ROOT, 'raw-templates');
const TEMPLATES = path.join(ROOT, 'src/templates');
const HOST_GLOBALS = path.join(ROOT, 'src/app/globals.css');

// ---- helpers ----

function cssQuoteFontList(arr) {
  // Don't quote generic font keywords; quote custom family names only.
  const GENERIC = new Set(['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'inherit', 'initial', 'revert']);
  return arr.map(s => {
    const t = String(s).trim();
    if (GENERIC.has(t)) return t;
    if (/^\s*['"].*['"]\s*$/.test(t)) return t; // already quoted
    return `'${t}'`;
  }).join(', ');
}

function flattenColors(prefix, obj, out) {
  // obj can be a flat string value or nested object of more color shades.
  // Tailwind: `gold: { DEFAULT: '#C9A45C', hover: '#b59353' }` -> --color-gold and --color-gold-hover
  for (const [k, v] of Object.entries(obj)) {
    const key = k === 'DEFAULT' ? prefix : `${prefix}${prefix ? '-' : ''}${k}`;
    if (typeof v === 'string' || typeof v === 'number') {
      out.push(`--color-${key}: ${v};`);
    } else if (v && typeof v === 'object') {
      flattenColors(key, v, out);
    }
  }
}

function emitBoxShadow(name, value) {
  // Tailwind v4 utility is `shadow-<name>`; variable token is `--shadow-<name>`.
  return `--shadow-${name}: ${value};`;
}

function emitAnimation(name, value) {
  // --animate-<name>: <rest>;  (utility: animate-<name>)
  return `--animate-${name}: ${value};`;
}

function emitKeyframes(name, def) {
  // def is { '0%': { transform: 'translateX(0%)' }, '100%': {...} } possibly with '0%,100%' keys
  const steps = [];
  for (const [stop, props] of Object.entries(def)) {
    const decls = Object.entries(props).map(([k, v]) => `    ${k}: ${v};`).join('\n');
    steps.push(`  ${stop} {\n${decls}\n  }`);
  }
  return `@keyframes ${name} {\n${steps.join('\n')}\n}\n`;
}

// map camelCase or dashed font family entries to quote-wrapped CSS fonts
function normalizeFontFamily(value) {
  if (Array.isArray(value)) return cssQuoteFontList(value);
  if (typeof value === 'string') return value;
  return String(value);
}

// ---- main ----

const templatesToProcess = [
  'gym-website', 'electrician-website', 'dentist-website', 'estate-agent-website',
  'furniture-website', 'hotel-website', 'restaurant-website', 'cake-website',
  'salon-website', 'coffee-website', 'barber-website', 'plumber-website',
  'premium-coffee-website', 'second-electrician-website', 'second-furniture-website',
  'second-plumber-website',
];

let stats = { templates: 0, totalTokens: 0 };

for (const t of templatesToProcess) {
  const twPath = path.join(RAW, t, 'tailwind.config.js');
  if (!fs.existsSync(twPath)) { console.warn(`Missing tailwind.config.js for ${t}`); continue; }

  const mod = require(twPath);
  const cfg = mod.default || mod;
  const ext = (cfg.theme && cfg.theme.extend) || cfg.theme || {};

  let cssFile = path.join(TEMPLATES, t, 'index.css');
  if (!fs.existsSync(cssFile)) cssFile = path.join(TEMPLATES, t, 'globals.css');
  if (!fs.existsSync(cssFile)) { console.warn(`No CSS file for ${t}`); continue; }
  let existing = fs.readFileSync(cssFile, 'utf8');

  // Avoid duplicate runs: leave if already extended by us.
  if (existing.includes('/* INJECTED FROM tailwind.config.js (v3->v4 port) */')) {
    console.log(`Skipping ${t} (already injected)`);
    continue;
  }

  const lines = [];
  lines.push('/* INJECTED FROM tailwind.config.js (v3->v4 port).');
  lines.push('   Without these `@theme` tokens, the v4 build cannot recognize');
  lines.push('   the original v3 color utilities like `bg-gym-dark` or `font-sans` */');

  // Build a single @theme block (Tailwind v4 merges @theme blocks across files).
  lines.push('@theme {');
  let tokenCount = 0;

  // colors
  if (ext.colors) {
    const colorTokens = [];
    for (const [name, val] of Object.entries(ext.colors)) {
      if (typeof val === 'string') colorTokens.push(`--color-${name}: ${val};`);
      else if (typeof val === 'object' && val) flattenColors(name, val, colorTokens);
    }
    if (colorTokens.length) {
      lines.push('  /* colors */');
      lines.push(...colorTokens.map(t => '  ' + t));
      tokenCount += colorTokens.length;
    }
  }

  // fontFamily -> --font-<name>
  if (ext.fontFamily) {
    lines.push('  /* fonts */');
    for (const [name, val] of Object.entries(ext.fontFamily)) {
      lines.push(`  --font-${name}: ${normalizeFontFamily(val)};`);
      tokenCount++;
    }
  }

  // boxShadow -> --shadow-<name>
  if (ext.boxShadow) {
    lines.push('  /* shadows */');
    for (const [name, val] of Object.entries(ext.boxShadow)) {
      lines.push('  ' + emitBoxShadow(name, val));
      tokenCount++;
    }
  }

  // backgroundImage -> Tailwind v4 utility resolution: `bg-<name>` reads
  // `--background-image-<name>` if present. Use that token name.
  if (ext.backgroundImage) {
    lines.push('  /* background images (utility: bg-<name>) */');
    for (const [name, val] of Object.entries(ext.backgroundImage)) {
      lines.push(`  --background-image-${name}: ${val};`);
      tokenCount++;
    }
  }

  // animation -> --animate-<name>
  if (ext.animation) {
    lines.push('  /* animations */');
    for (const [name, val] of Object.entries(ext.animation)) {
      lines.push('  ' + emitAnimation(name, val));
      tokenCount++;
    }
  }

  // letterSpacing -> --tracking-<name> (utility: tracking-<name>)
  if (ext.letterSpacing) {
    lines.push('  /* letter spacing */');
    for (const [name, val] of Object.entries(ext.letterSpacing)) {
      lines.push(`  --tracking-${name}: ${val};`);
      tokenCount++;
    }
  }

  lines.push('}');
  lines.push('');

  // keyframes must live OUTSIDE @theme as plain CSS @keyframes.
  if (ext.keyframes) {
    for (const [name, def] of Object.entries(ext.keyframes)) {
      lines.push(emitKeyframes(name, def));
      tokenCount++;
    }
  }

  // Append, ensuring newlines between blocks. We don't strip anything that
  // was already there; the new @theme block simply augments.
  const injected = lines.join('\n');
  const newContent = existing.trimEnd() + '\n\n' + injected + '\n';
  fs.writeFileSync(cssFile, newContent);
  stats.templates++;
  stats.totalTokens += tokenCount;
  console.log(`  ${t}: ${tokenCount} tokens appended to ${path.relative(ROOT, cssFile)}`);
}

// ---- purge broken self-ref entries from host globals.css ----

if (fs.existsSync(HOST_GLOBALS)) {
  let g = fs.readFileSync(HOST_GLOBALS, 'utf8');
  // Remove the entire self-ref injection block (between the markers).
  // The port script wraps lines with `/* --- INJECTED TEMPLATE VARS --- */`
  // and `/* --- END INJECTED --- */`. Don't touch anything outside.
  const before = g;
  g = g.replace(/\/\* --- INJECTED TEMPLATE VARS --- \*\/[\s\S]*?\/\* --- END INJECTED --- \*\//,
    '/* --- INJECTED TEMPLATE VARS ---\n   Each template defines its OWN tokens in its OWN index.css@theme.\n   No global self-references here (they broke v4 utility resolution).\n   --- END INJECTED --- */');
  if (g !== before) {
    fs.writeFileSync(HOST_GLOBALS, g);
    console.log(`\nPurged self-referential entries from ${path.relative(ROOT, HOST_GLOBALS)}`);
  }
}

console.log('\nDone.', JSON.stringify(stats));
