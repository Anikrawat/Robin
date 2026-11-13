'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Do I pay college fees to you or to the college?',
      a: 'You NEVER pay any tuition fees to us! You pay 100% of your fees directly to the official bank account or fee counter of the college/school. You receive the official stamped institutional receipt. We do not accept or handle your tuition money. Once you show your fee receipt, we transfer your cashback directly to your bank account.'
    },
    {
      q: 'Why do we get money back from our college/school fees?',
      a: 'Colleges and schools provide institutional admission grants and fee rebate incentives for students joining through our certified referral network. Instead of keeping that money hidden, we pass that cashback directly back to you and your parents to help reduce your education expenses!'
    },
    {
      q: 'How and when do we receive our cashback money?',
      a: 'Once your admission is approved and the college verifies payment of your standard fee, your guaranteed cashback (as configured specifically for that institution) is disbursed within 7 to 10 working days directly into the parent or student bank account via NEFT, RTGS, or UPI.'
    },
    {
      q: 'Will the college charge me higher fees because of this cashback?',
      a: 'No! You pay the exact standard government or institutional fee set by the college or school. You get the official college fee receipt for the full amount. The cashback is a direct refund sent to your bank account.'
    },
    {
      q: 'Do I have to pay anything to your platform for this service?',
      a: 'No, our counseling and referral service is 100% FREE for students and parents. We never charge any upfront fees or registration charges.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Got Questions?
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Everything you need to know about our admission cashback programme and direct college payments.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
