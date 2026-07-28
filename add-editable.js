const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Match something like <p className="something">{data.foo.bar}</p>
  // or <h2>{data.foo.bar}</h2>
  // We want to add data-editable-path="foo.bar" to the opening tag.
  
  // Regular expression to find simple tags containing ONLY {data.something.something}
  const regex = /<([a-z0-9]+)\s*([^>]*?)>\s*\{data\.([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\}\s*<\/\1>/g;
  
  content = content.replace(regex, (match, tag, attrs, obj, prop) => {
    // If it already has data-editable-path, skip
    if (attrs.includes('data-editable-path')) return match;
    
    return `<${tag} ${attrs} data-editable-path="${obj}.${prop}" data-editable-type="text">{data.${obj}.${prop}}</${tag}>`;
  });

  // Also handle array items like {item.title} if we know their paths. That's harder for a regex.
  // We can just do the main ones first.
  
  // Handle span or strong inside ActionLink etc?
  // Let's do a pass for nested items like <span>{data.foo.bar}</span>
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${filePath}`);
}

processFile('./src/templates/_premium-service/PremiumServiceTemplate.tsx');
processFile('./src/templates/_premium-hospitality/PremiumHospitalityTemplate.tsx');
processFile('./src/templates/_premium-food/PremiumFoodTemplate.tsx');

