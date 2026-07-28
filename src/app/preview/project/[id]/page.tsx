import { notFound, redirect } from "next/navigation";
import { PublishedTemplate } from "@/components/published/PublishedTemplate";
import { createClient } from "@/lib/supabase/server";
import { projectIdSchema } from "@/lib/project-validation";

export default async function ProjectPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    const id = (await params).id;
    redirect(`/login?redirect=/preview/project/${encodeURIComponent(id)}`);
  }
  
  const id = projectIdSchema.safeParse((await params).id);
  if (!id.success) notFound();

  const { data: project } = await supabase
    .from("projects")
    .select("template_id, editable_data")
    .eq("id", id.data)
    .eq("user_id", user.id)
    .single();
    
  if (!project) notFound();
  return <PublishedTemplate templateId={project.template_id} data={project.editable_data} />;
}
