'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, Mail, Phone, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Edu<span className="text-emerald-400">Cashback</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              India&apos;s premier admission referral network enabling students & parents to receive guaranteed cashback discounts refunded directly from school and college fees.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Institutional Partner</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#institutions" className="hover:text-emerald-400 transition-colors">Browse Partner Campuses</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How Admission Cashback Works</a></li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">Fee Cashback Calculator</a></li>
              <li><a href="#enquiry" className="hover:text-emerald-400 transition-colors">Submit Admission Enquiry</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Student & Parent Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Helpline: +91 (800) 234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@educashback.in</span>
              </li>
              <li className="text-slate-500 text-[11px] pt-1">
                Operational hours: Monday – Saturday (9:00 AM – 7:00 PM IST)
              </li>
            </ul>
          </div>

          {/* Trust & Direct Payment Guarantee */}
          <div className="space-y-3 bg-slate-800/40 border border-slate-800 p-4 rounded-2xl">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Payment Guarantee</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              You will always pay your admission fees directly to the college or school official account. We never accept or hold student tuition fees.
            </p>
            <div className="text-[11px] text-emerald-300 font-semibold">
              ✓ 100% Free Guidance • Direct Bank Refund
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} EduCashback Network. All rights reserved.</p>
          <p className="text-[11px]">
            Helping families reduce college and school tuition burdens with guaranteed admission refunds.
          </p>
        </div>

      </div>
    </footer>
  );
};
