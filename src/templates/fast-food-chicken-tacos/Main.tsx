import React from "react";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Philosophy from "./components/Philosophy";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"], variable: "--font-bebas" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export default function Main() {
  return (
    <div className={`${bebas.variable} ${space.variable} font-sans bg-[#FF2A00] text-[#111111] min-h-screen selection:bg-[#FFE600] selection:text-[#111111]`}>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Philosophy />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
