import PremiumHospitalityTemplate, { type PremiumHospitalityData } from "../../../src/templates/_premium-hospitality/PremiumHospitalityTemplate";
import content from "../../../src/templates/premium-restaurant/editable.json";
export default function App() { return <PremiumHospitalityTemplate data={content as PremiumHospitalityData} variant="restaurant" />; }
