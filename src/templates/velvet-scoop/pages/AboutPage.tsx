import { TemplateImage } from "@/components/templates/TemplateImage";
import { imageSource } from "../assets";
import PageHero from "../components/PageHero";
import { useTemplateData } from "../TemplateContext";

export default function AboutPage() {
  const { pages } = useTemplateData();
  const page = pages.about;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} />
      <section className="vs-about-page">
        {page.sections.map((section) => (
          <article className="vs-about-panel" key={section.title}>
            <div className="vs-about-panel-image">
              <TemplateImage src={imageSource(section.image)} alt={section.imageAlt} loading="eager" />
            </div>
            <div className="vs-about-panel-copy">
              <p>{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <span>{section.description}</span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
