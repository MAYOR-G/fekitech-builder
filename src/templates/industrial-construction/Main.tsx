"use client";

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Impacts from './components/Impacts';
import Quality from './components/Quality';
import Footer from './components/Footer';

const Main = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <Hero />
            <Services />
            <Impacts />
            <Quality />
          </>
        );
      default:
        return (
          <>
            <Hero />
            <Services />
            <Impacts />
            <Quality />
          </>
        );
    }
  };

  return (
    <div className="font-sans text-[#1a1a1a] bg-white min-h-screen flex flex-col">
      <Header setActivePage={setActivePage} activePage={activePage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
};

export default Main;
