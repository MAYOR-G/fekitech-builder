import { TemplateImage } from "@/components/templates/TemplateImage";
import { imageSource } from "../assets";
import ButtonLink from "../components/ButtonLink";
import PageHero from "../components/PageHero";
import { useTemplateData } from "../TemplateContext";

export default function EventsPage() {
  const { pages } = useTemplateData();
  const page = pages.events;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} />
      <section className="vs-events-page">
        <div className="vs-events-intro">
          <p>{page.introEyebrow}</p>
          <h2>{page.introTitle}</h2>
          <span>{page.description}</span>
        </div>
        <article className="vs-event-card">
          <TemplateImage src={imageSource(page.image)} alt={page.imageAlt} loading="eager" />
          <div className="vs-event-details">
            <h3>{page.serviceTitle}</h3>
            <hr />
            <p>{page.duration}</p>
            <p>{page.price}</p>
            <ButtonLink href={page.buttonHref}>{page.buttonLabel}</ButtonLink>
          </div>
        </article>
      </section>
    </>
  );
}
