import AnnouncementBar from "@/components/landing/AnnouncementBar";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ft-surface text-ft-ink selection:bg-ft-primary/15 selection:text-ft-primary">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
