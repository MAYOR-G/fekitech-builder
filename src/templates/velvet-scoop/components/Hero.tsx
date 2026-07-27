import { TemplateImage } from "@/components/templates/TemplateImage";
import { imageSource } from "../assets";
import { useTemplateData } from "../TemplateContext";
import ButtonLink from "./ButtonLink";

export default function Hero({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { hero } = useTemplateData();

  return (
    <section className="vs-hero" id="home" aria-label="Velvet Scoop hero">
      <TemplateImage
        src={imageSource(hero.image)}
        alt={hero.imageAlt}
        className="vs-hero-image"
        priority
      />
      <div className="vs-hero-content">
        <h1>{hero.title}</h1>
        <div className="vs-hero-row">
          <p>{hero.subtitle}</p>
          <ButtonLink href={hero.buttonHref} onNavigate={onNavigate}>{hero.buttonLabel}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
