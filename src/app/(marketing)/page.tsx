import Hero from "@/components/landing/Hero";
import FloatingMockups from "@/components/landing/FloatingMockups";
import Marquee from "@/components/landing/Marquee";
import TemplatesShowcase from "@/components/landing/TemplatesShowcase";
import Features from "@/components/landing/Features";
import Steps from "@/components/landing/Steps";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FloatingMockups />
      <Marquee />
      <TemplatesShowcase />
      <Features />
      <Steps />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
