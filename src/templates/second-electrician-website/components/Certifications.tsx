"use client";
const Certifications = () => {
  return (
    <section className="bg-electric-surface py-12 border-y border-electric-stone/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-electric-stone mb-8">
          Certified & Accredited
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="font-display font-black text-2xl tracking-tighter text-electric-charcoal">NICEIC</div>
          <div className="font-display font-black text-2xl tracking-tighter text-electric-charcoal">OLEV APPROVED</div>
          <div className="font-display font-black text-2xl tracking-tighter text-electric-charcoal">RECC</div>
          <div className="font-display font-black text-2xl tracking-tighter text-electric-charcoal">TRUSTMARK</div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
