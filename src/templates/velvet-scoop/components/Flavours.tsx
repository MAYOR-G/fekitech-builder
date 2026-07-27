import { TemplateImage } from "@/components/templates/TemplateImage";
import { imageSource } from "../assets";
import { useTemplateData } from "../TemplateContext";
import ButtonLink from "./ButtonLink";

export default function Flavours({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { flavours } = useTemplateData();

  return (
    <section className="vs-flavours" id="flavours">
      <p className="vs-kicker">{flavours.kicker}</p>
      <h2>{flavours.title}</h2>
      <TemplateImage className="vs-flavours-wide" src={imageSource(flavours.image)} alt={flavours.imageAlt} loading="eager" />
      <div className="vs-flavour-images" role="list" aria-label="Featured flavours">
        {flavours.items.map((item) => (
          <figure className="vs-flavour-item" key={item.name} role="listitem">
            <TemplateImage src={imageSource(item.image)} alt={item.alt} loading="eager" />
            <figcaption>{item.name}</figcaption>
          </figure>
        ))}
      </div>
      <div className="vs-flavours-copy">
        <p>{flavours.description}</p>
        <ButtonLink href={flavours.buttonHref} variant="outline" onNavigate={onNavigate}>
          {flavours.buttonLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
