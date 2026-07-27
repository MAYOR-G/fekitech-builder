"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";
import FlavorsPage from "./pages/FlavorsPage";
import HomePage from "./pages/HomePage";

type VelvetPage = "home" | "flavors" | "about" | "book-event";

function pageFromHash(hash: string): VelvetPage {
  if (hash === "#/flavors") return "flavors";
  if (hash === "#/about") return "about";
  if (hash === "#/book-event") return "book-event";
  return "home";
}

export default function Main() {
  const [page, setPage] = useState<VelvetPage>("home");

  useEffect(() => {
    const syncPage = () => setPage(pageFromHash(window.location.hash));
    syncPage();
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  const navigate = useCallback((nextPage: string) => {
    const safePage = pageFromHash(`#/${nextPage}` === "#/home" ? "" : `#/${nextPage}`);
    window.location.hash = safePage === "home" ? "#/" : `#/${safePage}`;
    setPage(safePage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Header currentPage={page} onNavigate={navigate} />
      <main>
        {page === "home" ? <HomePage onNavigate={navigate} /> : null}
        {page === "flavors" ? <FlavorsPage /> : null}
        {page === "about" ? <AboutPage /> : null}
        {page === "book-event" ? <EventsPage /> : null}
      </main>
      <Footer />
    </>
  );
}
