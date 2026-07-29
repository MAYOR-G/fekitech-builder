import { notFound } from "next/navigation";
import { getTemplate } from "@/registry";
import { PreviewBar } from "./PreviewClient";
import { TemplateRuntime } from "@/components/templates/TemplateRuntime";

export default async function TemplatePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ templateId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { templateId } = await params;
  const { frame, from } = await searchParams;
  const template = getTemplate(templateId);
  if (!template?.config || !template?.component) {
    notFound();
  }
  const config = template.config;
  const TemplateComponent = template.component;
  const defaultData = template.defaultData;

  if (frame === "1") {
    return (
      <TemplateRuntime data={defaultData} defaultData={defaultData} templateId={templateId}>
        <TemplateComponent data={defaultData} />
      </TemplateRuntime>
    );
  }

  const fromValue = Array.isArray(from) ? from[0] : from;
  const backHref = typeof fromValue === "string" && fromValue.startsWith("/templates") ? fromValue : "/templates";

  return (
    <PreviewBar templateId={templateId} templateName={config.name} backHref={backHref} />
  );
}
