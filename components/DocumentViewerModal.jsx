'use client';

import React from 'react';
import { X, FileText, Download, ExternalLink, Calendar, HardDrive } from 'lucide-react';

export const DocumentViewerModal = ({ isOpen, onClose, college }) => {
  if (!isOpen || !college) return null;

  const docs = college.documents || [];

  const formatBytes = (bytes) => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-scale-up text-white">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Official Institution Documents</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified files for <strong className="text-slate-200">{college.name}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Documents List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {docs.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <FileText className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="font-bold text-sm">No documents attached yet</p>
              <p className="text-xs text-slate-500 mt-1">
                You can upload brochures and fee breakdowns for this institution in the /backend admin panel.
              </p>
            </div>
          ) : (
            docs.map((doc, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-white truncate" title={doc.name}>
                      {doc.name}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                      {doc.size && (
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          {formatBytes(doc.size)}
                        </span>
                      )}
                      <span className="uppercase text-[10px] font-bold bg-slate-700 px-1.5 py-0.2 rounded text-slate-300">
                        {doc.format || 'file'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    title="Open / Download Document"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View / Download</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
