'use client';

import React, { useState, useEffect } from 'react';
import { Building2, ArrowRight, Sparkles, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEED_INSTITUTIONS } from '@/lib/seedData';

export const CashbackCalculator = ({ colleges = [], onClaimWithEstimate }) => {
  const effectiveColleges = colleges && colleges.length > 0 ? colleges : SEED_INSTITUTIONS;

  const [selectedCollegeId, setSelectedCollegeId] = useState(
    () => (effectiveColleges[0]?._id || effectiveColleges[0]?.id || '')
  );

  // Sync selectedCollegeId when colleges load or change
  useEffect(() => {
    if (effectiveColleges && effectiveColleges.length > 0) {
      const exists = effectiveColleges.some(c => (c._id || c.id) === selectedCollegeId);
      if (!selectedCollegeId || !exists) {
        setSelectedCollegeId(effectiveColleges[0]._id || effectiveColleges[0].id);
      }
    }
  }, [effectiveColleges, selectedCollegeId]);

  const activeCollege = 
    effectiveColleges.find(c => (c._id || c.id) === selectedCollegeId) || 
    effectiveColleges[0] || 
    SEED_INSTITUTIONS[0];

  const netEffectiveFee = activeCollege.fees - activeCollege.cashback;

  const handleClaim = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore
    }
    if (onClaimWithEstimate) {
      onClaimWithEstimate(activeCollege);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
            <Building2 className="w-3.5 h-3.5" />
            Institution Cashback Explorer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Check Exact Cashback for Each Institution
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Every school and college has its own specific cashback refund set by the institution. Select any campus below to view their verified numbers.
          </p>
        </div>

        {/* Explorer Card */}
        <div className="max-w-4xl mx-auto bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select School or College:
                </label>
                <div className="relative">
                  <select
                    value={activeCollege._id || activeCollege.id}
                    onChange={(e) => setSelectedCollegeId(e.target.value)}
                    className="w-full bg-slate-900 border-2 border-slate-700 focus:border-emerald-500 rounded-2xl py-3.5 px-4 text-sm font-bold text-white outline-none transition-colors cursor-pointer"
                  >
                    {effectiveColleges.map((col) => (
                      <option key={col._id || col.id} value={col._id || col.id} className="bg-slate-900 text-white">
                        {col.name} ({col.state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Institution Chips */}
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-2">Quick Select Sample Campuses:</p>
                <div className="flex flex-wrap gap-2">
                  {effectiveColleges.slice(0, 4).map((c) => {
                    const isSelected = (c._id || c.id) === (activeCollege._id || activeCollege.id);
                    return (
                      <button
                        key={c._id || c.id}
                        type="button"
                        onClick={() => setSelectedCollegeId(c._id || c.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                        }`}
                      >
                        {c.name.split(' ')[0]} ({c.state})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notice */}
              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/80 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Individual Institution Rebate</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  Cashback amounts are determined specifically for each institution and are credited into your bank account once the college verifies your enrollment receipt.
                </p>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 relative">
              <div className="space-y-4">
                
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Selected Institution</span>
                  <h4 className="text-base font-extrabold text-white mt-0.5 line-clamp-1">{activeCollege.name}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{activeCollege.state} • {activeCollege.type}</span>
                  </p>
                </div>

                <div className="flex justify-between items-center text-sm border-t border-slate-700/80 pt-3">
                  <div>
                    <span className="text-slate-300 font-semibold block">Official Tuition Fee</span>
                    <span className="text-[10px] text-amber-300 font-medium">Paid 100% directly to college</span>
                  </div>
                  <span className="font-bold text-white text-base">₹{Number(activeCollege.fees).toLocaleString('en-IN')}</span>
                </div>

                {/* Big Highlight: The Cashback for this College */}
                <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-5 text-center my-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Guaranteed Money Back For This Institution
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 my-1.5">
                    ₹{Number(activeCollege.cashback).toLocaleString('en-IN')} Back 🎉
                  </div>
                  <p className="text-xs text-emerald-200">
                    Transferred straight to your bank account / UPI after enrollment!
                  </p>
                </div>

                {/* Net Cost */}
                <div className="flex justify-between items-center pt-1 text-sm border-t border-slate-700/80">
                  <span className="text-slate-300 font-bold">Your Effective Net Fee:</span>
                  <span className="font-extrabold text-emerald-300 text-lg">
                    ₹{netEffectiveFee.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={handleClaim}
                  className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply with ₹{Number(activeCollege.cashback).toLocaleString('en-IN')} Cashback</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  🔒 Zero fees paid to us. 100% direct college fee payment.
                </p>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
