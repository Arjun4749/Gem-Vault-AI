import React, { useState } from 'react';
import { Compass, Sparkles, User, CheckCircle2 } from 'lucide-react';
import { AstrologicalRecommendation } from '../types';

interface AIGemRecommendationToolProps {
  userName?: string;
  userDob?: string;
  userWeight?: number;
}

export const AIGemRecommendationTool: React.FC<AIGemRecommendationToolProps> = ({
  userName = 'Arjun Singh',
  userDob = '1994-07-28',
  userWeight = 72
}) => {
  const [fullName, setFullName] = useState<string>(userName);
  const [dob, setDob] = useState<string>(userDob);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(userWeight);
  const [profession, setProfession] = useState<string>('Software Executive');
  const [healthGoal, setHealthGoal] = useState<string>('Vitality & Stress Reduction');
  const [financialGoal, setFinancialGoal] = useState<string>('Wealth Accumulation & Career Expansion');
  const [preferences, setPreferences] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<AstrologicalRecommendation | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert('Full Name is required for calculating your Navratna Gemstone recommendation.');
      return;
    }
    if (!dob) {
      alert('Date of Birth (DOB) is required for calculating your Navratna Gemstone recommendation.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/recommendation/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          dob,
          gender,
          bodyWeightKg,
          profession,
          healthGoal,
          financialGoal,
          preferences
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Calculation failed');

      setRecommendation(data.recommendation);
    } catch (err: any) {
      alert('Error calculating recommendation: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono tracking-[0.2em] uppercase">
          <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Navratna Vedic Planetary Engine</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#FFF8E7]">
          AI Astrological Gemstone Prescriber
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Precision astrological calculations combining your <strong className="text-[#D4AF37]">Full Name (Nama Rashi)</strong> and <strong className="text-[#D4AF37]">Date of Birth (Janma Rashi)</strong> to determine your harmonized Navratna gemstone prescription and carat weight (<span className="text-[#D4AF37] font-mono">Carat = Body Weight / 12</span>).
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Column */}
        <form onSubmit={handleCalculate} className="lg:col-span-5 p-6 rounded-2xl editorial-card space-y-4">
          <h3 className="text-base font-serif font-bold text-[#FFF8E7] flex items-center justify-between pb-2 border-b border-neutral-800">
            <span className="flex items-center space-x-2">
              <User className="w-4 h-4 text-[#D4AF37]" />
              <span>Personal Astrological Attributes</span>
            </span>
            <span className="text-[10px] text-[#D4AF37] font-mono uppercase">* Required Fields</span>
          </h3>

          {/* Full Name Input - MANDATORY */}
          <div>
            <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
              Full Name (Nama Rashi Input) *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="e.g. Arjun Singh"
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-[#D4AF37]/60 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none"
            />
            <p className="text-[10px] text-neutral-500 mt-1">Used to calculate your Swar Nama Rashi via phonetic syllable mapping</p>
          </div>

          {/* Date of Birth Input - MANDATORY */}
          <div>
            <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
              Date of Birth (Janma Rashi Input) *
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-[#D4AF37]/60 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none"
            />
            <p className="text-[10px] text-neutral-500 mt-1">Used to calculate your Moon Sign (Janma Moon Rashi)</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">Body Weight (Kg) *</label>
              <input
                type="number"
                value={bodyWeightKg}
                onChange={(e) => setBodyWeightKg(Number(e.target.value))}
                min="20"
                max="250"
                required
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-[#D4AF37]/40 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Profession / Industry</label>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Doctor / Lawyer / Software / Trader"
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Health Goal</label>
            <input
              type="text"
              value={healthGoal}
              onChange={(e) => setHealthGoal(e.target.value)}
              placeholder="Mental Peace & Emotional Balance"
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Financial / Career Goal</label>
            <input
              type="text"
              value={financialGoal}
              onChange={(e) => setFinancialGoal(e.target.value)}
              placeholder="Business Expansion & Strategic Leadership"
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md flex items-center justify-center space-x-2 mt-4"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{loading ? 'Calculating Astro Map...' : 'Find Gemstone (Using Name & DOB)'}</span>
          </button>
        </form>

        {/* Right Output Column */}
        <div className="lg:col-span-7 p-6 rounded-2xl editorial-card space-y-6">
          
          <h3 className="text-base font-serif font-bold text-[#FFF8E7] flex items-center justify-between border-b border-neutral-800 pb-3">
            <span>Astro-Planetary Prescription Outcome</span>
            {recommendation && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-1 rounded-full">
                Confidence: {recommendation.confidenceScore}%
              </span>
            )}
          </h3>

          {recommendation ? (
            <div className="space-y-6">
              
              {/* Profile & Input Summary */}
              <div className="p-3.5 rounded-xl bg-[#08080A] border border-[#D4AF37]/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono uppercase block">Full Name</span>
                  <span className="font-semibold text-[#FFF8E7] truncate block">{recommendation.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono uppercase block">Date of Birth</span>
                  <span className="font-semibold text-[#D4AF37] block">{recommendation.userDob}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono uppercase block">Janma Rashi (DOB)</span>
                  <span className="font-semibold text-[#10B981] truncate block">{recommendation.janmaRashi || 'Moon Sign'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono uppercase block">Nama Rashi (Name)</span>
                  <span className="font-semibold text-[#D4AF37] truncate block">{recommendation.namaRashi || 'Swar Sign'}</span>
                </div>
              </div>

              {/* Gem Card Highlight */}
              <div className="p-5 rounded-2xl bg-[#08080A] border border-[#D4AF37]/30 shadow-xl flex flex-col md:flex-row items-center gap-5">
                <img
                  src={recommendation.recommendedGem.image}
                  alt={recommendation.recommendedGem.name}
                  className="w-28 h-28 rounded-2xl object-cover border-2 border-[#D4AF37]/60 shadow-lg flex-shrink-0"
                />

                <div className="space-y-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                      {recommendation.recommendedGem.hindiName}
                    </span>
                    <span className="text-xs text-[#10B981] font-mono">
                      Ruler: {recommendation.rulingPlanet}
                    </span>
                  </div>

                  <h4 className="text-2xl font-serif font-bold text-[#FFF8E7]">
                    {recommendation.recommendedGem.name}
                  </h4>

                  <p className="text-xs text-neutral-300">
                    Calculated Zodiac Sign: <span className="text-[#D4AF37] font-semibold">{recommendation.zodiacSign}</span>
                  </p>
                </div>
              </div>

              {/* Formula Result Banner (Carat = BodyWeight / 12) */}
              <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em]">Required Carat Weight</span>
                  <span className="text-2xl font-serif font-bold text-[#FFF8E7]">{recommendation.calculatedCarat} Carats</span>
                </div>
                <p className="text-[11px] text-neutral-300 font-mono">
                  Formula Applied: <span className="text-[#10B981]">BodyWeight ({bodyWeightKg}kg) / 12 = {recommendation.calculatedCarat} Carats</span>
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono tracking-wider">Recommended Finger</p>
                  <p className="text-xs font-semibold text-[#D4AF37] mt-1">{recommendation.recommendedFinger}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800">
                  <p className="text-[10px] text-neutral-400 font-mono tracking-wider">Ideal Metal Pairing</p>
                  <p className="text-xs font-semibold text-[#10B981] mt-1">{recommendation.recommendedMetal}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#08080A] border border-neutral-800 col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-neutral-400 font-mono tracking-wider">Auspicious Day/Hora</p>
                  <p className="text-xs font-semibold text-[#D4AF37] mt-1">{recommendation.auspiciousDay}</p>
                </div>
              </div>

              {/* Primary Benefits List */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-neutral-800 space-y-2">
                <h5 className="text-[10px] font-mono font-semibold text-[#10B981] uppercase tracking-[0.2em]">
                  Primary Planetary Benefits
                </h5>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {recommendation.astrologicalBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vedic Mantra */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-[#D4AF37]/30 text-center space-y-1">
                <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em]">Energizing Vedic Mantra</p>
                <p className="text-sm font-serif italic text-[#FFF8E7]">"{recommendation.mantra}"</p>
                <p className="text-[10px] text-neutral-400">Recite 108 times prior to first wearing on {recommendation.auspiciousDay}</p>
              </div>

            </div>
          ) : (
            <div className="py-24 text-center text-neutral-500 space-y-2">
              <Compass className="w-12 h-12 mx-auto text-neutral-700" />
              <p className="text-xs">Enter your birth date and body weight above to compute exact Navratna carat recommendations.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
