"use client";
export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="md:col-span-1">
          <div className="font-serif text-2xl font-bold tracking-wide text-white mb-6">
            LEDGER <span className="text-gold-500">&</span> CO.
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-8 font-light">
            Premium accounting, tax strategy, and virtual CFO services for discerning businesses across the UK.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-forest-900 transition-colors text-sm font-medium">
              IN
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-forest-900 transition-colors text-sm font-medium">
              IG
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-gold-500 uppercase text-xs tracking-widest font-bold mb-8">Expertise</h4>
          <ul className="space-y-4 text-sm text-white/70 font-light">
            <li><a href="#" className="hover:text-white transition-colors">Tax Strategy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Corporate Finance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Private Wealth</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cloud Accounting</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-gold-500 uppercase text-xs tracking-widest font-bold mb-8">The Firm</h4>
          <ul className="space-y-4 text-sm text-white/70 font-light">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Our Approach</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-gold-500 uppercase text-xs tracking-widest font-bold mb-8">Contact</h4>
          <ul className="space-y-4 text-sm text-white/70 font-light mb-6">
            <li>100 Broad Street<br/>Birmingham<br/>B1 2HQ</li>
            <li className="pt-4 text-white hover:text-gold-500 transition-colors"><a href="tel:01214567890">0121 456 7890</a></li>
            <li className="text-white hover:text-gold-500 transition-colors"><a href="mailto:hello@ledgerco.uk">hello@ledgerco.uk</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-light text-white/30 pt-8 border-t border-white/5">
        <p>&copy; 2026 Ledger & Co Advisory Ltd. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
