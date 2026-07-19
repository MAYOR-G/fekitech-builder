"use client";
export default function Footer() {
  return (
    <footer id="footer" className="bg-brand-forest text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <h2 className="font-serif text-3xl mb-4 text-white">SANCTUM</h2>
            <p className="text-white/80 text-[15px] max-w-sm font-sans mb-8">
              A place to return to yourself.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-brand-sand hover:text-white transition-colors duration-200 uppercase tracking-widest text-xs">Instagram</a>
              <a href="#" className="text-brand-sand hover:text-white transition-colors duration-200 uppercase tracking-widest text-xs">Pinterest</a>
            </div>
          </div>

          {/* Center Column */}
          <div className="flex flex-col gap-4">
            <a href="#treatments" className="text-white/80 hover:text-brand-sand transition-colors duration-200 font-sans text-[15px]">Treatments</a>
            <a href="#retreats" className="text-white/80 hover:text-brand-sand transition-colors duration-200 font-sans text-[15px]">Retreats</a>
            <a href="#journal" className="text-white/80 hover:text-brand-sand transition-colors duration-200 font-sans text-[15px]">Wellness</a>
            <a href="#gift-cards" className="text-white/80 hover:text-brand-sand transition-colors duration-200 font-sans text-[15px]">Gift Cards</a>
            <a href="#footer" className="text-white/80 hover:text-brand-sand transition-colors duration-200 font-sans text-[15px]">Contact</a>
            <a href="#" className="text-white/80 hover:text-brand-sand transition-colors duration-200 font-sans text-[15px]">Privacy</a>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 text-[15px] font-sans text-white/80">
            <div>
              <p>12 Grove Lane, Cotswolds, GL7 2BX</p>
              <p>hello@sanctum-wellness.com</p>
              <p>+44 1285 654321</p>
            </div>
            <div>
              <p>Mon–Sat: 9am–9pm</p>
              <p>Sun: 10am–6pm</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-muted text-xs font-sans">
          <p>© 2026 Sanctum Wellness. All rights reserved.</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
