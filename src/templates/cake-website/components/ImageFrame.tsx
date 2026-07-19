"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type ImageFrameProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
  loading?: "eager" | "lazy";
};

export function ImageFrame({
  src,
  alt,
  className,
  imageClassName,
  children,
  loading = "lazy",
}: ImageFrameProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const failed = failedSource === src;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(135deg,#f8e5df,#6f4a36)]",
        className
      )}
    >
      {!failed ? (
        <TemplateImage
          src={src}
          alt={alt}
          className={cn("h-full w-full object-cover", imageClassName)}
          loading={loading}
          onError={() => setFailedSource(src)}
        />
      ) : (
        <div className="flex h-full w-full items-end bg-[linear-gradient(135deg,#f8e5df,#6f4a36)] p-5 text-sm font-extrabold uppercase tracking-[0.18em] text-white/88">
          {alt}
        </div>
      )}
      {children}
    </div>
  );
}
