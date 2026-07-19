"use client";
export default function Footer() {
  return (
    <footer className="bg-brand-charcoal pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="md:col-span-2">
          <h2 className="text-4xl font-heading font-bold tracking-widest text-brand-cream mb-6">ROAST & ORIGIN</h2>
          <p className="text-brand-cream/60 max-w-sm mb-8">
            Roasting exceptional coffee since 2018. From the farm to your cup, we care about every step of the journey.
          </p>
          <div className="flex space-x-6 text-brand-cream/60 text-sm font-bold tracking-widest uppercase">
            <a href="#" className="hover:text-brand-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Facebook</a>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-brand-accent">Shop</h4>
          <ul className="space-y-4 text-brand-cream/80">
            <li><a href="#" className="hover:text-white transition-colors">Single Origin</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blends</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Equipment</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Subscriptions</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-brand-accent">Company</h4>
          <ul className="space-y-4 text-brand-cream/80">
            <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Wholesale</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between text-xs text-brand-cream/40 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} ROAST & ORIGIN. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-brand-cream transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-cream transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
