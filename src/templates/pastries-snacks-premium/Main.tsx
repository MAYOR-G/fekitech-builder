import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Philosophy from "./components/Philosophy";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import "./styles.css";

export default function Main() {
  return (
    <div className="gf-site">
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
