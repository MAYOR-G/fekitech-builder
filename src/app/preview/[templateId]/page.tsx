import { notFound } from "next/navigation";
import { getTemplate } from "@/registry";
import { PreviewBar } from "./PreviewClient";

export default async function TemplatePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ templateId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { templateId } = await params;
  const { frame } = await searchParams;
  const template = getTemplate(templateId);
  if (!template?.config || !template?.component) {
    notFound();
  }
  const config = template.config;
  const TemplateComponent = template.component;
  const defaultData = template.defaultData;

  if (frame === "1") {
    return <TemplateComponent data={defaultData} />;
  }

  return (
    <PreviewBar templateId={templateId} templateName={config.name} />
  );
}
