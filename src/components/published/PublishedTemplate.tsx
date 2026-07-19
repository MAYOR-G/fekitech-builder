import { notFound } from "next/navigation";
import { isTemplateData } from "@/lib/template-data";
import { getTemplate } from "@/registry";

export function PublishedTemplate({
  templateId,
  data,
}: {
  templateId: string;
  data: unknown;
}) {
  const template = getTemplate(templateId);
  if (!template || !isTemplateData(data)) notFound();
  const TemplateComponent = template.component;
  return (
    <main className="min-h-screen bg-white">
      <TemplateComponent data={data} />
    </main>
  );
}
