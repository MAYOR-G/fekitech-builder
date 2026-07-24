import React from "react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import CustomOrder from "./components/CustomOrder";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-cormorant" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });

export default function Main() {
  return (
    <div className={`${cormorant.variable} ${jost.variable} font-sans bg-[#FBF8F1] text-[#3D3A35] min-h-screen selection:bg-[#E2A499] selection:text-white`}>
      <Header />
      <main>
        <Hero />
        <Collections />
        <CustomOrder />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
