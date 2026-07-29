"use client";

import { createContext, type CSSProperties, type ElementType } from "react";

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
  const content = value || fallback;

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
