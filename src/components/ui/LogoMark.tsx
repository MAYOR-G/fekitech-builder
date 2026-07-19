import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoMarkProps {
  className?: string;
  src?: string;
  alt?: string;
}

export function LogoMark({
  className,
  src = "/fekitech-logo.png",
  alt = "FekiTech Builder",
}: LogoMarkProps) {
  return (
    <div
      className={cn(
        "relative h-10 w-10 shrink-0",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="40px"
        className="object-contain"
        priority
      />
    </div>
  );
}
