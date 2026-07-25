import React from "react";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Philosophy from "./components/Philosophy";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function Main() {
  return (
    <div className={`${playfair.variable} ${inter.variable} font-sans bg-[#FDF9F1] text-[#3D2721] min-h-screen selection:bg-[#FFB5F2] selection:text-[#3D2721]`}>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Philosophy />
        <Testimonials />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
