'use client';

import React from 'react';
import { Search, FileText, CheckCircle, Banknote, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const HowItWorks = ({ onOpenEnquiry }) => {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: 'Find School or College',
      description: 'Search through verified partner institutions across India with guaranteed student fee cashback offers.',
      tag: 'Browse Catalogue'
    },
    {
      step: '02',
      icon: FileText,
      title: 'Get Free Referral Token',
      description: 'Submit our free enquiry form. We assign your official admission reference token for that institution.',
      tag: '100% Free Service'
    },
    {
      step: '03',
      icon: CheckCircle,
      title: 'Pay Fees Directly to College',
      description: 'Pay your tuition fees 100% directly to the college or school official account. You do NOT pay fees to us!',
      tag: 'Pay Direct to College'
    },
    {
      step: '04',
      icon: Banknote,
      title: 'We Get Your Money Back!',
      description: 'Once the college verifies your enrollment receipt, ₹10,000 to ₹50,000 is directly transferred back to your bank account!',
      tag: 'Direct Bank / UPI Refund'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Transparent & Safe
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How We Get Your Money Back
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            A safe, zero-risk student cashback program. You pay your college directly and receive verified money back into your hands.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step} 
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-500/30 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-2">
                    {item.tag}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                  <span>Step {item.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2 justify-center md:justify-start">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
              <span>You always pay your fees directly to the college!</span>
            </h3>
            <p className="text-emerald-100 text-sm">
              We never ask you to transfer tuition fees to our platform. All payments happen on the official college counter.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry && onOpenEnquiry()}
            className="px-6 py-3.5 bg-white hover:bg-slate-100 text-emerald-900 rounded-xl font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Submit Free Enquiry
          </button>
        </div>

      </div>
    </section>
  );
};
