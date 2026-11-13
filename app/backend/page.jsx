'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  Phone, 
  Mail, 
  Banknote, 
  Search, 
  ArrowLeft, 
  TrendingUp, 
  CheckCircle2, 
  FileText,
  UploadCloud,
  Sparkles,
  Download,
  X,
  AlertCircle,
  Loader2,
  HardDrive,
  LogOut,
  UserCheck
} from 'lucide-react';
import { AdminLoginForm } from '@/components/AdminLoginForm';

export default function AdminBackendPage() {
  // Authentication State
  const [authChecking, setAuthChecking] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  const [activeTab, setActiveTab] = useState('institutions'); // 'institutions' | 'enquiries' | 'financials'

  // Data states
  const [colleges, setColleges] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  // Modal state for adding/editing institution
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollegeId, setEditingCollegeId] = useState(null);

  // Search & Filters
  const [collegeSearch, setCollegeSearch] = useState('');
  const [collegeStateFilter, setCollegeStateFilter] = useState('ALL');
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('ALL');

  // Form State for Adding / Editing College
  const [formData, setFormData] = useState({
    name: '',
    type: 'College',
    fees: '',
    cashback: '',
    state: '',
    address: '',
    courses: '',
    image: '',
    totalCommission: '',
    documents: [], // Array of { name, url, public_id, format, size }
  });

  const [uploadingDocs, setUploadingDocs] = useState(false);
  const [formError, setFormError] = useState('');
  const [successBanner, setSuccessBanner] = useState('');
  const [savingInstitution, setSavingInstitution] = useState(false);

  const fileInputRef = useRef(null);

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated && data.admin) {
          setAdminUser(data.admin);
          fetchColleges();
          fetchEnquiries();
        } else {
          setAdminUser(null);
        }
      } catch (err) {
        console.error('Failed to verify admin auth:', err);
        setAdminUser(null);
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setAdminUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Fetch Colleges
  const fetchColleges = async () => {
    try {
      setLoadingColleges(true);
      const res = await fetch('/api/institutions');
      const data = await res.json();
      if (data.success && data.institutions) {
        setColleges(data.institutions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingColleges(false);
    }
  };

  // Fetch Enquiries
  const fetchEnquiries = async () => {
    try {
      setLoadingEnquiries(true);
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data.success && data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Quick preset images
  const sampleImages = [
    { label: 'Campus Modern', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
    { label: 'School Building', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80' },
    { label: 'University Hall', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80' },
    { label: 'Academy Library', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' },
  ];

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingCollegeId(null);
    setFormData({
      name: '',
      type: 'College',
      fees: '',
      cashback: '',
      state: '',
      address: '',
      courses: '',
      image: sampleImages[0].url,
      totalCommission: '',
      documents: [],
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (col) => {
    setEditingCollegeId(col._id || col.id);
    setFormData({
      name: col.name,
      type: col.type || 'College',
      fees: col.fees,
      cashback: col.cashback,
      state: col.state,
      address: col.address,
      courses: col.courses || '',
      image: col.image || sampleImages[0].url,
      totalCommission: col.totalCommission || '',
      documents: col.documents || [],
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Admin sets exact fees for this school/college
  const handleFeeChange = (val) => {
    setFormData(prev => ({
      ...prev,
      fees: val,
    }));
  };

  // Upload Documents to Cloudinary
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingDocs(true);
    setFormError('');

    try {
      const uploadData = new FormData();
      for (let i = 0; i < files.length; i++) {
        uploadData.append('files', files[i]);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to upload document to Cloudinary');
      }

      if (result.documents && result.documents.length > 0) {
        setFormData(prev => ({
          ...prev,
          documents: [...prev.documents, ...result.documents],
        }));
      }
    } catch (err) {
      console.error(err);
      setFormError(err.message || 'Error uploading file to Cloudinary');
    } finally {
      setUploadingDocs(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveDoc = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Save institution to MongoDB
  const handleSaveCollege = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please enter the name of the college or school.');
      return;
    }
    if (!formData.fees || Number(formData.fees) <= 0) {
      setFormError('Please enter valid fees.');
      return;
    }
    if (!formData.cashback || Number(formData.cashback) <= 0) {
      setFormError('Please enter how much cashback the student/parent will get back.');
      return;
    }
    if (!formData.state.trim()) {
      setFormError('Please enter the state where the college/school is located.');
      return;
    }
    if (!formData.address.trim()) {
      setFormError('Please enter the full address of the institution.');
      return;
    }

    setSavingInstitution(true);

    try {
      let res;
      if (editingCollegeId) {
        res = await fetch(`/api/institutions/${editingCollegeId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch('/api/institutions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to save institution to MongoDB');
      }

      setSuccessBanner(editingCollegeId ? `Updated "${formData.name}" successfully!` : `Added "${formData.name}" to MongoDB!`);
      setIsModalOpen(false);
      fetchColleges();
      setTimeout(() => setSuccessBanner(''), 4000);
    } catch (err) {
      setFormError(err.message || 'Failed to save');
    } finally {
      setSavingInstitution(false);
    }
  };

  // Delete College from MongoDB
  const handleDeleteCollege = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from MongoDB?`)) return;

    try {
      const res = await fetch(`/api/institutions/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSuccessBanner(`Deleted "${name}".`);
        fetchColleges();
        setTimeout(() => setSuccessBanner(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Enquiry Status in MongoDB
  const handleUpdateEnquiryStatus = async (id, status, notes) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        fetchEnquiries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id, studentName) => {
    if (!window.confirm(`Are you sure you want to delete enquiry for "${studentName}"?`)) return;

    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSuccessBanner(`Enquiry for "${studentName}" deleted.`);
        fetchEnquiries();
        setTimeout(() => setSuccessBanner(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered lists
  const filteredColleges = colleges.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
                          c.address.toLowerCase().includes(collegeSearch.toLowerCase());
    const matchesState = collegeStateFilter === 'ALL' || c.state.toLowerCase() === collegeStateFilter.toLowerCase();
    return matchesSearch && matchesState;
  });

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.studentName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
                          e.collegeName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
                          e.phone.includes(enquirySearch);
    const matchesStatus = enquiryStatusFilter === 'ALL' || e.status === enquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalEnquiriesCount = enquiries.length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const totalPotentialFees = enquiries.reduce((sum, e) => sum + (Number(e.fees) || 100000), 0);
  const totalPotentialCashback = enquiries.reduce((sum, e) => sum + (Number(e.cashback) || 10000), 0);
  const estimatedCompanyProfit = Math.round(totalPotentialFees * 0.30) - totalPotentialCashback;

  // Export CSV
  const exportEnquiriesCSV = () => {
    const headers = ['Enquiry ID', 'Student Name', 'Parent Name', 'Phone', 'Email', 'College Name', 'State', 'Fees', 'Cashback', 'Status', 'Date'];
    const rows = enquiries.map(e => [
      e._id || e.id,
      `"${e.studentName}"`,
      `"${e.parentName || ''}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.collegeName}"`,
      `"${e.state}"`,
      e.fees || '',
      e.cashback || '',
      e.status,
      e.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `enquiries_mongodb_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // 1. Loading State while verifying cookie
  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-400" />
        <p className="text-sm font-bold text-slate-400">Verifying Admin Session Cookies...</p>
      </div>
    );
  }

  // 2. Unauthenticated State: Show Login Form
  if (!adminUser) {
    return (
      <AdminLoginForm 
        onLoginSuccess={(user) => {
          setAdminUser(user);
          fetchColleges();
          fetchEnquiries();
        }}
      />
    );
  }

  // 3. Authenticated State: Show Admin Control Panel
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      {/* Top Admin Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Back to Public Website</span>
            </Link>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white">
                  EduCashback <span className="text-emerald-400 font-mono text-sm bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">/backend</span>
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  <span>{adminUser.email}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage institutions, Cloudinary documents, and live enquiries</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add School / College</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2.5 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Logout from Admin"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Success Notification Alert */}
      {successBanner && (
        <div className="bg-emerald-500 text-slate-950 px-4 py-2.5 text-center text-xs font-black flex items-center justify-center gap-2 shadow-md animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Partner Institutions</span>
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">{colleges.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Colleges & Schools in MongoDB</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Student Enquiries</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">{totalEnquiriesCount}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-amber-400 font-bold">{newEnquiriesCount} New pending review</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Cashback Committed</span>
              <Banknote className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">
              ₹{totalPotentialCashback.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Directly payable to students/parents</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Net Business Margin</span>
              <TrendingUp className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-black text-teal-300">
              ₹{estimatedCompanyProfit.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">After giving student refund back</p>
          </div>

        </div>

        {/* Business Logic Banner */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Custom Rates Per Institution
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  Configured Individually in Database
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                You configure the exact tuition fees and exact cashback for each school and college individually. Students only see what they pay to the college and what money they get back.
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0 text-xs text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-700">
            <span>Admin Cookie: <strong>Active (7 Days)</strong></span>
          </div>
        </div>

        {/* Main Tabs Navigation */}
        <div className="flex border-b border-slate-800 gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('institutions')}
            className={`pb-4 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'institutions'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Schools & Colleges ({colleges.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`pb-4 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer relative ${
              activeTab === 'enquiries'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Enquiries ({enquiries.length})</span>
            {newEnquiriesCount > 0 && (
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full">
                {newEnquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('financials')}
            className={`pb-4 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'financials'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Banknote className="w-4 h-4" />
            <span>Commission & Cashflow Simulator</span>
          </button>
        </div>

        {/* TAB 1: SCHOOLS & COLLEGES MANAGEMENT */}
        {activeTab === 'institutions' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
              <div className="flex flex-1 gap-2 max-w-lg">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by college name, city or address..."
                    value={collegeSearch}
                    onChange={(e) => setCollegeSearch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 outline-none"
                  />
                </div>
                <select
                  value={collegeStateFilter}
                  onChange={(e) => setCollegeStateFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2 text-slate-300 outline-none"
                >
                  <option value="ALL">All States</option>
                  {Array.from(new Set(colleges.map(c => c.state))).map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add School/College</span>
              </button>
            </div>

            {/* Institutions Table */}
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="py-3.5 px-4">Institution Name</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">State</th>
                      <th className="py-3.5 px-4">Full Address</th>
                      <th className="py-3.5 px-4">Annual Fees</th>
                      <th className="py-3.5 px-4">Cashback to Student</th>
                      <th className="py-3.5 px-4">Documents</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 text-slate-300">
                    {filteredColleges.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-500">
                          {loadingColleges ? 'Loading institutions from MongoDB...' : 'No institutions match the filter.'}
                        </td>
                      </tr>
                    ) : (
                      filteredColleges.map((college) => {
                        const docs = college.documents || [];
                        return (
                          <tr key={college._id || college.id} className="hover:bg-slate-700/30 transition-colors">
                            <td className="py-3 px-4 font-bold text-white flex items-center gap-2.5">
                              <img 
                                src={college.image} 
                                alt="" 
                                className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-600" 
                              />
                              <div>
                                <p className="line-clamp-1">{college.name}</p>
                                <span className="text-[10px] text-slate-400 font-normal">{college.courses}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                college.type === 'School' 
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              }`}>
                                {college.type}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="bg-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-200">
                                {college.state}
                              </span>
                            </td>
                            <td className="py-3 px-4 max-w-xs text-slate-400 truncate" title={college.address}>
                              {college.address}
                            </td>
                            <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                              ₹{Number(college.fees).toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-500/40">
                                ₹{Number(college.cashback).toLocaleString('en-IN')}
                              </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {docs.length > 0 ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>{docs.length} uploaded</span>
                                </span>
                              ) : (
                                <span className="text-slate-500 text-[11px]">0 docs</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditModal(college)}
                                  className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                                  title="Edit College"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCollege(college._id || college.id, college.name)}
                                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                                  title="Delete College"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LIVE STUDENT ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
              <div className="flex flex-1 gap-2 max-w-lg">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by student name, phone or college..."
                    value={enquirySearch}
                    onChange={(e) => setEnquirySearch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 outline-none"
                  />
                </div>
                <select
                  value={enquiryStatusFilter}
                  onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2 text-slate-300 outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Admitted">Admitted</option>
                  <option value="Cashback Disbursed">Cashback Disbursed</option>
                </select>
              </div>

              <button
                onClick={exportEnquiriesCSV}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export to CSV</span>
              </button>
            </div>

            {/* Enquiries Grid / List */}
            <div className="space-y-4">
              {filteredEnquiries.length === 0 ? (
                <div className="bg-slate-800/40 rounded-2xl p-12 text-center border border-slate-800">
                  <Users className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-400 font-bold">
                    {loadingEnquiries ? 'Loading enquiries from MongoDB...' : 'No enquiries found'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Submit an enquiry from the public website to see it appear here live.</p>
                </div>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <div 
                    key={enquiry._id || enquiry.id}
                    className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 hover:border-slate-600 transition-all shadow-md space-y-4"
                  >
                    {/* Top Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-emerald-400 font-bold">{enquiry._id || enquiry.id}</span>
                          <span className="text-slate-400 text-xs">•</span>
                          <span className="text-slate-400 text-xs">
                            {new Date(enquiry.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-white mt-0.5">
                          {enquiry.studentName}{' '}
                          {enquiry.parentName && (
                            <span className="text-xs text-slate-400 font-normal">
                              (Parent: {enquiry.parentName})
                            </span>
                          )}
                        </h4>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-medium">Status:</span>
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleUpdateEnquiryStatus(enquiry._id || enquiry.id, e.target.value)}
                          className={`text-xs font-black px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${
                            enquiry.status === 'New' 
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                            enquiry.status === 'In Discussion' 
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                            enquiry.status === 'Admitted' 
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
                              'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}
                        >
                          <option value="New" className="bg-slate-900 text-white">New Submission</option>
                          <option value="In Discussion" className="bg-slate-900 text-white">In Discussion / Counselling</option>
                          <option value="Admitted" className="bg-slate-900 text-white">Admitted (Pending Cashback)</option>
                          <option value="Cashback Disbursed" className="bg-slate-900 text-white">Cashback Disbursed (Done)</option>
                        </select>
                        <button
                          onClick={() => handleDeleteEnquiry(enquiry._id || enquiry.id, enquiry.studentName)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Middle details row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      
                      {/* Target College */}
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Institution:</span>
                        <span className="font-bold text-white text-sm mt-0.5 block line-clamp-1">{enquiry.collegeName}</span>
                        <span className="text-[11px] text-slate-400 block">{enquiry.targetCourse || 'Course Undecided'} • {enquiry.state}</span>
                      </div>

                      {/* Contact Channels */}
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Contact:</span>
                        <div className="flex items-center gap-2">
                          <a 
                            href={`tel:${enquiry.phone}`} 
                            className="text-emerald-400 hover:underline font-bold flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{enquiry.phone}</span>
                          </a>
                          <a
                            href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600/30 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-bold hover:bg-emerald-600 hover:text-white"
                          >
                            WhatsApp
                          </a>
                        </div>
                        {enquiry.email && (
                          <a href={`mailto:${enquiry.email}`} className="text-slate-400 hover:underline block truncate">
                            {enquiry.email}
                          </a>
                        )}
                      </div>

                      {/* Financials */}
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition & Cashback:</span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-slate-400">Tuition Fee:</span>
                          <span className="font-bold text-white">₹{Number(enquiry.fees || 100000).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center justify-between text-emerald-400 font-extrabold mt-0.5">
                          <span>Student Cashback:</span>
                          <span>₹{Number(enquiry.cashback || 10000).toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Notes / Remarks */}
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Counselor Notes:</span>
                        <input
                          type="text"
                          defaultValue={enquiry.notes || ''}
                          onBlur={(e) => handleUpdateEnquiryStatus(enquiry._id || enquiry.id, enquiry.status, e.target.value)}
                          placeholder="Type notes (auto-saves on blur)..."
                          className="w-full bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded border border-slate-700 focus:border-emerald-500 outline-none mt-1"
                        />
                      </div>

                    </div>

                    {/* Student message if any */}
                    {enquiry.message && (
                      <div className="bg-slate-900/40 p-2.5 rounded-xl text-xs text-slate-400 border border-slate-800">
                        <strong className="text-slate-300 font-semibold">Student Message: </strong>
                        &ldquo;{enquiry.message}&rdquo;
                      </div>
                    )}

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 3: COMMISSION & FINANCIALS SIMULATOR */}
        {activeTab === 'financials' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">
                  Real Portfolio Metrics & Analytics
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Dynamic calculations aggregated directly from your MongoDB institution listings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 text-center">
                  <span className="text-xs text-slate-400 uppercase font-bold">Total Listed Campuses</span>
                  <p className="text-2xl font-black text-white mt-1">{colleges.length}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Partner schools & colleges</p>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 text-center">
                  <span className="text-xs text-slate-400 uppercase font-bold">Average Annual Fee</span>
                  <p className="text-2xl font-black text-blue-400 mt-1">
                    ₹{colleges.length > 0 ? Math.round(colleges.reduce((sum, c) => sum + Number(c.fees), 0) / colleges.length).toLocaleString('en-IN') : 0}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Across all active institutions</p>
                </div>

                <div className="bg-emerald-950/60 p-5 rounded-2xl border border-emerald-500/40 text-center">
                  <span className="text-xs text-emerald-300 uppercase font-bold">Average Student Cashback</span>
                  <p className="text-2xl font-black text-emerald-400 mt-1">
                    ₹{colleges.length > 0 ? Math.round(colleges.reduce((sum, c) => sum + Number(c.cashback), 0) / colleges.length).toLocaleString('en-IN') : 0}
                  </p>
                  <p className="text-[11px] text-emerald-200 mt-1">Set individually by admin</p>
                </div>

                <div className="bg-teal-950/60 p-5 rounded-2xl border border-teal-500/40 text-center">
                  <span className="text-xs text-teal-300 uppercase font-bold">Total Cashback Pool</span>
                  <p className="text-2xl font-black text-teal-300 mt-1">
                    ₹{colleges.reduce((sum, c) => sum + Number(c.cashback), 0).toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-teal-200 mt-1">Total promised savings across catalog</p>
                </div>

              </div>

              {/* Portfolio stats based on real listings in MongoDB */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Live MongoDB Portfolio Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-slate-800 rounded-xl">
                    <span className="text-xs text-slate-400">Total Partner Fee Inventory:</span>
                    <p className="text-xl font-bold text-white mt-1">
                      ₹{colleges.reduce((sum, c) => sum + Number(c.fees), 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800 rounded-xl">
                    <span className="text-xs text-slate-400">Total Student Cashback Pool:</span>
                    <p className="text-xl font-bold text-emerald-400 mt-1">
                      ₹{colleges.reduce((sum, c) => sum + Number(c.cashback), 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800 rounded-xl">
                    <span className="text-xs text-slate-400">Total Enquiries Received:</span>
                    <p className="text-xl font-bold text-teal-300 mt-1">
                      {enquiries.length} Student Enquiries
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* MODAL: ADD / EDIT SCHOOL OR COLLEGE WITH CLOUDINARY MULTI-DOCUMENT UPLOADER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <span>{editingCollegeId ? 'Edit Institution' : 'Add New School or College'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Saved to MongoDB & files uploaded to Cloudinary
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCollege} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {formError && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Name of College / School & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Name of College / School *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Institute of Technology & Management"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 px-3 text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Institution Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 px-3 text-sm text-white outline-none"
                  >
                    <option value="College">College / Univ</option>
                    <option value="School">K-12 School</option>
                  </select>
                </div>
              </div>

              {/* 2. Fees & 3. How much will they get back (Cashback) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Tuition Fees (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="100000"
                      value={formData.fees}
                      onChange={(e) => handleFeeChange(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-8 pr-3 text-sm text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Annual or 1st year total fees</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-1.5 uppercase tracking-wider">
                    How Much Will They Get Back? (Cashback ₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="10000"
                      value={formData.cashback}
                      onChange={(e) => setFormData({ ...formData, cashback: e.target.value })}
                      className="w-full bg-slate-800 border-2 border-emerald-500/60 focus:border-emerald-400 rounded-xl py-2.5 pl-8 pr-3 text-sm text-emerald-300 font-bold placeholder-slate-500 outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-emerald-400 mt-1 block">Guaranteed refund to student/parent</span>
                </div>
              </div>

              {/* 4. In which state the college is in */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  In Which State The College Is In *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karnataka, Maharashtra, Delhi, Tamil Nadu, Uttar Pradesh"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 px-3 text-sm text-white placeholder-slate-500 outline-none"
                />
              </div>

              {/* 5. Address of that school/college */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Address of That School / College *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Plot 14, Phase 2, Electronic City, Bengaluru, Karnataka 560100"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2 px-3 text-sm text-white placeholder-slate-500 outline-none resize-none"
                />
              </div>

              {/* 6. CLOUDINARY MULTI-DOCUMENT UPLOADER ("as many documents as needed") */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Institutional Documents (Cloudinary)</span>
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Upload brochures, syllabus, fee sheets, affiliation certificates. You can add as many documents as needed!
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingDocs}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {uploadingDocs ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload Files</span>
                      </>
                    )}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                  />
                </div>

                {/* Uploaded Documents List */}
                {formData.documents.length === 0 ? (
                  <div className="border border-dashed border-slate-800 rounded-xl p-4 text-center text-xs text-slate-500">
                    No documents uploaded yet. Click &quot;Upload Files&quot; to add documents to Cloudinary.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-44 overflow-y-auto">
                    {formData.documents.map((doc, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="truncate text-slate-200 font-medium" title={doc.name}>
                            {doc.name}
                          </span>
                          {doc.size && (
                            <span className="text-[10px] text-slate-500 shrink-0">
                              ({formatBytes(doc.size)})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline text-[11px] font-bold"
                          >
                            Preview
                          </a>
                          <button
                            type="button"
                            onClick={() => handleRemoveDoc(idx)}
                            className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                            title="Remove document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Courses offered */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Courses / Programs Offered
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech (CSE, AI), MBA, BCA, or Class 1-12 CBSE"
                  value={formData.courses}
                  onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 px-3 text-sm text-white placeholder-slate-500 outline-none"
                />
              </div>

              {/* Image URL with quick presets */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Campus Photo URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 outline-none"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-400">Quick photos:</span>
                  {sampleImages.map(img => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded border border-slate-700 cursor-pointer"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingInstitution}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {savingInstitution && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingCollegeId ? 'Save Changes' : 'Publish to MongoDB'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
