'use client';

import React from 'react';
import { Star, Banknote } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      name: 'Rakesh Sharma',
      role: 'Parent of Engineering Student',
      college: 'Apex Institute of Technology, Bengaluru',
      cashback: '₹15,000 Cashback Received',
      content: 'At first I was skeptical about whether any platform really gives ₹15,000 back from college fees. But within 10 days of my son paying the first semester fee, ₹15,000 was credited directly to my HDFC account via NEFT. Truly transparent service!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      name: 'Pooja Iyer',
      role: 'MBA Student (Batch 2026)',
      college: 'Symbiosis Metropolis Academy, Pune',
      cashback: '₹30,000 Cashback Received',
      content: 'MBA tuition is steep, so getting ₹30,000 refunded as admission cashback covered my entire laptop and book expenses for the first year. The counselor was super helpful and verified my scholarship quickly.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      name: 'Dr. Vikram Deshmukh',
      role: 'Father of School Student',
      college: 'St. Xavier Global International, Delhi',
      cashback: '₹10,000 Cashback Received',
      content: 'We shifted to Delhi and were looking for Class 9 admission. Got admission easily and received a ₹10,000 cashback voucher that was settled right after school registration. Highly recommended to all parents!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Real Stories & Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Trusted by Hundreds of Students & Parents
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Over ₹1.4 Crore has been returned to families across India through our admission cashback programme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div 
              key={i} 
              className="bg-slate-50 border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Cashback badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-black mb-4">
                  <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{rev.cashback}</span>
                </div>

                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-3">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500" 
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.role}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">{rev.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
