import React, { useState, useEffect } from 'react';
import { FileText, Search, Download } from 'lucide-react';
import { GemstoneAnalysisReport } from '../types';

export const ReportsHistoryView: React.FC = () => {
  const [reports, setReports] = useState<GemstoneAnalysisReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState<GemstoneAnalysisReport | null>(null);

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReports(data.reports);
          if (data.reports.length > 0) {
            setSelectedReport(data.reports[0]);
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredReports = reports.filter(
    (r) =>
      r.gemstoneName.toLowerCase().includes(search.toLowerCase()) ||
      r.reportId.toLowerCase().includes(search.toLowerCase()) ||
      r.authenticityStatus.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF8E7]">
            Gemstone Reports & Scan History
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Archived optical analysis logs, price valuations, and durability reports.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search reports or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Reports List Column */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-[#08080A] border border-neutral-800 shadow-xl space-y-3">
          <h3 className="text-[10px] font-mono tracking-[0.2em] font-semibold text-[#D4AF37] uppercase px-2">
            Archived Inspection Reports ({filteredReports.length})
          </h3>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredReports.map((report) => (
              <div
                key={report.reportId}
                onClick={() => setSelectedReport(report)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedReport?.reportId === report.reportId
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#FFF8E7] shadow-md'
                    : 'bg-[#050505] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#FFF8E7] font-serif">{report.gemstoneName}</h4>
                    <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                      {report.reportId} • {report.caratWeight} ct
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold uppercase ${
                    report.authenticityStatus === 'Natural'
                      ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30'
                      : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                  }`}>
                    {report.authenticityStatus}
                  </span>
                </div>

                <div className="mt-2 text-[10px] text-neutral-400 font-mono flex items-center justify-between border-t border-neutral-800/80 pt-2">
                  <span>Valuation: ${report.estimatedPriceUsd.toLocaleString()}</span>
                  <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Report Detailed View */}
        <div className="lg:col-span-7 p-6 rounded-2xl editorial-card border border-[#D4AF37]/30 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          {selectedReport ? (
            <div className="space-y-6 relative z-10">
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em]">
                    Official Gemological Inspection Certificate
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#FFF8E7] mt-0.5">
                    {selectedReport.gemstoneName}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Report ID: {selectedReport.reportId} • Created {new Date(selectedReport.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedReport, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute('href', dataStr);
                    downloadAnchor.setAttribute('download', `${selectedReport.reportId}_full_report.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="px-3 py-1.5 rounded-xl editorial-button-gold text-xs uppercase font-mono font-semibold flex items-center space-x-1.5 shadow-md text-black"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Report</span>
                </button>
              </div>

              {/* Spec Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Authenticity</p>
                  <p className="font-bold text-[#10B981] mt-0.5 font-mono">{selectedReport.authenticityStatus}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Carat Weight</p>
                  <p className="font-bold text-[#D4AF37] mt-0.5 font-mono">{selectedReport.caratWeight} ct</p>
                </div>

                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Clarity Grade</p>
                  <p className="font-bold text-neutral-200 mt-0.5 font-mono">{selectedReport.clarityGrade}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Estimated Value</p>
                  <p className="font-bold text-[#D4AF37] mt-0.5 font-mono">${selectedReport.estimatedPriceUsd.toLocaleString()}</p>
                </div>
              </div>

              {/* Durability & Origin */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-neutral-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px]">Origin Location:</span>
                  <span className="font-semibold text-[#FFF8E7]">{selectedReport.origin}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px]">Durability Index:</span>
                  <span className="font-semibold text-[#10B981]">{selectedReport.durabilityScore} / 10 ({selectedReport.riskCategory} Risk)</span>
                </div>
              </div>

              {/* Summary Notes */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-[#D4AF37]/30 text-xs space-y-1">
                <p className="font-semibold text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider">Optical Analysis Summary:</p>
                <p className="text-neutral-300 italic leading-relaxed">{selectedReport.aiNotes}</p>
              </div>

            </div>
          ) : (
            <div className="py-20 text-center text-neutral-500">
              <FileText className="w-12 h-12 mx-auto text-neutral-700" />
              <p className="text-xs font-mono mt-2">Select a report from the list on the left to inspect full laboratory details.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
