import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublishedTemplate } from "@/components/published/PublishedTemplate";
import { prisma } from "@/lib/db";

type Props = { params: Promise<{ subdomain: string; path?: string[] }> };

async function getPublishedProject(subdomain: string) {
  return prisma.project.findFirst({
    where: { subdomain, isPublished: true, publishedVersionId: { not: null } },
    include: { publishedVersion: true },
  });
}

export default async function PublishedSitePage({ params }: Props) {
  const { subdomain } = await params;
  const project = await getPublishedProject(subdomain.toLowerCase());
  if (!project?.publishedVersion) notFound();

  return <PublishedTemplate templateId={project.templateId} data={project.publishedVersion.editableData} />;
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
