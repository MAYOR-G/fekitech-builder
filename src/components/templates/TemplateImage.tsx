import Image, { type ImageProps } from "next/image";

type TemplateImageProps = Omit<ImageProps, "width" | "height"> & {
  width?: ImageProps["width"];
  height?: ImageProps["height"];
};

/**
 * Consistent image rendering for user-selectable templates. The intrinsic
 * fallback prevents layout shift while template CSS remains free to set the
 * displayed dimensions.
 */
export function TemplateImage({
  alt,
  width = 1600,
  height = 900,
  sizes = "100vw",
  ...props
}: TemplateImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      unoptimized
    />
  );
}
