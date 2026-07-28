"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogoMark } from "@/components/ui/LogoMark";
import Link from "next/link";

function CreateProjectContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const router = useRouter();
  const [error, setError] = useState("");
  const creating = useRef(false);

  useEffect(() => {
    if (!templateId || creating.current) return;
    creating.current = true;

    fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId }),
    })
      .then((res) => res.json().then(data => ({ status: res.status, ok: res.ok, data })))
      .then(({ status, ok, data }) => {
        if (status === 401) {
          router.push(`/login?redirect=${encodeURIComponent(`/dashboard/create?templateId=${templateId}`)}`);
          return;
        }
        if (!ok || !data.project) {
          throw new Error(data.error || "Failed to create project");
        }
        router.push(`/editor/${data.project.id}`);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [templateId, router]);

  if (!templateId) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-red-600 mb-2">No template selected</h1>
        <Link href="/dashboard" className="rounded-lg bg-ft-primary px-4 py-2 text-white transition hover:bg-ft-primary-deep">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-red-600 mb-2">Error creating website</h1>
        <p className="text-ft-body mb-6 max-w-md">{error}</p>
        <Link href="/dashboard" className="rounded-lg bg-ft-primary px-4 py-2 text-white transition hover:bg-ft-primary-deep">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <LogoMark className="mb-6 h-14 w-14 animate-pulse" />
      <h1 className="text-2xl font-bold tracking-tight text-ft-ink">Setting up your website</h1>
      <p className="mt-2 text-ft-body">Please wait a moment while we prepare your template...</p>
    </div>
  );
}

export default function CreateProjectPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ft-surface p-4">
      <Suspense fallback={<div className="flex flex-col items-center"><LogoMark className="h-14 w-14 animate-pulse" /></div>}>
        <CreateProjectContent />
      </Suspense>
    </div>
  );
}
