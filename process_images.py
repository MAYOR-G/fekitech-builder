import json
import os
from PIL import Image

templates = [
    "cake-website",
    "catering-website",
    "coffee-website",
    "dentist-website",
    "electrician-website",
    "ink-and-iron",
    "restaurant-website",
    "second-plumber-website"
]

for t in templates:
    config_path = f"src/templates/{t}/config.json"
    with open(config_path, "r") as f:
        data = json.load(f)
    
    if "previewImages" in data:
        img_paths = data["previewImages"]
        
        # Load images
        images = []
        for p in img_paths:
            # removing leading slash
            local_p = "public" + p
            if os.path.exists(local_p):
                images.append(Image.open(local_p))
            else:
                print(f"Warning: {local_p} not found")
        
        if len(images) == 2:
            # Stitch images vertically
            width = max(img.width for img in images)
            height = sum(img.height for img in images)
            
            combined = Image.new("RGB", (width, height))
            y_offset = 0
            for img in images:
                combined.paste(img, (0, y_offset))
                y_offset += img.height
            
            # Save the combined image
            out_filename = f"{t}-tall.webp"
            out_path = f"public/templates/{out_filename}"
            combined.save(out_path, "WEBP", quality=85)
            
            # Update config
            data["image"] = f"/templates/{out_filename}"
            del data["previewImages"]
            
            with open(config_path, "w") as f:
                json.dump(data, f, indent=2)
                f.write("\n")
            print(f"Processed {t}")
        else:
            print(f"Skipped {t} - did not find 2 images")

print("Done")
