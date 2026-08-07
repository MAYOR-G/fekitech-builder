import fs from 'fs';

const filePath = 'src/registry/index.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Find the start and end of TEMPLATE_REGISTRY object
const startMatch = content.indexOf('export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> = {');
const endMatch = content.indexOf('};', startMatch);

if (startMatch === -1 || endMatch === -1) {
  console.error("Could not find TEMPLATE_REGISTRY in file.");
  process.exit(1);
}

const objectContent = content.substring(startMatch + 'export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> = {'.length, endMatch);
const lines = objectContent.split('\n').filter(line => line.trim().length > 0);

// We expect 67 lines.
const first27 = lines.slice(0, 27);
const remainingLines = lines.slice(27);

const requiredKeys = [
  '"forgefit-training"',
  '"rivergate-plumbing"',
  '"brightnest-cleaning"',
  '"premium-restaurant"',
  '"blush-crumb-bakehouse"',
  '"northline-grooming"'
];

const next6 = [];
for (const key of requiredKeys) {
  const match = remainingLines.find(line => line.trim().startsWith(key));
  if (match) {
    next6.push(match);
  } else {
    console.warn("Could not find required key:", key);
  }
}

let toShuffle = remainingLines.filter(line => !next6.includes(line));

// Shuffle the remaining lines
for (let i = toShuffle.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
}

const newObjectContent = `\n${first27.join('\n')}\n${next6.join('\n')}\n${toShuffle.join('\n')}\n`;

const newContent = content.substring(0, startMatch + 'export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> = {'.length) 
  + newObjectContent 
  + content.substring(endMatch);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Successfully updated TEMPLATE_REGISTRY.");
