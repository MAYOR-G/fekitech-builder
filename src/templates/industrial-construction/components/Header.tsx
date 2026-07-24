"use client";
import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { Search, ShoppingBag, Menu } from 'lucide-react';

interface HeaderProps {
  setActivePage: (page: string) => void;
  activePage: string;
}

const Header = ({ setActivePage, activePage }: HeaderProps) => {
  const { header } = useTemplateData();

  return (
    <header className="bg-[#212529] text-white flex items-stretch h-20">
      <div className="flex-1 flex items-center justify-between px-8">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('home')}>
          <div className="w-10 h-10 border-2 border-[#f15b26] rounded-full flex items-center justify-center text-[#f15b26]">
            {/* Simple logo icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none">{header.logo}</h1>
            <span className="text-[10px] text-gray-400 tracking-wider uppercase">{header.logoSubtitle}</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {header.nav.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActivePage(item.label.toLowerCase())}
              className={`text-sm font-medium hover:text-[#f15b26] transition-colors ${
                activePage === item.label.toLowerCase() || (activePage === 'home' && idx === 0)
                  ? 'text-white'
                  : 'text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <button className="relative hover:text-[#f15b26] transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute -bottom-2 -right-2 bg-[#f15b26] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </button>
          <button className="hover:text-[#f15b26] transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="bg-[#f15b26] flex items-center px-8 cursor-pointer hover:bg-[#d94b1b] transition-colors">
        <span className="text-sm font-bold tracking-wider mr-4">{header.quoteButton}</span>
        <Menu size={24} />
      </div>
    </header>
  );
};

export default Header;
