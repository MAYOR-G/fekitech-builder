import { TemplateImage } from "@/components/templates/TemplateImage";
import { imageSource } from "../assets";
import { useTemplateData } from "../TemplateContext";
import ButtonLink from "./ButtonLink";

export default function DairyFree() {
  const { dairyFree } = useTemplateData();

  return (
    <section className="vs-split vs-dairy" id="order">
      <div className="vs-split-copy">
        <h2>{dairyFree.title}</h2>
        <p>{dairyFree.subtitle}</p>
        <ButtonLink href={dairyFree.buttonHref}>{dairyFree.buttonLabel}</ButtonLink>
      </div>
      <div className="vs-split-media vs-split-media--blue">
        <TemplateImage src={imageSource(dairyFree.image)} alt={dairyFree.imageAlt} loading="eager" />
      </div>
    </section>
  );
}
