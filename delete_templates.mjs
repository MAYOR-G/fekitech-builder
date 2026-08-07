import fs from 'fs';
import path from 'path';

const templatesToDelete = ["the-rowan-house", "wren-vow-events", "field-stem-florist"];

// Remove folders
templatesToDelete.forEach(t => {
  const p = path.join('src/templates', t);
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
});

// Update BatchTemplate.tsx
const batchPath = 'src/templates/_uk-batch/BatchTemplate.tsx';
let batchCode = fs.readFileSync(batchPath, 'utf8');

// Remove imports for these templates
batchCode = batchCode.replace(/import .* from '..\/the-rowan-house.*';?\n/g, '');
batchCode = batchCode.replace(/import .* from '..\/wren-vow-events.*';?\n/g, '');
batchCode = batchCode.replace(/import .* from '..\/field-stem-florist.*';?\n/g, '');

// The switch cases span multiple lines, let's remove them
// Format is:
//     case "the-rowan-house":
//       return (
//         <div className="ukb-page" data-template-id="the-rowan-house">
//           ...
//         </div>
//       );
function removeCase(code, templateId) {
  const caseStr = `case "${templateId}":`;
  let idx = code.indexOf(caseStr);
  if (idx !== -1) {
    let returnIdx = code.indexOf("return (", idx);
    if (returnIdx !== -1) {
      // Find the closing bracket of the return statement
      let endIdx = code.indexOf(");\n", returnIdx);
      if (endIdx !== -1) {
        return code.substring(0, idx) + code.substring(endIdx + 3);
      }
    }
  }
  return code;
}

batchCode = removeCase(batchCode, "the-rowan-house");
batchCode = removeCase(batchCode, "wren-vow-events");
batchCode = removeCase(batchCode, "field-stem-florist");

fs.writeFileSync(batchPath, batchCode);
console.log("Done");
