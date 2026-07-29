"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { bindTemplateDom } from "@/lib/editor-dom";
import { isEditorObject, type EditorObject } from "@/store/visualEditorStore";
import { runtimeStyleOptions, templateRuntimeCss, templateVariables, useTypographyFontHref } from "@/lib/template-runtime-style";

export function TemplateRuntime({
  children,
  data,
  defaultData,
  templateId,
  editable = false,
}: {
  children: ReactNode;
  data: EditorObject;
  defaultData?: EditorObject;
  templateId: string;
  editable?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fontHref = useTypographyFontHref(data);
  const runtimeStyles = runtimeStyleOptions(data, defaultData);
  const runtimeCss = templateRuntimeCss(`[data-template-runtime="${templateId}"]`, runtimeStyles);

  useEffect(() => {
    if (!ref.current || !isEditorObject(data)) return;
    bindTemplateDom(ref.current, data, templateId, editable);
  }, [data, editable, templateId]);

  return (
    <div ref={ref} data-template-runtime={templateId} style={templateVariables(data, { includeRootColors: runtimeStyles.palette })}>
      {fontHref && <link rel="stylesheet" href={fontHref} />}
      {runtimeCss && <style dangerouslySetInnerHTML={{ __html: runtimeCss }} />}
      {children}
    </div>
  );
}
