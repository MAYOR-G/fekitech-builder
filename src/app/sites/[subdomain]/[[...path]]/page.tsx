import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublishedTemplate } from "@/components/published/PublishedTemplate";
import { getAdminDb } from "@/lib/db";

type Props = { params: Promise<{ subdomain: string; path?: string[] }> };

async function getPublishedProject(subdomain: string) {
  const admin = getAdminDb();
  const { data: project } = await admin
    .from("projects")
    .select(`
      template_id,
      name,
      template_versions!projects_published_version_id_fkey(editable_data)
    `)
    .eq("subdomain", subdomain)
    .eq("is_published", true)
    .eq("status", "ready")
    .is("deleted_at", null)
    .not("published_version_id", "is", null)
    .single();

  return project;
}

export default async function PublishedSitePage({ params }: Props) {
  const { subdomain } = await params;
  const project = await getPublishedProject(subdomain.toLowerCase());
  
  // @ts-expect-error Supabase join types can be slightly messy, we know it's a single object
  const publishedData = project?.template_versions?.editable_data;
  
  if (!project || !publishedData) notFound();

  return <PublishedTemplate templateId={project.template_id} data={publishedData} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subdomain } = await params;
  const project = await getPublishedProject(subdomain.toLowerCase());
  if (!project) return {};
  return {
    title: project.name,
    description: `Website for ${project.name}`,
    robots: { index: true, follow: true },
  };
}
