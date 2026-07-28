"use client";

import { X, Plus, Trash2 } from "lucide-react";
import { useVisualEditorStore } from "@/store/visualEditorStore";

export default function BlocksPanel({ onClose }: { onClose: () => void }) {
  const data = useVisualEditorStore((s) => s.data);
  const updatePath = useVisualEditorStore((s) => s.updatePath);

  // Define the types of array blocks that can be added
  const blockTypes = [
    {
      id: "services.items",
      label: "Service Item",
      defaultItem: { name: "New Service", description: "Description for the new service.", image: "", imageAlt: "" }
    },
    {
      id: "products.items",
      label: "Product Item",
      defaultItem: { name: "New Product", description: "Product description.", image: "", imageAlt: "", price: "$99" }
    },
    {
      id: "packages.items",
      label: "Package Item",
      defaultItem: { name: "New Package", description: "Description", price: "$99", note: "Billed once", buttonLabel: "Get Started", buttonHref: "#", features: ["Feature 1", "Feature 2"] }
    },
    {
      id: "testimonials.items",
      label: "Testimonial",
      defaultItem: { quote: "This is a new testimonial.", name: "John Doe", detail: "Customer" }
    },
    {
      id: "gallery.images",
      label: "Gallery Image",
      defaultItem: { image: "", imageAlt: "Gallery image", caption: "New image" }
    },
    {
      id: "trust.items",
      label: "Trust Item",
      defaultItem: { title: "New Trust Point", description: "Description" }
    },
    {
      id: "process.steps",
      label: "Process Step",
      defaultItem: { title: "New Step", description: "Step description" }
    },
    {
      id: "areas.items",
      label: "Service Area",
      defaultItem: "New Area"
    },
    {
      id: "stats.items",
      label: "Statistic",
      defaultItem: { value: "100+", label: "New Stat" }
    }
  ];

  const getItems = (path: string) => {
    const parts = path.split(".");
    let current: any = data;
    for (const p of parts) {
      if (!current) return [];
      current = current[p];
    }
    return Array.isArray(current) ? current : [];
  };

  const handleAdd = (path: string, defaultItem: any) => {
    const items = getItems(path);
    updatePath(path, [...items, defaultItem], `Add ${path}`);
  };

  const handleRemove = (path: string, index: number) => {
    const items = getItems(path);
    const newItems = [...items];
    newItems.splice(index, 1);
    updatePath(path, newItems, `Remove ${path} [${index}]`);
  };

  return (
    <div className="ve-panel">
      <div className="ve-panel__header">
        <h2 className="ve-panel__title">Blocks & Sections</h2>
        <button type="button" onClick={onClose} className="ve-toolbar__btn" aria-label="Close">
          <X size={16} />
        </button>
      </div>

      <div className="ve-panel__body p-4 space-y-6 overflow-y-auto">
        <p className="text-xs text-[#8B8B9E] mb-4">
          Manage repeating items and blocks within your template.
        </p>

        {blockTypes.map((block) => {
          const items = getItems(block.id);
          // Only show if the section exists in data
          if (!data[block.id.split('.')[0]]) return null;

          return (
            <div key={block.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="ve-panel__group-label !mb-0">{block.label}s ({items.length})</h3>
                <button
                  type="button"
                  onClick={() => handleAdd(block.id, block.defaultItem)}
                  className="text-xs flex items-center gap-1 text-[#6C5CE7] hover:text-[#5A4BD1]"
                >
                  <Plus size={12} /> Add
                </button>
              </div>
              <div className="space-y-1">
                {items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between bg-[#111118] border border-white/[0.04] p-2 rounded-md text-sm text-gray-300">
                    <span className="truncate max-w-[180px]">
                      {typeof item === 'string' ? item : (item.name || item.title || item.quote || item.caption || item.value || `Item ${i + 1}`)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(block.id, i)}
                      className="text-[#8B8B9E] hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
