"use client";

import { useState } from "react";
import { TemplateCatalogCard } from "@/components/templates/TemplateCatalogCard";
import type { TemplateConfig } from "@/registry";

export function DashboardTemplates({ templates }: { templates: TemplateConfig[] }) {
  const [creatingId, setCreatingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const createFromTemplate = async (templateId: string) => {
    setCreatingId(templateId);
    setMessage("");
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      const payload = (await response.json()) as {
        project?: { id: string };
        error?: string;
      };

      if (response.status === 401) {
        window.location.assign(`/login?redirect=${encodeURIComponent(`/dashboard/create?templateId=${templateId}`)}`);
        return;
      }
      if (!response.ok || !payload.project) {
        throw new Error(payload.error ?? "Unable to create the project.");
      }
      window.location.assign(`/editor/${payload.project.id}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unable to create the project.";
      setMessage(msg);
      window.alert(msg);
    } finally {
      setCreatingId(null);
    }
  };

  return (
    <div className="mt-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-[720] tracking-[-0.035em] sm:text-3xl">Start a new website</h2>
          <p className="mt-1 text-sm text-ft-body">Choose a template to begin</p>
        </div>
      </div>
      
      {message ? (
        <p role="status" className="mb-6 rounded-lg bg-ft-surface-alt p-3 text-sm text-ft-body">
          {message}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCatalogCard
            key={template.id}
            template={template}
            creating={creatingId === template.id}
            onStart={() => createFromTemplate(template.id)}
          />
        ))}
      </div>
    </div>
  );
}
