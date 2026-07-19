"use client";

import { useMemo } from "react";
import { useEditorStore, type EditorValue } from "@/store/editorStore";

type EditableField = {
  path: Array<string | number>;
  label: string;
  value: string | number | boolean;
};

function titleCase(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^./, (letter) => letter.toUpperCase());
}

function collectFields(value: EditorValue, path: Array<string | number> = [], fields: EditableField[] = []): EditableField[] {
  if (path.length > 12) return fields;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    fields.push({
      path,
      label: path.map((segment) => typeof segment === "number" ? `Item ${segment + 1}` : titleCase(segment)).join(" · "),
      value,
    });
    return fields;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectFields(entry, [...path, index], fields));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => collectFields(entry, [...path, key], fields));
  }
  return fields;
}

export function ContentEditor() {
  const data = useEditorStore((state) => state.data);
  const updatePath = useEditorStore((state) => state.updatePath);
  const fields = useMemo(() => collectFields(data), [data]);

  if (fields.length === 0) {
    return <p className="rounded-lg bg-gray-50 p-3 text-sm text-ft-body">This template does not expose editable content yet.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="rounded-lg bg-gray-50 p-3 text-xs text-ft-body" role="status">
        {fields.length} editable {fields.length === 1 ? "field" : "fields"} available for this template.
      </p>
      {fields.map((field) => {
        const id = `field-${field.path.join("-")}`;
        if (typeof field.value === "boolean") {
          return (
            <label key={id} className="flex min-h-11 items-center justify-between gap-3 text-sm font-medium text-ft-ink">
              {field.label}
              <input type="checkbox" checked={field.value} onChange={(event) => updatePath(field.path, event.target.checked)} />
            </label>
          );
        }

        const isLong = typeof field.value === "string" && (field.value.length > 80 || /description|subtitle|body|text/i.test(field.label));
        return (
          <div key={id}>
            <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-ft-body">{field.label}</label>
            {isLong ? (
              <textarea
                id={id}
                value={String(field.value)}
                maxLength={20_000}
                rows={3}
                onChange={(event) => updatePath(field.path, event.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-ft-primary focus:ring-2 focus:ring-blue-100"
              />
            ) : (
              <input
                id={id}
                type={typeof field.value === "number" ? "number" : "text"}
                value={field.value}
                maxLength={typeof field.value === "string" ? 20_000 : undefined}
                onChange={(event) => updatePath(field.path, typeof field.value === "number" ? Number(event.target.value) : event.target.value)}
                className="min-h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-ft-primary focus:ring-2 focus:ring-blue-100"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
