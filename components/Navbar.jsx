'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Sparkles, 
  Menu, 
  X,
  PhoneCall
} from 'lucide-react';

export const Navbar = ({ onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Clean and uncluttered */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Edu<span className="text-emerald-600">Cashback</span>
                </span>
                <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Direct Refund
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Admission Cashback Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Spacious and clearly spaced */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <button 
              onClick={() => scrollTo('institutions')} 
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer py-1"
            >
              Partner Campuses
            </button>
            <button 
              onClick={() => scrollTo('how-it-works')} 
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer py-1"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollTo('calculator')} 
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer py-1"
            >
              Check Cashback
            </button>
            <button 
              onClick={() => scrollTo('faq')} 
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer py-1"
            >
              FAQs
            </button>
          </nav>

          {/* Action CTA - Single clean prominent button (NO admin link) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-6 py-2.5 text-sm font-extrabold text-white shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                Claim Cashback
              </span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-sm"
            >
              Claim Cashback
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 px-2 space-y-2 bg-white rounded-b-2xl shadow-xl">
            <button 
              onClick={() => scrollTo('institutions')} 
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors"
            >
              Partner Campuses
            </button>
            <button 
              onClick={() => scrollTo('how-it-works')} 
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollTo('calculator')} 
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors"
            >
              Check Campus Cashback
            </button>
            <button 
              onClick={() => scrollTo('faq')} 
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors"
            >
              Frequently Asked Questions
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
