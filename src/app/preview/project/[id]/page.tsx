import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { PublishedTemplate } from "@/components/published/PublishedTemplate";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { projectIdSchema } from "@/lib/project-validation";

export default async function ProjectPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/login?redirect=/preview/project/${encodeURIComponent((await params).id)}`);
  const id = projectIdSchema.safeParse((await params).id);
  if (!id.success) notFound();

  const project = await prisma.project.findFirst({
    where: { id: id.data, userId: session.user.id },
    select: { templateId: true, editableData: true },
  });
  if (!project) notFound();
  return <PublishedTemplate templateId={project.templateId} data={project.editableData} />;
}
