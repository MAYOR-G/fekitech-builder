import { TemplateImage } from "@/components/templates/TemplateImage";
import { imageSource } from "../assets";
import { useTemplateData } from "../TemplateContext";
import ButtonLink from "./ButtonLink";

export default function About({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { about } = useTemplateData();

  return (
    <section className="vs-split vs-about" id="about">
      <div className="vs-split-copy">
        <p className="vs-section-eyebrow">{about.eyebrow}</p>
        <h2>{about.title}</h2>
        <p>{about.description}</p>
        <ButtonLink href={about.buttonHref} variant="outline" onNavigate={onNavigate}>{about.buttonLabel}</ButtonLink>
      </div>
      <div className="vs-split-media">
        <TemplateImage src={imageSource(about.image)} alt={about.imageAlt} loading="eager" />
      </div>
    </section>
  );
}
