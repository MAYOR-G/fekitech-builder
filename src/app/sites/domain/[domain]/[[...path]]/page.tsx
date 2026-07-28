import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublishedTemplate } from "@/components/published/PublishedTemplate";
import { getAdminDb } from "@/lib/db";

type Props = { params: Promise<{ domain: string; path?: string[] }> };

async function getProject(domain: string) {
  const admin = getAdminDb();
  const { data: project } = await admin
    .from("projects")
    .select(`
      template_id,
      name,
      template_versions!projects_published_version_id_fkey(editable_data)
    `)
    .eq("custom_domain", domain)
    .not("custom_domain_verified_at", "is", null)
    .eq("is_published", true)
    .not("published_version_id", "is", null)
    .single();
    
  return project;
}

export default async function CustomDomainSitePage({ params }: Props) {
  const { domain } = await params;
  const project = await getProject(decodeURIComponent(domain).toLowerCase());
  
  // @ts-expect-error Supabase join types
  const publishedData = project?.template_versions?.editable_data;
  
  if (!project || !publishedData) notFound();
  
  return <PublishedTemplate templateId={project.template_id} data={publishedData} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  const project = await getProject(decodeURIComponent(domain).toLowerCase());
  if (!project) return {};
  return {
    title: project.name,
    description: `Website for ${project.name}`,
    robots: { index: true, follow: true },
  };
}
