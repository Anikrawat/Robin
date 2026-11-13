'use client';

import React, { useEffect } from 'react';
import { EnquirySection } from './EnquirySection';

export const EnquiryModal = ({ 
  isOpen, 
  onClose, 
  colleges = [], 
  selectedCollege, 
  initialCollege,
  initialEstimate 
}) => {
  const targetCollege = initialCollege || selectedCollege;

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <EnquirySection 
          colleges={colleges}
          initialCollege={targetCollege} 
          initialEstimate={initialEstimate}
          isModal={true}
          onClose={onClose}
          onSubmitted={() => {
            // keep open so voucher is displayed
          }}
        />
      </div>
    </div>
  );
};
