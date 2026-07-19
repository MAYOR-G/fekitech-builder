import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublishedTemplate } from "@/components/published/PublishedTemplate";
import { prisma } from "@/lib/db";

type Props = { params: Promise<{ domain: string; path?: string[] }> };

async function getProject(domain: string) {
  return prisma.project.findFirst({
    where: {
      customDomain: domain,
      customDomainVerifiedAt: { not: null },
      isPublished: true,
      publishedVersionId: { not: null },
    },
    include: { publishedVersion: true },
  });
}

export default async function CustomDomainSitePage({ params }: Props) {
  const { domain } = await params;
  const project = await getProject(decodeURIComponent(domain).toLowerCase());
  if (!project?.publishedVersion) notFound();
  return <PublishedTemplate templateId={project.templateId} data={project.publishedVersion.editableData} />;
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
