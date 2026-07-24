import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const data = useTemplateData();

  return (
    <footer className="bg-[#111] text-white pt-20 pb-10 border-t-4 border-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div>
            <div className="text-3xl font-serif font-bold text-white mb-6 cursor-pointer" onClick={() => setActivePage("Home")}>
              {data.brand.logoText}
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Premium construction and building services dedicated to quality, safety, and client satisfaction on every project.
            </p>
            <div className="flex space-x-4">
              <a href={data.social.facebook} className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href={data.social.twitter} className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href={data.social.instagram} className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href={data.social.linkedin} className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-xl font-bold font-serif mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setActivePage("About")} className="text-gray-400 hover:text-[var(--color-primary)] transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> About Us</button></li>
              <li><button onClick={() => setActivePage("Services")} className="text-gray-400 hover:text-[var(--color-primary)] transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Services</button></li>
              <li><button onClick={() => setActivePage("Home")} className="text-gray-400 hover:text-[var(--color-primary)] transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Projects</button></li>
              <li><button onClick={() => setActivePage("Home")} className="text-gray-400 hover:text-[var(--color-primary)] transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Our Team</button></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-xl font-bold font-serif mb-6 text-white">Services</h4>
            <ul className="space-y-4">
              {data.services.items.map((service: any, index: number) => (
                <li key={index}><button onClick={() => setActivePage("Services")} className="text-gray-400 hover:text-[var(--color-primary)] transition-colors flex items-center text-left"><ArrowRight size={14} className="mr-2 shrink-0" /> {service.title}</button></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold font-serif mb-6 text-white">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for latest updates and news.</p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
              <button 
                type="submit" 
                className="bg-[var(--color-primary)] text-white py-3 font-bold uppercase tracking-wider hover:bg-white hover:text-[#111] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} {data.brand.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
