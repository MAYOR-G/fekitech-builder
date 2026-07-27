import { TemplateImage } from "@/components/templates/TemplateImage";
import { imageSource } from "../assets";
import { useTemplateData } from "../TemplateContext";
import ButtonLink from "./ButtonLink";

export default function Desserts({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { desserts } = useTemplateData();

  return (
    <section className="vs-desserts" id="menu">
      <div className="vs-desserts-copy vs-desserts-copy--left">
        <p className="vs-section-eyebrow">{desserts.eyebrow}</p>
        <h2>{desserts.title}</h2>
      </div>
      <TemplateImage className="vs-desserts-image" src={imageSource(desserts.image)} alt={desserts.imageAlt} loading="eager" />
      <div className="vs-desserts-copy vs-desserts-copy--right">
        <p>{desserts.description}</p>
        <ButtonLink href={desserts.buttonHref} onNavigate={onNavigate}>{desserts.buttonLabel}</ButtonLink>
      </div>
    </section>
  );
}
