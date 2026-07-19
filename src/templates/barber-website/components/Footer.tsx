"use client";
export default function Footer() {
  return (
    <footer className="bg-brand-charcoal pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="font-heading font-bold text-3xl tracking-widest text-brand-cream mb-6">
            THE STUDIO.
          </div>
          <p className="text-brand-cream/60 max-w-sm mb-8 font-light leading-relaxed">
            A premium grooming destination in the heart of London. Precision cuts, expert styling, and an unparalleled studio experience.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-brand-cream hover:text-brand-accent transition-colors">Instagram</a>
            <a href="#" className="text-brand-cream hover:text-brand-accent transition-colors">TikTok</a>
            <a href="#" className="text-brand-cream hover:text-brand-accent transition-colors">Spotify</a>
          </div>
        </div>

        <div>
          <h4 className="font-heading uppercase text-brand-accent tracking-widest mb-6">Contact</h4>
          <ul className="space-y-4 text-brand-cream/80 text-sm">
            <li>124 Style Avenue, London, W1D 4DX</li>
            <li>hello@thestudio.co.uk</li>
            <li>+44 (0) 20 7123 4567</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading uppercase text-brand-accent tracking-widest mb-6">Hours</h4>
          <ul className="space-y-4 text-brand-cream/80 text-sm">
            <li className="flex justify-between"><span>Mon - Fri</span> <span>9am - 8pm</span></li>
            <li className="flex justify-between"><span>Saturday</span> <span>9am - 6pm</span></li>
            <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-brand-cream/40 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} The Studio. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-brand-cream transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-cream transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
