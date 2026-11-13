'use client';

import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  AlertCircle,
  ShieldAlert,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEED_INSTITUTIONS } from '@/lib/seedData';

export const EnquirySection = ({ 
  colleges = [], 
  initialCollege, 
  initialEstimate, 
  onSubmitted,
  isModal = false,
  onClose
}) => {
  const effectiveColleges = colleges && colleges.length > 0 ? colleges : SEED_INSTITUTIONS;

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    collegeName: initialCollege ? initialCollege.name : (effectiveColleges[0]?.name || 'General Admission Counselling'),
    targetCourse: '',
    state: initialCollege ? initialCollege.state : (effectiveColleges[0]?.state || 'Karnataka'),
    message: '',
    fees: initialCollege ? initialCollege.fees : (initialEstimate?.estimatedFee || effectiveColleges[0]?.fees || 100000),
    cashback: initialCollege ? initialCollege.cashback : (initialEstimate?.estimatedCashback || effectiveColleges[0]?.cashback || 10000),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialCollege) {
      setFormData(prev => ({
        ...prev,
        collegeName: initialCollege.name,
        state: initialCollege.state,
        fees: initialCollege.fees,
        cashback: initialCollege.cashback,
      }));
    } else if (initialEstimate) {
      setFormData(prev => ({
        ...prev,
        fees: initialEstimate.estimatedFee,
        cashback: initialEstimate.estimatedCashback,
      }));
    } else if (effectiveColleges.length > 0 && (!formData.collegeName || formData.collegeName === 'General Admission Counselling')) {
      setFormData(prev => ({
        ...prev,
        collegeName: effectiveColleges[0].name,
        state: effectiveColleges[0].state,
        fees: effectiveColleges[0].fees,
        cashback: effectiveColleges[0].cashback,
      }));
    }
  }, [initialCollege, initialEstimate, effectiveColleges]);

  const handleCollegeChange = (e) => {
    const val = e.target.value;
    const match = effectiveColleges.find(c => c.name === val);
    if (match) {
      setFormData(prev => ({
        ...prev,
        collegeName: match.name,
        state: match.state,
        fees: match.fees,
        cashback: match.cashback,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        collegeName: val,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.studentName.trim()) {
      setErrorMsg('Please enter student name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit enquiry');
      }

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      setSubmittedRef(result.enquiry);
      if (onSubmitted) {
        onSubmitted(result.enquiry);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      email: '',
      collegeName: effectiveColleges[0]?.name || 'General Admission Counselling',
      targetCourse: '',
      state: effectiveColleges[0]?.state || 'Karnataka',
      message: '',
      fees: effectiveColleges[0]?.fees || 100000,
      cashback: effectiveColleges[0]?.cashback || 10000,
    });
  };

  const cardContent = (
    <div className="relative w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-slate-300 hover:text-white p-2 sm:p-2.5 rounded-xl bg-slate-800/95 hover:bg-slate-700 border border-slate-600/70 transition-all z-30 shadow-xl cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {submittedRef ? (
        /* Success confirmation screen */
        <div className="p-8 sm:p-14 text-center text-white space-y-6">
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Enquiry Registered Successfully
            </span>
            <h3 className="text-3xl font-extrabold text-white">
              Referral Voucher Generated!
            </h3>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              Thank you, <strong className="text-white">{submittedRef.studentName}</strong>. Your enquiry for <strong className="text-emerald-300">{submittedRef.collegeName}</strong> has been logged in our system.
            </p>
          </div>

          {/* Voucher Box */}
          <div className="bg-slate-800 border-2 border-dashed border-emerald-500/50 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-700 pb-2">
              <span>Reference ID:</span>
              <span className="font-mono font-bold text-emerald-400">{submittedRef._id}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-700 pb-2">
              <span>Guaranteed Money Back:</span>
              <span className="font-bold text-emerald-300 text-base">₹{Number(submittedRef.cashback).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-700 pb-2">
              <span>Phone Number:</span>
              <span className="text-slate-200">{submittedRef.phone}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Fee Payment:</span>
              <span className="text-amber-300 font-bold text-[11px]">
                Pay 100% directly to college official counter
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Our educational counselor will call you within 2 business hours to verify your course eligibility and confirm your admission rebate voucher.
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        /* Main Form */
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left summary banner */}
          <div className="lg:col-span-4 bg-gradient-to-b from-emerald-800 to-teal-900 p-6 sm:p-8 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Direct Money Back
              </div>
              <h3 className="text-2xl font-extrabold leading-tight">
                Apply With Direct Fee Refund
              </h3>
              <p className="mt-3 text-emerald-100 text-sm leading-relaxed">
                Zero consultation charges. Full admission guidance. Direct cash return to the student/parent upon admission.
              </p>

              <div className="mt-5 p-3.5 bg-amber-500/20 border border-amber-400/40 rounded-xl text-xs text-amber-200 space-y-1">
                <strong className="text-amber-100 font-bold block uppercase tracking-wider">
                  Zero Payment To Us
                </strong>
                <span>You pay 100% of your fees directly to the college official account. We do NOT accept any fee payments.</span>
              </div>

              <div className="mt-5 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span className="text-xs text-emerald-100 font-medium">Official institution tie-ups across India</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span className="text-xs text-emerald-100 font-medium">Original college fee receipt issued</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span className="text-xs text-emerald-100 font-medium">Cashback credited to your bank / UPI</span>
                </div>
              </div>
            </div>

            {/* Cashback estimate badge */}
            <div className="mt-6 p-4 bg-emerald-950/60 rounded-2xl border border-emerald-400/30">
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold block">
                Cashback For Selected Campus:
              </span>
              <span className="text-2xl font-black text-white mt-1 block">
                {formData.cashback ? `₹${Number(formData.cashback).toLocaleString('en-IN')} Back` : 'Institution Specific'}
              </span>
              <span className="text-[10px] text-emerald-200 block mt-0.5">
                For {formData.collegeName}
              </span>
            </div>
          </div>

          {/* Right Form Inputs */}
          <div className="lg:col-span-8 p-6 sm:p-8 bg-slate-900 text-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMsg && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Student Name & Parent Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Parent / Guardian Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="student@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Target College selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Selected School / College
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.collegeName}
                    onChange={handleCollegeChange}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="General Admission Counselling">General Admission Counselling (Multiple Institutions)</option>
                    {effectiveColleges.map(c => (
                      <option key={c._id || c.id} value={c.name}>
                        {c.name} — {c.state} (Money Back: ₹{Number(c.cashback).toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Course and State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Interested Course / Standard
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. B.Tech CSE, MBA, Class 11th"
                      value={formData.targetCourse}
                      onChange={(e) => setFormData({ ...formData, targetCourse: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Preferred State / City
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Karnataka, Delhi, Maharashtra"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Any questions or specific preferences?
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. What is the hostel fee? When will the cashback be credited?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2 px-3 text-sm text-white placeholder-slate-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting 
                    ? 'Registering Enquiry...' 
                    : (formData.cashback 
                        ? `Submit Enquiry & Claim ₹${Number(formData.cashback).toLocaleString('en-IN')} Cashback` 
                        : 'Submit Free Admission Enquiry')}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero charges to us. You pay all tuition fees directly to the college.</span>
              </div>

            </form>
          </div>

        </div>
      )}

    </div>
  );

  if (isModal) {
    return cardContent;
  }

  return (
    <div id="enquiry" className="max-w-4xl mx-auto px-4 sm:px-6">
      {cardContent}
    </div>
  );
};
