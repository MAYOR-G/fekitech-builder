import React from "react";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Packages from "./components/Packages";
import Testimonials from "./components/Testimonials";
import Strip from "./components/Strip";
import Reservations from "./components/Reservations";
import Footer from "./components/Footer";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function Main() {
  return (
    <div className={`${playfair.variable} ${inter.variable} font-sans bg-[#F9F8F6] text-[#2C2A26] min-h-screen selection:bg-[#9B2C3F] selection:text-white`}>
      <Header />
      <main>
        <Hero />
        <Strip />
        <Philosophy />
        <Menu />
        <Packages />
        <Gallery />
        <Testimonials />
        <Reservations />
      </main>
      <Footer />
    </div>
  );
}
