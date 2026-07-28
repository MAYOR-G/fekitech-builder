"use client";

import { createContext, useContext, type CSSProperties, type ElementType, type FocusEvent } from "react";
import { useEditorStore } from "@/store/editorStore";

export const EditorContext = createContext(false);

interface EditableTextProps {
  section: string;
  field: string;
  value?: string;
  as?: ElementType;
  className?: string;
  fallback?: string;
  style?: CSSProperties;
}

export default function EditableText({
  section,
  field,
  value,
  as: Component = "div",
  className = "",
  fallback = "Click to edit",
  style,
}: EditableTextProps) {
  const isEditing = useContext(EditorContext);
  const updateField = useEditorStore((state) => state.updateField);
  const content = value || fallback;

  if (isEditing) {
    return (
      <Component
        className={className}
        style={style}
        data-editable-path={`${section}.${field}`}
        data-editable-type="text"
      >
        {content}
      </Component>
    );
  }

  return (
    <Component className={className} style={style}>
      {content}
    </Component>
  );
}
