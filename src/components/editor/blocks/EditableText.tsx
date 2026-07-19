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

  if (!isEditing) return <Component className={className} style={style}>{content}</Component>;

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const nextValue = event.currentTarget.textContent?.trim() ?? "";
    if (nextValue !== value) updateField(section, field, nextValue);
  };

  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`cursor-text rounded border border-transparent outline-none transition-colors hover:border-ft-primary/50 focus:border-ft-primary ${className}`}
      style={style}
    >
      {content}
    </Component>
  );
}
