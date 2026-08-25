import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ShieldCheck, Gem, Award, Compass, ArrowUpRight, Activity, Clock, CheckCircle2 } from 'lucide-react';
import { AnalyticsData } from '../types';

interface DashboardAnalyticsProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ onNavigateTab }) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json.analytics);
        }
      })
      .catch((err) => console.error('Error loading analytics:', err))
      .finally(() => setLoading(false));
  }, []);

  const COLORS = ['#10B981', '#D4AF37', '#3B82F6', '#EF4444'];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">SYSTEM TELEMETRY</p>
          <h2 className="text-3xl font-serif font-bold text-[#FFF8E7]">
            Sovereign Protocol Analytics Dashboard
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Realtime optical verification metrics, blockchain certificate volume, and audit telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigateTab('analysis')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider editorial-button-gold shadow-md"
          >
            + New Image Scan
          </button>
          <button
            onClick={() => onNavigateTab('blockchain')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#FFF8E7] bg-[#0E0E12] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
          >
            Mint NFT Certificate
          </button>
        </div>
      </div>

      {/* 4 TOP ANALYTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1 */}
        <div className="editorial-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em]">Total Optical Scans</p>
              <h3 className="text-2xl font-serif font-bold text-[#FFF8E7] mt-1">
                {data ? data.totalAuthentications : '1,420'}
              </h3>
            </div>
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Gem className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs text-[#10B981] font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="editorial-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-mono text-[#10B981] uppercase tracking-[0.2em]">Natural Authenticity</p>
              <h3 className="text-2xl font-serif font-bold text-[#FFF8E7] mt-1">
                {data ? `${data.naturalGemsPercentage}%` : '88.5%'}
              </h3>
            </div>
            <div className="p-2.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs text-[#10B981] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Low Counterfeit Frequency</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="editorial-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em]">NFT Certificates Issued</p>
              <h3 className="text-2xl font-serif font-bold text-[#FFF8E7] mt-1">
                {data ? data.certificatesIssued : '492'}
              </h3>
            </div>
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs text-[#D4AF37] font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Immutable SHA-256 Ledger</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="editorial-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-mono text-[#10B981] uppercase tracking-[0.2em]">Navratna Astro Reports</p>
              <h3 className="text-2xl font-serif font-bold text-[#FFF8E7] mt-1">
                {data ? data.astrologicalRecommendationsGiven : '2,180'}
              </h3>
            </div>
            <div className="p-2.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs text-[#10B981] font-medium">
            <Activity className="w-3.5 h-3.5" />
            <span>Zodiac Carat Formula Active</span>
          </div>
        </div>

      </div>

      {/* CHARTS ROW */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Verification Trend Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl editorial-card space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-serif font-bold text-[#FFF8E7]">
                Monthly Verification & NFT Volume
              </h3>
              <p className="text-xs text-neutral-400">Growth trajectory over past 6 calendar months</p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-1 rounded-lg">
              Live Feed
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.monthlyVerifications || []}>
                <XAxis dataKey="month" stroke="#737373" fontSize={11} />
                <YAxis stroke="#737373" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0B0E', borderColor: '#D4AF37', borderRadius: '12px', color: '#FFF8E7' }}
                  labelStyle={{ color: '#D4AF37' }}
                />
                <Bar dataKey="verifications" fill="#10B981" radius={[4, 4, 0, 0]} name="Optical Scans" />
                <Bar dataKey="certificates" fill="#D4AF37" radius={[4, 4, 0, 0]} name="Blockchain Certificates" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Authenticity Classification Pie Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-2xl editorial-card space-y-4">
          <div>
            <h3 className="text-base font-serif font-bold text-[#FFF8E7]">
              Authenticity Classification
            </h3>
            <p className="text-xs text-neutral-400">Breakdown across all analyzed gems</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.authenticityBreakdown || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(data?.authenticityBreakdown || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0B0E', borderColor: '#10B981', borderRadius: '12px', color: '#FFF8E7' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            {(data?.authenticityBreakdown || []).map((item, idx) => (
              <div key={item.name} className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="text-neutral-300 truncate">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECENT RECENT AUDIT LOGS TABLE */}
      <div className="p-6 rounded-2xl editorial-card space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-serif font-bold text-[#FFF8E7] flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Cryptographic Protocol Audit Logs</span>
            </h3>
            <p className="text-xs text-neutral-400">Realtime activity stream from system users & AI engine</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#08080A] text-neutral-400 font-mono text-[10px] uppercase tracking-widest border-b border-[#D4AF37]/20">
              <tr>
                <th className="p-3">User / System</th>
                <th className="p-3">Action Description</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {data?.recentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#121216] transition-colors">
                  <td className="p-3 font-medium text-[#FFF8E7]">{log.user}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3 font-mono text-[11px] text-neutral-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider font-mono uppercase ${
                      log.status === 'Success'
                        ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                        : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
