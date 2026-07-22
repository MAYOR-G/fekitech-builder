import PremiumFoodTemplate, { type PremiumFoodData } from "../../../src/templates/_premium-food/PremiumFoodTemplate";
import content from "../../../src/templates/pizza-light-clean/editable.json";
export default function App() { return <PremiumFoodTemplate data={content as PremiumFoodData} variant="pizza-light" />; }
