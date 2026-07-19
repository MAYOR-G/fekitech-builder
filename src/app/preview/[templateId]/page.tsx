import { notFound } from "next/navigation";
import { getTemplate } from "@/registry";
import { PreviewBar } from "./PreviewClient";

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template?.config || !template?.component) {
    notFound();
  }
  const config = template.config;
  const TemplateComponent = template.component;
  const defaultData = template.defaultData;

  return (
    <>
      <PreviewBar templateId={templateId} templateName={config.name} />
      <TemplateComponent data={defaultData} />
    </>
  );
}
