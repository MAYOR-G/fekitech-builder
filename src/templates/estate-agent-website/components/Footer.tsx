"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-navy text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div>
            <h3 className="font-serif text-[28px] text-white mb-6">
              Northlane.
            </h3>
            <p className="text-[14px] text-white/60 leading-[1.6] mb-6 max-w-[250px]">
              Premium estate agency serving London&apos;s most desirable neighbourhoods with discretion, expertise, and unmatched service.
            </p>
            <div className="flex items-center gap-4 text-white/60">
              <a href="#" className="hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gold transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gold transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gold transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-[13px] uppercase tracking-widest text-gold font-medium mb-6">Contact</h4>
            <ul className="space-y-4 text-[14px] text-white/70">
              <li>
                <span className="block text-white/40 mb-1 text-[12px]">Office</span>
                142 Kensington High Street,<br />
                London, W8 7RL
              </li>
              <li>
                <span className="block text-white/40 mb-1 text-[12px]">Phone</span>
                <a href="tel:+442071234567" className="hover:text-gold transition-colors">+44 (0) 20 7123 4567</a>
              </li>
              <li>
                <span className="block text-white/40 mb-1 text-[12px]">Email</span>
                <a href="mailto:enquiries@northlane.co.uk" className="hover:text-gold transition-colors">enquiries@northlane.co.uk</a>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-[13px] uppercase tracking-widest text-gold font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3 text-[14px] text-white/70">
              <li><a href="#" className="hover:text-gold transition-colors">Properties for Sale</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Properties to Let</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Property Valuation</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Landlord Services</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Market Insights</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">About the Agency</a></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h4 className="text-[13px] uppercase tracking-widest text-gold font-medium mb-6">Legal</h4>
            <ul className="space-y-3 text-[14px] text-white/70">
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Complaints Procedure</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Client Money Protection</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/40">
            &copy; {new Date().getFullYear()} Northlane Estates Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <TemplateImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Propertymark_logo.svg/512px-Propertymark_logo.svg.png" alt="Propertymark" className="h-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
            <TemplateImage src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/The_Property_Ombudsman_logo.svg/512px-The_Property_Ombudsman_logo.svg.png" alt="The Property Ombudsman" className="h-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}
