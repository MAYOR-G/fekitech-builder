import About from "../components/About";
import DairyFree from "../components/DairyFree";
import Delivery from "../components/Delivery";
import Desserts from "../components/Desserts";
import Flavours from "../components/Flavours";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";

export default function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Flavours onNavigate={onNavigate} />
      <DairyFree />
      <About onNavigate={onNavigate} />
      <Desserts onNavigate={onNavigate} />
      <Delivery />
      <Gallery />
    </>
  );
}
