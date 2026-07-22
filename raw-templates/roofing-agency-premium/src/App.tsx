import PremiumServiceTemplate, { type PremiumServiceData } from "../../../src/templates/_premium-service/PremiumServiceTemplate";
import content from "../../../src/templates/roofing-agency-premium/editable.json";

export default function App() {
  return <PremiumServiceTemplate data={content as PremiumServiceData} variant="roofing" />;
}
