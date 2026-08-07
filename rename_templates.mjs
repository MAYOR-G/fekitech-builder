import fs from 'fs';
import path from 'path';

const renames = {
  "forgefit-training": "Forge Gym",
  "rivergate-plumbing": "River Plumbing",
  "hawthorne-fields-academy": "Peak Academy",
  "mercer-blythe-solicitors": "Trust Solicitors",
  "north-ledger-accountants": "Clear Accountants",
  "kindred-paws-vets": "Care Vets",
  "little-lanterns-nursery": "Joy Nursery",
  "borough-motor-works": "Speed Garage",
  "wildmere-gardens": "Bloom Landscapes",
  "tallow-and-sage": "Diamond Restaurant",
  "nightjar-and-crown": "Star Pub",
  "crumb-and-char": "Sunshine Burger",
  "forno-sixteen": "Slice Pizza"
};

for (const [id, newName] of Object.entries(renames)) {
  const configPath = path.join('src/templates', id, 'config.json');
  const editablePath = path.join('src/templates', id, 'editable.json');

  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    config.name = newName;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }

  if (fs.existsSync(editablePath)) {
    const editable = JSON.parse(fs.readFileSync(editablePath, 'utf8'));
    if (editable.brand && editable.brand.name) {
      editable.brand.name = newName;
      // also change logoAlt if it exists
      if (editable.brand.logoAlt) {
        editable.brand.logoAlt = `${newName} logo`;
      }
    }
    fs.writeFileSync(editablePath, JSON.stringify(editable, null, 2));
  }
}

console.log("Renaming done.");
