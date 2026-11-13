'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { CashbackCalculator } from '@/components/CashbackCalculator';
import { CollegeList } from '@/components/CollegeList';
import { EnquirySection } from '@/components/EnquirySection';
import { EnquiryModal } from '@/components/EnquiryModal';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { SEED_INSTITUTIONS } from '@/lib/seedData';

export default function HomePage() {
  const [colleges, setColleges] = useState(SEED_INSTITUTIONS);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  // Load live institutions from MongoDB API in background
  useEffect(() => {
    let isMounted = true;
    async function loadColleges() {
      try {
        const res = await fetch('/api/institutions');
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.institutions) && data.institutions.length > 0) {
          setColleges(data.institutions);
        }
      } catch (err) {
        console.error('Failed to load institutions:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadColleges();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenGeneralEnquiry = () => {
    setSelectedCollege(null);
    setModalOpen(true);
  };

  const handleSelectCollegeForEnquiry = (college) => {
    setSelectedCollege(college);
    setModalOpen(true);
  };

  const scrollToInstitutions = () => {
    const el = document.getElementById('institutions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <Navbar onOpenEnquiry={handleOpenGeneralEnquiry} />

      <main className="flex-1">
        {/* Hero Section with Images & Value Proposition */}
        <HeroSection 
          onOpenEnquiry={handleOpenGeneralEnquiry}
          onExploreClick={scrollToInstitutions}
        />

        {/* How It Works (4 Clear Steps) */}
        <HowItWorks onOpenEnquiry={handleOpenGeneralEnquiry} />

        {/* Dynamic Institution Cashback Explorer */}
        <CashbackCalculator 
          colleges={colleges}
          onClaimWithEstimate={(college) => handleSelectCollegeForEnquiry(college)} 
        />

        {/* Colleges and Schools Directory with State Filters & Cloudinary Documents */}
        <CollegeList 
          colleges={colleges}
          onSelectCollegeForEnquiry={handleSelectCollegeForEnquiry} 
        />

        {/* Embedded On-Page Enquiry Section */}
        <div className="bg-slate-50 py-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
            <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full">
              Quick Application
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Direct Referral Enquiry Form
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
              Submit your inquiry below to lock in your verified admission cashback guarantee before institutional admission quotas close.
            </p>
          </div>
          <EnquirySection 
            colleges={colleges}
            initialCollege={selectedCollege} 
          />
        </div>

        {/* Student and Parent Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Pop-up Enquiry Modal */}
      <EnquiryModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        colleges={colleges}
        selectedCollege={selectedCollege}
      />
    </div>
  );
}
