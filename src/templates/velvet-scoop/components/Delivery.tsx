import { useTemplateData } from "../TemplateContext";
import ButtonLink from "./ButtonLink";

export default function Delivery() {
  const { delivery } = useTemplateData();

  return (
    <section className="vs-delivery" id="events">
      <h2>{delivery.title}</h2>
      <p>{delivery.subtitle}</p>
      <ButtonLink href={delivery.buttonHref} variant="light">{delivery.buttonLabel}</ButtonLink>
    </section>
  );
}
