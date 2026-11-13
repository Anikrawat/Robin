'use client';

import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Search, 
  Sparkles, 
  School, 
  GraduationCap, 
  ArrowRight,
  Star,
  FileText
} from 'lucide-react';
import { DocumentViewerModal } from './DocumentViewerModal';

export const CollegeList = ({ colleges = [], onSelectCollegeForEnquiry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [sortBy, setSortBy] = useState('cashback-desc');

  // Document modal viewer state
  const [viewingDocsCollege, setViewingDocsCollege] = useState(null);

  // Extract unique states from colleges
  const states = useMemo(() => {
    const set = new Set();
    colleges.forEach(c => {
      if (c.state) set.add(c.state);
    });
    return Array.from(set).sort();
  }, [colleges]);

  const filteredColleges = useMemo(() => {
    return colleges
      .filter(college => {
        const matchesSearch = 
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (college.courses && college.courses.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesState = selectedState === 'ALL' || college.state.toLowerCase() === selectedState.toLowerCase();
        const matchesType = selectedType === 'ALL' || college.type.toLowerCase() === selectedType.toLowerCase();

        return matchesSearch && matchesState && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'cashback-desc') return b.cashback - a.cashback;
        if (sortBy === 'fee-asc') return a.fees - b.fees;
        if (sortBy === 'fee-desc') return b.fees - a.fees;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [colleges, searchTerm, selectedState, selectedType, sortBy]);

  return (
    <section id="institutions" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Verified Partner Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Schools & Colleges
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-2xl">
              Pay 100% of your tuition directly to the college/school, and receive guaranteed cashback back to your bank account with our reference code.
            </p>
          </div>

          <div className="text-sm font-semibold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto shadow-sm">
            Showing <strong className="text-emerald-600 font-bold">{filteredColleges.length}</strong> available institutions
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-md mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search college, school, state, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-colors"
              />
            </div>

            {/* State Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl text-sm font-medium outline-none text-slate-700"
              >
                <option value="ALL">All States ({states.length})</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl text-sm font-medium outline-none text-slate-700"
              >
                <option value="ALL">All Types</option>
                <option value="College">College</option>
                <option value="School">School</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl text-sm font-medium outline-none text-slate-700"
              >
                <option value="cashback-desc">Highest Cashback</option>
                <option value="fee-asc">Lowest Fee</option>
                <option value="fee-desc">Highest Fee</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* Colleges Grid */}
        {filteredColleges.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No institutions match your search</h3>
            <p className="text-sm text-slate-500 mt-1">Try resetting the state filter or search terms.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedState('ALL'); setSelectedType('ALL'); }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => {
              const netFee = college.fees - college.cashback;
              const hasDocs = college.documents && college.documents.length > 0;

              return (
                <div 
                  key={college._id || college.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col group"
                >
                  {/* Image header with badges */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={college.image} 
                      alt={college.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* State & Type Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                        {college.type === 'School' ? (
                          <School className="w-3.5 h-3.5 text-blue-600" />
                        ) : (
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        {college.type}
                      </span>
                      <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                        {college.state}
                      </span>
                    </div>

                    {/* Rating & Documents Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {hasDocs && (
                        <button
                          type="button"
                          onClick={() => setViewingDocsCollege(college)}
                          className="bg-slate-900/80 hover:bg-emerald-600 backdrop-blur-sm text-emerald-300 hover:text-white text-[11px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          title="View verified documents"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{college.documents.length} Docs</span>
                        </button>
                      )}

                      <div className="bg-black/60 backdrop-blur-sm text-amber-300 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>{college.rating || '4.8'}</span>
                      </div>
                    </div>

                    {/* Prominent Cashback Banner overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-200" />
                          <span className="text-xs font-bold uppercase tracking-wider">Direct Money Back</span>
                        </div>
                        <span className="text-base font-black">
                          ₹{college.cashback.toLocaleString('en-IN')} Back
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* College Name */}
                      <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                        {college.name}
                      </h3>

                      {/* Address */}
                      <p className="mt-2 text-xs text-slate-500 flex items-start gap-1.5 line-clamp-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{college.address}</span>
                      </p>

                      {/* Courses */}
                      {college.courses && (
                        <div className="mt-3 py-1.5 px-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 font-medium">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Courses / Grades:</span>
                          <span className="line-clamp-1">{college.courses}</span>
                        </div>
                      )}

                      {/* Documents trigger if available */}
                      {hasDocs && (
                        <div className="mt-2.5">
                          <button
                            type="button"
                            onClick={() => setViewingDocsCollege(college)}
                            className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View {college.documents.length} verified brochure(s) & documents</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Financial details breakdown */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Pay to College</p>
                          <p className="text-sm font-bold text-slate-800">
                            ₹{college.fees.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="border-l border-slate-200">
                          <p className="text-[10px] text-emerald-600 uppercase font-bold">Your Effective Fee</p>
                          <p className="text-sm font-black text-emerald-700">
                            ₹{netFee.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <button
                        onClick={() => onSelectCollegeForEnquiry && onSelectCollegeForEnquiry(college)}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm group-hover:bg-emerald-600 cursor-pointer"
                      >
                        <span>Apply & Get ₹{college.cashback.toLocaleString('en-IN')} Back</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={Boolean(viewingDocsCollege)}
        onClose={() => setViewingDocsCollege(null)}
        college={viewingDocsCollege}
      />
    </section>
  );
};
