'use client';

import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Banknote, 
  GraduationCap, 
  Building, 
  ShieldAlert,
  BadgePercent
} from 'lucide-react';

export const HeroSection = ({ onOpenEnquiry, onExploreClick }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background decorative glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-blue-200/20 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span>Direct Student & Parent Fee Cashback Programme</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Get Admitted to Top Colleges & Schools.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                We Get Your Money Back!
              </span>
            </h1>

            {/* Description highlighting institution-specific cashback */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Apply to verified schools & colleges through our official reference and receive guaranteed cashbacks credited directly into your bank account. <strong className="text-slate-900 font-bold">Each institution has its own verified cashback amount listed below.</strong>
            </p>

            {/* High-visibility Trust Alert: You never pay fees to us! */}
            <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-4 text-left flex items-start gap-3 shadow-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <strong className="text-amber-900 font-black block uppercase tracking-wider">
                  Important: You will NOT pay any fees to us!
                </strong>
                <span className="text-amber-800 leading-relaxed mt-0.5 block">
                  You pay 100% of your tuition fees <strong>directly to the college or school official account</strong>. We do not accept or hold your fees. After your admission is confirmed by the institution, we credit your cashback directly into your parent/student bank account.
                </span>
              </div>
            </div>

            {/* Dynamic Value Overview Card (NOT hardcoded 10,000 on 100,000) */}
            <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-lg shadow-emerald-500/5 relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Individual Campus Rebates
              </div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BadgePercent className="w-4 h-4" />
                How It Works For Any Institution:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[11px] text-slate-500 font-semibold">1. Choose Campus</p>
                  <p className="text-sm sm:text-base font-bold text-slate-800">Check Specific Cashback</p>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Set per school/college</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[11px] text-slate-500 font-semibold">2. Pay Official Fee</p>
                  <p className="text-sm sm:text-base font-bold text-slate-800">Direct to Institution</p>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Pay ₹0 fees to us</span>
                </div>
                <div className="bg-emerald-500 text-white p-3 rounded-xl shadow-md shadow-emerald-500/20 text-center transform scale-[1.02]">
                  <p className="text-[11px] text-emerald-100 font-bold">3. Receive Cashback</p>
                  <p className="text-sm sm:text-base font-black">Direct Bank Credit 🎉</p>
                  <span className="text-[10px] text-emerald-100 font-medium block mt-0.5">After enrollment verified</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Enquire & Claim Cashback</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border-2 border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building className="w-5 h-5 text-emerald-600" />
                <span>Browse Partner Campuses</span>
              </button>
            </div>

            {/* Quick trust checkmarks */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Pay Directly to College (Never to Us)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Specific Cashback Set For Each Campus
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Official Campus Fee Receipts
              </span>
            </div>

          </div>

          {/* Right Column: Hero Images Grid & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Composition */}
              <div className="grid grid-cols-2 gap-3.5 relative">
                
                {/* Main large image (Campus + Graduation) */}
                <div className="space-y-3.5">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" 
                      alt="Happy graduating college students"
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white text-xs font-bold drop-shadow">Happy Students & Parents</span>
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                    <img 
                      src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80" 
                      alt="Premier University Campus"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white text-xs font-bold drop-shadow">Verified Partner Campuses</span>
                    </div>
                  </div>
                </div>

                {/* Right side images */}
                <div className="space-y-3.5 pt-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                    <img 
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80" 
                      alt="School students in classroom"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white text-xs font-bold drop-shadow">Top K-12 Schools</span>
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                    <img 
                      src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80" 
                      alt="University building"
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white text-xs font-bold drop-shadow">Engineering & Management</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: Verified Cashback Proof */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3.5 max-w-xs">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/30">
                  <Banknote className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-800">Fee Refund Settled</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-black">PAID</span>
                  </div>
                  <p className="text-base font-black text-emerald-600">Direct Bank Transfer</p>
                  <p className="text-[10px] text-slate-500">Official receipt issued by college</p>
                </div>
              </div>

              {/* Floating Badge 2: Partner Network */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Direct College Admission</p>
                  <p className="text-[10px] text-slate-500">Pay 100% Fees to College</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
