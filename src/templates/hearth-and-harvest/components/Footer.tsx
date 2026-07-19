"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white border-t border-white/10 pt-20 pb-10 px-6 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-heading text-3xl tracking-widest uppercase mb-6">
              HEARTH &<br />HARVEST
            </h2>
            <p className="font-sans text-brand-gray text-sm leading-relaxed max-w-xs">
              A premium dining experience celebrating the finest seasonal ingredients, served with a modern twist.
            </p>
          </div>

          {/* Links 1 */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-heading text-lg tracking-widest mb-2 uppercase text-white/80">Discover</h4>
            <Link href="#menu" className="font-sans text-sm text-brand-gray hover:text-white transition-colors">Menus</Link>
            <Link href="#story" className="font-sans text-sm text-brand-gray hover:text-white transition-colors">Our Story</Link>
            <Link href="#locations" className="font-sans text-sm text-brand-gray hover:text-white transition-colors">Locations</Link>
            <Link href="#catering" className="font-sans text-sm text-brand-gray hover:text-white transition-colors">Catering</Link>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-heading text-lg tracking-widest mb-2 uppercase text-white/80">Support</h4>
            <Link href="#reservations" className="font-sans text-sm text-brand-gray hover:text-white transition-colors">Reservations</Link>
            <Link href="#contact" className="font-sans text-sm text-brand-gray hover:text-white transition-colors">Contact Us</Link>
            <Link href="#faq" className="font-sans text-sm text-brand-gray hover:text-white transition-colors">FAQ</Link>
            <Link href="#privacy" className="font-sans text-sm text-brand-gray hover:text-white transition-colors">Privacy Policy</Link>
          </div>

          {/* Social */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-heading text-lg tracking-widest mb-2 uppercase text-white/80">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all font-sans text-xs">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all font-sans text-xs">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all font-sans text-xs">
                X
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-brand-gray uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Hearth & Harvest. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="font-sans text-xs text-brand-gray hover:text-white uppercase tracking-wider transition-colors">Terms</Link>
            <Link href="#" className="font-sans text-xs text-brand-gray hover:text-white uppercase tracking-wider transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
