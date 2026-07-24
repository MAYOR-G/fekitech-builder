import React from "react";
import { Syne, DM_Sans } from "next/font/google";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Philosophy from "./components/Philosophy";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

const syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-syne" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-dm" });

export default function Main() {
  return (
    <div className={`${syne.variable} ${dmSans.variable} font-sans bg-[#F9F9F9] text-[#111111] min-h-screen selection:bg-[#E5B53A] selection:text-[#111111]`}>
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
