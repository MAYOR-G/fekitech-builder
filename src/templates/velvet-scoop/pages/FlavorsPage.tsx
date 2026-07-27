import { TemplateImage } from "@/components/templates/TemplateImage";
import { imageSource } from "../assets";
import PageHero from "../components/PageHero";
import { useTemplateData } from "../TemplateContext";

export default function FlavorsPage() {
  const { pages } = useTemplateData();
  const page = pages.flavors;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} />
      <section className="vs-menu-page">
        <h2>{page.sectionTitle}</h2>
        <div className="vs-menu-columns">
          {page.columns.map((column) => (
            <section className="vs-menu-column" key={column.title}>
              <h3>{column.title}</h3>
              <div>
                {column.items.map((item) => (
                  <article className="vs-menu-item" key={item.name}>
                    <div className="vs-menu-item-main">
                      <div className="vs-menu-line">
                        <h4>{item.name}</h4>
                        <span aria-hidden="true" />
                        <strong>{item.price}</strong>
                      </div>
                      <p>{item.description}</p>
                    </div>
                    <TemplateImage src={imageSource(item.image)} alt={item.alt} loading="eager" />
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
