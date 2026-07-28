"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export function AlertModal({ 
  isOpen, 
  title, 
  message, 
  onClose 
}: { 
  isOpen: boolean; 
  title: string; 
  message: string; 
  onClose: () => void 
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-zinc-400 mb-6 leading-relaxed text-sm">{message}</p>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
