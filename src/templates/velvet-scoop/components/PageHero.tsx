type PageHeroProps = {
  eyebrow: string;
  title: string;
};

export default function PageHero({ eyebrow, title }: PageHeroProps) {
  return (
    <section className="vs-page-hero">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
    </section>
  );
}
