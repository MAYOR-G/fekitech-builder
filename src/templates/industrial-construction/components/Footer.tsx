"use client";
import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  const { footer } = useTemplateData();

  return (
    <footer className="bg-[#1a1c1e] text-gray-400 pt-24 pb-12 border-t-[20px] border-[#f15b26]">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-8 cursor-pointer" onClick={() => setActivePage('home')}>
              <div className="w-12 h-12 border-2 border-[#f15b26] flex items-center justify-center text-[#f15b26]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white leading-none tracking-tight">{footer.logo}</h1>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-8">
              {footer.description}
            </p>
            <div className="flex space-x-2">
              {footer.social.facebook && (
                <a href={footer.social.facebook} className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#f15b26] hover:text-white transition-colors">
                  <Facebook size={16} />
                </a>
              )}
              {footer.social.twitter && (
                <a href={footer.social.twitter} className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#f15b26] hover:text-white transition-colors">
                  <Twitter size={16} />
                </a>
              )}
              {footer.social.linkedin && (
                <a href={footer.social.linkedin} className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#f15b26] hover:text-white transition-colors">
                  <Linkedin size={16} />
                </a>
              )}
              {footer.social.instagram && (
                <a href={footer.social.instagram} className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#f15b26] hover:text-white transition-colors">
                  <Instagram size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#f15b26]"></span>
            </h4>
            <ul className="space-y-4 text-sm">
              {footer.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => setActivePage(link.label.toLowerCase())}
                    className="hover:text-[#f15b26] transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-[#f15b26] mr-3"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#f15b26]"></span>
            </h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="text-[#f15b26] mt-1 mr-4 flex-shrink-0" />
                <span className="leading-relaxed">{footer.contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[#f15b26] mr-4 flex-shrink-0" />
                <span>{footer.contactInfo.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-[#f15b26] mr-4 flex-shrink-0" />
                <span>{footer.contactInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#f15b26]"></span>
            </h4>
            <p className="text-sm leading-relaxed mb-6">
              {footer.newsletter.description}
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder={footer.newsletter.placeholder}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm text-white focus:outline-none focus:border-[#f15b26] transition-colors"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-[#f15b26] text-white px-4 hover:bg-[#d94b1b] transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} {footer.logo}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
