import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  User,
  MapPin,
  Clock,
  Sparkles,
  Share2,
  Download,
  CheckCircle2,
  Search,
  BookOpen,
  Award,
  Zap,
  ChevronRight,
  Printer,
  ShieldCheck,
  Star,
  Copy,
  Check
} from 'lucide-react';
import { RashiReport } from '../types';
import { VEDIC_RASHIS, VEDIC_NAKSHATRAS, NAVRATNA_GEMSTONES } from '../lib/astrology';

interface FindMyRashiToolProps {
  userDob?: string;
  userName?: string;
  userWeight?: number;
}

export const FindMyRashiTool: React.FC<FindMyRashiToolProps> = ({
  userDob = '1995-08-15',
  userName = 'Arjun Singh',
  userWeight = 72
}) => {
  const [activeMethod, setActiveMethod] = useState<'name' | 'dob' | 'birth_chart' | 'database'>('name');
  
  // Form States
  const [dob, setDob] = useState<string>(userDob);
  const [fullName, setFullName] = useState<string>(userName);
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(userWeight);
  const [tob, setTob] = useState<string>('08:30');
  const [birthPlace, setBirthPlace] = useState<string>('New Delhi, India');

  // Loading & Result
  const [loading, setLoading] = useState<boolean>(false);
  const [report, setReport] = useState<RashiReport | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  // Database Explorer states
  const [dbTab, setDbTab] = useState<'rashis' | 'nakshatras' | 'gemstones'>('rashis');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Auto-calculate Rashi using Name on mount
  React.useEffect(() => {
    if (fullName) {
      setLoading(true);
      fetch('/api/rashi/by-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, bodyWeightKg })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setReport(data.report);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, []);

  // Handle Method 1: Name
  const handleCalculateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/rashi/by-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, bodyWeightKg })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Calculation failed');
      setReport(data.report);
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Method 2: DOB
  const handleCalculateDOB = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/rashi/by-dob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dob, name: fullName, bodyWeightKg })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Calculation failed');
      setReport(data.report);
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Method 3: Advanced Birth Chart
  const handleCalculateBirthChart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/rashi/birth-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dob, tob, birthPlace, name: fullName, bodyWeightKg })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Calculation failed');
      setReport(data.report);
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // PDF Export / Print Report
  const handleDownloadPDF = () => {
    window.print();
  };

  // Share Report
  const handleShareReport = () => {
    if (!report) return;
    const shareText = `🌟 Vedic Rashi Report for ${report.userDetails.name || 'User'}\nCalculated Rashi: ${report.rashi.name} (${report.zodiacSign})\nPlanet: ${report.planet}\nRecommended Gemstone: ${report.recommendedGemstone.name} (${report.recommendedCarat} Carats)\nAI Confidence Score: ${report.aiConfidenceScore}%`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-8 print:p-0 print:m-0">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 print:hidden">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono tracking-[0.2em] uppercase">
          <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Vedic Rashi Calculation Module</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#FFF8E7]">
          Find My Rashi & Planetary Chart
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Discover your Vedic Moon Sign (Rashi), Nakshatra, and customized Navratna Gemstone prescription primarily using your <strong className="text-[#D4AF37]">Name (Nama Rashi / Swar Rashi)</strong> or birth details.
        </p>
      </div>

      {/* Method Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#08080A] border border-neutral-800 max-w-4xl mx-auto print:hidden">
        
        <button
          onClick={() => setActiveMethod('name')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeMethod === 'name'
              ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-bold'
              : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Method 1: Find Rashi using Name</span>
        </button>

        <button
          onClick={() => setActiveMethod('dob')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeMethod === 'dob'
              ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-bold'
              : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Method 2: Date of Birth</span>
        </button>

        <button
          onClick={() => setActiveMethod('birth_chart')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeMethod === 'birth_chart'
              ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-bold'
              : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Method 3: Birth Chart</span>
        </button>

        <button
          onClick={() => setActiveMethod('database')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeMethod === 'database'
              ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-bold'
              : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Vedic Database</span>
        </button>

      </div>

      {/* INPUT FORMS SECTION */}
      {activeMethod !== 'database' && (
        <div className="grid lg:grid-cols-12 gap-8 items-start print:hidden">
          
          {/* Left Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl editorial-card space-y-5">
            
            {/* METHOD 1: NAME */}
            {activeMethod === 'name' && (
              <form onSubmit={handleCalculateName} className="space-y-4">
                <div className="flex items-center space-x-2 pb-2 border-b border-neutral-800">
                  <User className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-base font-serif font-bold text-[#FFF8E7]">Method 1: Find Rashi using Name</h3>
                </div>

                <p className="text-xs text-neutral-400">
                  The system maps the first phonetic syllable/letter of your full name directly to the traditional Vedic Nama Rashi (Swar Rashi) system.
                </p>

                <div>
                  <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                    Full Name (Vedic Nama Rashi Phonetics) *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. Arjun, Priyanka, Rajesh, Bhavna, Suresh"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08080A] border border-[#D4AF37]/50 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">
                    Body Weight (Kg) for Carat Calculation
                  </label>
                  <input
                    type="number"
                    value={bodyWeightKg}
                    onChange={(e) => setBodyWeightKg(Number(e.target.value))}
                    min="20"
                    max="200"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">Carat Formula: Body Weight / 12</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md flex items-center justify-center space-x-2 mt-4"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>{loading ? 'Mapping Phonetics...' : 'Find Rashi by Name'}</span>
                </button>
              </form>
            )}

            {/* METHOD 2: DOB */}
            {activeMethod === 'dob' && (
              <form onSubmit={handleCalculateDOB} className="space-y-4">
                <div className="flex items-center space-x-2 pb-2 border-b border-neutral-800">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-base font-serif font-bold text-[#FFF8E7]">Method 2: Find Rashi using DOB</h3>
                </div>

                <div>
                  <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                    Date of Birth (DOB) *
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08080A] border border-[#D4AF37]/50 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">
                    Body Weight (Kg) for Carat Calculation
                  </label>
                  <input
                    type="number"
                    value={bodyWeightKg}
                    onChange={(e) => setBodyWeightKg(Number(e.target.value))}
                    min="20"
                    max="200"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">Carat Formula: Body Weight / 12</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md flex items-center justify-center space-x-2 mt-4"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>{loading ? 'Calculating Rashi...' : 'Calculate Rashi via DOB'}</span>
                </button>
              </form>
            )}

            {/* METHOD 3: BIRTH CHART */}
            {activeMethod === 'birth_chart' && (
              <form onSubmit={handleCalculateBirthChart} className="space-y-4">
                <div className="flex items-center space-x-2 pb-2 border-b border-neutral-800">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-base font-serif font-bold text-[#FFF8E7]">Method 3: Advanced Birth Chart</h3>
                </div>

                <div>
                  <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                    Date of Birth (DOB) *
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08080A] border border-[#D4AF37]/50 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                      Time of Birth (TOB) *
                    </label>
                    <input
                      type="time"
                      value={tob}
                      onChange={(e) => setTob(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 rounded-xl bg-[#08080A] border border-[#D4AF37]/50 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                      Body Weight (Kg)
                    </label>
                    <input
                      type="number"
                      value={bodyWeightKg}
                      onChange={(e) => setBodyWeightKg(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                    Birth Place (City, State, Country) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#D4AF37] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      required
                      placeholder="e.g. New Delhi, India"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#08080A] border border-[#D4AF37]/50 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md flex items-center justify-center space-x-2 mt-4"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>{loading ? 'Computing Horoscope...' : 'Generate Advanced Birth Chart'}</span>
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Report Result Preview or Instructions */}
          <div className="lg:col-span-7 space-y-6">
            
            {report ? (
              <ReportDisplayCard
                report={report}
                onDownloadPDF={handleDownloadPDF}
                onShareReport={handleShareReport}
                copied={copied}
              />
            ) : (
              <div className="p-12 rounded-2xl editorial-card text-center space-y-4 py-24">
                <Compass className="w-16 h-16 text-[#D4AF37]/40 mx-auto animate-pulse" />
                <h3 className="text-xl font-serif font-bold text-[#FFF8E7]">Ready for Vedic Calculation</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Select a method on the left and submit details to generate a comprehensive AI Astrological Rashi Report with customized Navratna Gemstone recommendations.
                </p>
              </div>
            )}

          </div>

        </div>
      )}

      {/* RESULT PAGE VIEW WHEN REPORT IS ACTIVE (FULL DISPLAY / PRINT MODE) */}
      {report && activeMethod !== 'database' && (
        <div className="hidden print:block space-y-6">
          <ReportDisplayCard
            report={report}
            onDownloadPDF={handleDownloadPDF}
            onShareReport={handleShareReport}
            copied={copied}
          />
        </div>
      )}

      {/* VEDIC ASTROLOGY DATABASE VIEW */}
      {activeMethod === 'database' && (
        <div className="p-6 rounded-2xl editorial-card space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#FFF8E7] flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                <span>Complete Vedic Astrology Database</span>
              </h2>
              <p className="text-xs text-neutral-400">12 Rashis • 27 Nakshatras • 9 Navratna Gemstones • Planetary Rulers & Syllables</p>
            </div>

            {/* DB Tabs */}
            <div className="flex items-center space-x-2 bg-[#08080A] p-1 rounded-xl border border-neutral-800">
              <button
                onClick={() => setDbTab('rashis')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${dbTab === 'rashis' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'}`}
              >
                12 Rashis
              </button>
              <button
                onClick={() => setDbTab('nakshatras')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${dbTab === 'nakshatras' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'}`}
              >
                27 Nakshatras
              </button>
              <button
                onClick={() => setDbTab('gemstones')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${dbTab === 'gemstones' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'}`}
              >
                9 Navratnas
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Rashi, Nakshatra, Planet, Gemstone, or Name Syllables..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-xs text-neutral-200 focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          {/* 12 RASHIS */}
          {dbTab === 'rashis' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VEDIC_RASHIS.filter(r =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.rulingPlanet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.nameSyllables.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
              ).map(r => (
                <div key={r.id} className="p-4 rounded-xl bg-[#08080A] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{r.symbol}</span>
                      <div>
                        <h4 className="text-sm font-bold text-[#FFF8E7]">{r.name} ({r.englishName})</h4>
                        <span className="text-[10px] font-mono text-[#D4AF37]">{r.sanskritSymbolName}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                      {r.element} Element
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="text-neutral-300"><strong className="text-neutral-400">Ruler:</strong> {r.rulingPlanet}</p>
                    <p className="text-neutral-300"><strong className="text-neutral-400">Deity:</strong> {r.rulingDeity}</p>
                    <p className="text-neutral-300"><strong className="text-neutral-400">Gemstone:</strong> <span className="text-[#10B981] font-semibold">{r.recommendedGemstoneName}</span></p>
                    <p className="text-neutral-300"><strong className="text-neutral-400">Wearing:</strong> {r.recommendedFinger} ({r.recommendedMetal})</p>
                    <p className="text-neutral-300"><strong className="text-neutral-400">Lucky Colors:</strong> {r.luckyColors.join(', ')}</p>
                    <p className="text-neutral-300"><strong className="text-neutral-400">Lucky Numbers:</strong> {r.luckyNumbers.join(', ')}</p>
                  </div>

                  <div className="pt-2 border-t border-neutral-800">
                    <p className="text-[10px] text-[#D4AF37] font-mono uppercase">Name First Syllables:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {r.nameSyllables.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 27 NAKSHATRAS */}
          {dbTab === 'nakshatras' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VEDIC_NAKSHATRAS.filter(n =>
                n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.hindiName.includes(searchQuery) ||
                n.rashi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.rulingPlanet.toLowerCase().includes(searchQuery.toLowerCase())
              ).map(n => (
                <div key={n.id} className="p-4 rounded-xl bg-[#08080A] border border-neutral-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                    <h4 className="text-sm font-bold text-[#FFF8E7]">{n.name} <span className="text-xs text-[#D4AF37]">({n.hindiName})</span></h4>
                    <span className="text-[10px] font-mono text-[#10B981]">{n.rulingPlanet}</span>
                  </div>
                  <div className="text-xs space-y-1 text-neutral-300">
                    <p><strong className="text-neutral-400">Associated Rashi:</strong> {n.rashi}</p>
                    <p><strong className="text-neutral-400">Symbol:</strong> {n.symbol}</p>
                    <p><strong className="text-neutral-400">Ruling Deity:</strong> {n.deity}</p>
                    <p><strong className="text-neutral-400">Recommended Gem:</strong> {n.gemstone}</p>
                    <p><strong className="text-neutral-400">Cosmic Quality:</strong> <span className="text-[#D4AF37]">{n.energyQuality}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 9 NAVRATNAS */}
          {dbTab === 'gemstones' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {NAVRATNA_GEMSTONES.map(g => (
                <div key={g.id} className="p-4 rounded-xl bg-[#08080A] border border-[#D4AF37]/30 space-y-3">
                  <div className="flex items-center space-x-3">
                    <img src={g.image} alt={g.name} className="w-14 h-14 rounded-xl object-cover border border-[#D4AF37]" />
                    <div>
                      <h4 className="text-sm font-bold text-[#FFF8E7]">{g.name}</h4>
                      <p className="text-xs text-[#D4AF37] font-mono">{g.hindiName} • {g.planet}</p>
                      <p className="text-[10px] text-neutral-400">Ruler: {g.rulingDeity}</p>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-300 space-y-1 border-t border-neutral-800 pt-2">
                    <p><strong className="text-neutral-400">Finger:</strong> {g.recommendedFinger}</p>
                    <p><strong className="text-neutral-400">Ideal Metal:</strong> {g.idealMetal}</p>
                    <p><strong className="text-neutral-400">Price/Carat:</strong> ${g.pricePerCaratUsd} USD</p>
                    <p className="text-[11px] italic text-neutral-400">Mantra: "{g.mantra}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
};

// Component for the Detailed Result Page
const ReportDisplayCard: React.FC<{
  report: RashiReport;
  onDownloadPDF: () => void;
  onShareReport: () => void;
  copied: boolean;
}> = ({ report, onDownloadPDF, onShareReport, copied }) => {
  return (
    <div className="p-6 md:p-8 rounded-2xl editorial-card space-y-6 border border-[#D4AF37]/40 shadow-2xl relative">
      
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 print:hidden">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/30">
            AI Verified Score: {report.aiConfidenceScore}%
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#FFF8E7] mt-1">
            Vedic Astrological Rashi Report
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onShareReport}
            className="px-3.5 py-2 rounded-xl bg-[#08080A] border border-neutral-700 text-neutral-200 text-xs font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center space-x-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
            <span>{copied ? 'Copied Share Link!' : 'Share Report'}</span>
          </button>

          <button
            onClick={onDownloadPDF}
            className="px-3.5 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-bold hover:bg-[#F3E5AB] transition-all flex items-center space-x-1.5 shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Report User Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#08080A] border border-neutral-800 text-xs">
        <div>
          <p className="text-[10px] text-neutral-400 font-mono">User Name</p>
          <p className="font-semibold text-[#FFF8E7]">{report.userDetails.name || 'Valued Seeker'}</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-400 font-mono">Calculation Method</p>
          <p className="font-semibold text-[#D4AF37] uppercase">{report.calculationMethod.replace('_', ' ')}</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-400 font-mono">Date of Birth</p>
          <p className="font-semibold text-neutral-200">{report.userDetails.dob || 'N/A'}</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-400 font-mono">Body Weight</p>
          <p className="font-semibold text-neutral-200">{report.userDetails.bodyWeightKg || 72} Kg</p>
        </div>
      </div>

      {/* Main Rashi & Symbol Highlight Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0E0E12] via-[#121218] to-[#0E0E12] border border-[#D4AF37]/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-2xl bg-[#08080A] border-2 border-[#D4AF37] flex items-center justify-center text-4xl shadow-lg flex-shrink-0">
            {report.zodiacSymbol}
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              Calculated Moon Sign (Chandra Rashi)
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#FFF8E7]">
              {report.rashi.name} <span className="text-xl text-[#D4AF37]">({report.zodiacSign})</span>
            </h3>
            <p className="text-xs text-neutral-300 mt-1">
              Ruling Planet: <strong className="text-[#10B981]">{report.planet}</strong> • Element: <strong className="text-amber-400">{report.rashi.element}</strong>
            </p>
          </div>
        </div>

        {report.nakshatra && (
          <div className="p-3.5 rounded-xl bg-[#08080A] border border-neutral-800 text-right md:text-right w-full md:w-auto">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Nakshatra</span>
            <p className="text-base font-bold text-[#FFF8E7]">{report.nakshatra.name} ({report.nakshatra.hindiName})</p>
            <p className="text-[11px] text-neutral-400">Lord: {report.nakshatra.rulingPlanet} • Symbol: {report.nakshatra.symbol}</p>
          </div>
        )}

      </div>

      {/* Planetary Positions (Method 3 Birth Chart extra) */}
      {report.planetaryPositions && report.planetaryPositions.length > 0 && (
        <div className="p-4 rounded-xl bg-[#08080A] border border-neutral-800 space-y-3">
          <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider flex items-center space-x-2">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            <span>Planetary Positions & Strength Assessment</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {report.planetaryPositions.map((p, idx) => (
              <div key={idx} className={`p-2.5 rounded-lg border text-xs ${p.isWeak ? 'bg-rose-950/20 border-rose-800/50' : 'bg-[#121216] border-neutral-800'}`}>
                <p className="font-semibold text-[#FFF8E7] text-[11px] truncate">{p.planet}</p>
                <p className="text-[10px] text-neutral-400">{p.rashi} • House {p.house}</p>
                <div className="flex justify-between items-center mt-1 text-[9px] font-mono">
                  <span className={p.isWeak ? 'text-rose-400 font-bold' : 'text-[#10B981]'}>{p.dignity}</span>
                  <span className="text-neutral-400">{p.strengthScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personality & Weakness Analysis */}
      <div className="p-4 rounded-xl bg-[#08080A] border border-neutral-800 space-y-2">
        <h4 className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
          Personality & Astrological Trait Analysis
        </h4>
        <p className="text-xs text-neutral-300 leading-relaxed">
          {report.personalityAnalysis}
        </p>
        {report.weakPlanetAnalysis && (
          <p className="text-xs text-amber-300/90 pt-2 border-t border-neutral-800/60 font-mono">
            ⚠️ {report.weakPlanetAnalysis}
          </p>
        )}
      </div>

      {/* Lucky Attributes Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-[#08080A] border border-neutral-800 text-center">
          <span className="text-[10px] text-neutral-400 font-mono uppercase">Lucky Numbers</span>
          <p className="text-base font-bold text-[#D4AF37] mt-1">{report.luckyNumbers.join(', ')}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#08080A] border border-neutral-800 text-center">
          <span className="text-[10px] text-neutral-400 font-mono uppercase">Lucky Colors</span>
          <p className="text-xs font-bold text-[#FFF8E7] mt-1">{report.luckyColors.join(', ')}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#08080A] border border-neutral-800 text-center">
          <span className="text-[10px] text-neutral-400 font-mono uppercase">Lucky Days</span>
          <p className="text-xs font-bold text-[#10B981] mt-1">{report.luckyDays.join(', ')}</p>
        </div>
      </div>

      {/* Recommended Navratna Gemstone Prescription */}
      <div className="p-5 rounded-2xl bg-[#08080A] border border-[#D4AF37]/40 space-y-4">
        
        <div className="flex flex-col md:flex-row items-center gap-5 border-b border-neutral-800 pb-4">
          <img
            src={report.recommendedGemstone.image}
            alt={report.recommendedGemstone.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-xl flex-shrink-0"
          />
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
              Recommended Navratna Gemstone
            </span>
            <h4 className="text-2xl font-serif font-bold text-[#FFF8E7]">
              {report.recommendedGemstone.name} <span className="text-base text-[#10B981]">({report.recommendedGemstone.hindiName})</span>
            </h4>
            <p className="text-xs text-neutral-300">
              Ruling Planet: <strong className="text-[#D4AF37]">{report.recommendedGemstone.planet}</strong> • Chakra: {report.recommendedGemstone.chakarAlignment}
            </p>
          </div>
        </div>

        {/* Prescription Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#121216] border border-neutral-800">
            <span className="text-[10px] text-neutral-400 font-mono">Recommended Carat</span>
            <p className="text-base font-bold text-[#D4AF37]">{report.recommendedCarat} Carats</p>
            <p className="text-[9px] text-neutral-500 font-mono">BodyWeight / 12</p>
          </div>

          <div className="p-3 rounded-xl bg-[#121216] border border-neutral-800">
            <span className="text-[10px] text-neutral-400 font-mono">Wearing Finger</span>
            <p className="text-xs font-semibold text-[#FFF8E7] mt-0.5">{report.wearingFinger}</p>
          </div>

          <div className="p-3 rounded-xl bg-[#121216] border border-neutral-800">
            <span className="text-[10px] text-neutral-400 font-mono">Wearing Metal</span>
            <p className="text-xs font-semibold text-[#10B981] mt-0.5">{report.wearingMetal}</p>
          </div>

          <div className="p-3 rounded-xl bg-[#121216] border border-neutral-800">
            <span className="text-[10px] text-neutral-400 font-mono">Wearing Day</span>
            <p className="text-xs font-semibold text-[#D4AF37] mt-0.5">{report.wearingDay}</p>
          </div>
        </div>

        {/* Benefits list */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-wider">Key Gemstone Benefits</span>
          <ul className="grid sm:grid-cols-2 gap-2 text-xs text-neutral-300">
            {report.recommendedGemstone.primaryBenefits.map((b, i) => (
              <li key={i} className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mantra */}
        <div className="p-3.5 rounded-xl bg-[#121216] border border-[#D4AF37]/30 text-center">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Energizing Vedic Mantra</span>
          <p className="text-xs font-serif italic text-[#FFF8E7] mt-0.5">"{report.recommendedGemstone.mantra}"</p>
        </div>

      </div>

      {/* Footer stamp */}
      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-2 border-t border-neutral-800">
        <span>Report ID: {report.id}</span>
        <span>Verified by GemVault AI Sovereign Protocol</span>
        <span>{new Date(report.createdAt).toLocaleDateString()}</span>
      </div>

    </div>
  );
};
