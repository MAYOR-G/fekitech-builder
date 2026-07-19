"use client";
import { MapPin, Phone, Mail } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-white/10 pt-24 pb-12 relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-4xl tracking-widest text-white">
              INK & <span className="text-[#8B2635]">IRON</span>
            </h2>
            <p className="text-[#F5F5F5]/70 text-sm leading-relaxed max-w-[280px]">
              London&apos;s premier destination for custom tattoos, expert piercings, and uncompromising artistic vision.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#141414] transition-all duration-300">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#141414] transition-all duration-300">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#141414] transition-all duration-300">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xl tracking-widest text-white mb-2">CONTACT</h3>
            <ul className="flex flex-col gap-4 text-sm text-[#F5F5F5]/70">
              <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <span>124 Shoreditch High St,<br/>London, E1 6JE</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <span>+44 20 7123 4567</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <span>bookings@inkandiron.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xl tracking-widest text-white mb-2">HOURS</h3>
            <ul className="flex flex-col gap-4 text-sm text-[#F5F5F5]/70">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Monday - Thursday</span>
                <span className="text-white">11:00 - 19:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Friday - Saturday</span>
                <span className="text-white">11:00 - 21:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Sunday</span>
                <span className="text-[#C9A84C]">By Appointment</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xl tracking-widest text-white mb-2">THE UNDERGROUND</h3>
            <p className="text-[#F5F5F5]/70 text-sm leading-relaxed">
              Join our mailing list for guest artist announcements, flash days, and exclusive merchandise drops.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
              <button className="w-full bg-white text-[#141414] px-4 py-3 font-bold tracking-widest text-xs uppercase hover:bg-[#C9A84C] transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Massive Footer Typography */}
        <div className="w-full overflow-hidden flex justify-center py-12 border-t border-white/10">
          <h1 className="font-display text-[12vw] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none whitespace-nowrap">
            INK & IRON
          </h1>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 mt-8">
          <p>© {new Date().getFullYear()} Ink & Iron Studio. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Aftercare Guide</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
