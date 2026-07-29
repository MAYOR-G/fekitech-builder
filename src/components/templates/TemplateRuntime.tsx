"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { bindTemplateDom } from "@/lib/editor-dom";
import { isEditorObject, type EditorObject } from "@/store/visualEditorStore";
import { templateRuntimeCss, templateVariables, useTypographyFontHref } from "@/lib/template-runtime-style";

export function TemplateRuntime({
  children,
  data,
  templateId,
  editable = false,
}: {
  children: ReactNode;
  data: EditorObject;
  templateId: string;
  editable?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fontHref = useTypographyFontHref(data);

  useEffect(() => {
    if (!ref.current || !isEditorObject(data)) return;
    bindTemplateDom(ref.current, data, templateId, editable);
  }, [data, editable, templateId]);

  return (
    <div ref={ref} data-template-runtime={templateId} style={templateVariables(data)}>
      {fontHref && <link rel="stylesheet" href={fontHref} />}
      <style dangerouslySetInnerHTML={{ __html: templateRuntimeCss(`[data-template-runtime="${templateId}"]`) }} />
      {children}
    </div>
  );
}
