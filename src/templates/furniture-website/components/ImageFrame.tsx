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
};

export function ImageFrame({
  src,
  alt,
  className,
  imageClassName,
  children,
}: ImageFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(135deg,#d8cabb,#8a6348)]",
        className
      )}
    >
      {!failed ? (
        <TemplateImage
          src={src}
          alt={alt}
          className={cn("h-full w-full object-cover", imageClassName)}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-end bg-[linear-gradient(135deg,#efe2d0,#6f503b)] p-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
          {alt}
        </div>
      )}
      {children}
    </div>
  );
}
