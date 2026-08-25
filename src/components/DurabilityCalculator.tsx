import React, { useState } from 'react';
import { Calculator, Shield, Sparkles, Flame, Droplet, Hammer, CheckCircle } from 'lucide-react';
import { DurabilityInput, DurabilityResult } from '../types';

export const DurabilityCalculator: React.FC = () => {
  const [mohsHardness, setMohsHardness] = useState<number>(9.0);
  const [toughnessScore, setToughnessScore] = useState<number>(8.5);
  const [heatResistanceScore, setHeatResistanceScore] = useState<number>(8.0);
  const [chemicalResistanceScore, setChemicalResistanceScore] = useState<number>(9.0);

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DurabilityResult | null>(null);

  // Preset minerals
  const presets = [
    { name: 'Diamond', h: 10, t: 7.5, r: 9.0, c: 10.0 },
    { name: 'Ruby / Sapphire (Corundum)', h: 9.0, t: 8.5, r: 8.5, c: 9.5 },
    { name: 'Emerald (Beryl)', h: 7.5, t: 5.5, r: 5.0, c: 7.0 },
    { name: 'Pearl (Organic Calcium)', h: 3.5, t: 4.0, r: 2.0, c: 2.5 },
    { name: 'Red Coral', h: 3.5, t: 5.0, r: 3.0, c: 3.0 }
  ];

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: DurabilityInput = {
        mohsHardness,
        toughnessScore,
        heatResistanceScore,
        chemicalResistanceScore
      };

      const res = await fetch('/api/durability/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Calculation failed');

      setResult(data.result);
    } catch (err: any) {
      alert('Durability calculation error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[10px] font-mono tracking-[0.2em] uppercase">
          <Calculator className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Mineral Physical Integrity Physics</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#FFF8E7]">
          Gemstone Durability Risk & Lifespan Gauge
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Computes exact structural index via <span className="text-[#10B981] font-mono">(Hardness + Toughness + Heat + Chemical) / 4</span> formula to evaluate cleavage fracture risk and heirloom longevity.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Parameters */}
        <form onSubmit={handleCalculate} className="lg:col-span-5 p-6 rounded-2xl editorial-card space-y-5">
          <h3 className="text-base font-serif font-bold text-[#FFF8E7] pb-2 border-b border-neutral-800">
            Physical Constant Inputs
          </h3>

          {/* Quick Preset Selector */}
          <div>
            <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Select Mineral Preset</label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    setMohsHardness(p.h);
                    setToughnessScore(p.t);
                    setHeatResistanceScore(p.r);
                    setChemicalResistanceScore(p.c);
                    setResult(null);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#08080A] border border-neutral-800 text-[11px] text-[#D4AF37] hover:border-[#D4AF37] transition-all font-sans"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mohs Hardness Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-neutral-300 font-medium flex items-center space-x-1">
                <Hammer className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Mohs Scratch Hardness (1-10)</span>
              </span>
              <span className="text-[#10B981] font-mono font-bold">{mohsHardness}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.25"
              value={mohsHardness}
              onChange={(e) => setMohsHardness(Number(e.target.value))}
              className="w-full accent-[#10B981]"
            />
          </div>

          {/* Fracture Toughness Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-neutral-300 font-medium flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Toughness / Chipping Resistance (1-10)</span>
              </span>
              <span className="text-[#D4AF37] font-mono font-bold">{toughnessScore}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.25"
              value={toughnessScore}
              onChange={(e) => setToughnessScore(Number(e.target.value))}
              className="w-full accent-[#D4AF37]"
            />
          </div>

          {/* Thermal Stability Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-neutral-300 font-medium flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Thermal Shock Resistance (1-10)</span>
              </span>
              <span className="text-amber-400 font-mono font-bold">{heatResistanceScore}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.25"
              value={heatResistanceScore}
              onChange={(e) => setHeatResistanceScore(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          {/* Chemical Stability Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-neutral-300 font-medium flex items-center space-x-1">
                <Droplet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chemical Acid Resistance (1-10)</span>
              </span>
              <span className="text-emerald-300 font-mono font-bold">{chemicalResistanceScore}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.25"
              value={chemicalResistanceScore}
              onChange={(e) => setChemicalResistanceScore(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{loading ? 'Evaluating Physics...' : 'Calculate Durability Score'}</span>
          </button>
        </form>

        {/* Output */}
        <div className="lg:col-span-7 p-6 rounded-2xl editorial-card space-y-6">
          <h3 className="text-base font-serif font-bold text-[#FFF8E7] border-b border-neutral-800 pb-3">
            Structural Integrity Analysis
          </h3>

          {result ? (
            <div className="space-y-6">
              
              {/* Overall Gauge Score */}
              <div className="p-6 rounded-2xl bg-[#08080A] border border-[#10B981]/40 shadow-xl text-center space-y-2">
                <p className="text-[10px] font-mono text-[#10B981] uppercase tracking-[0.2em]">
                  Overall Durability Index Score
                </p>
                <div className="text-5xl font-serif font-bold text-[#D4AF37]">
                  {result.overallScore} / 10
                </div>
                <p className="text-xs text-neutral-300 font-mono">
                  Calculated Formula: <span className="text-[#D4AF37]">(H:{result.mohsGauge} + T:{result.toughness} + R:{result.heatResistance} + C:{result.chemicalResistance}) / 4</span>
                </p>
              </div>

              {/* Risk & Lifespan Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#08080A] border border-[#D4AF37]/30">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Structural Risk Rating</p>
                  <p className={`text-lg font-serif font-bold mt-0.5 ${
                    result.riskCategory === 'Very Low' ? 'text-[#10B981]' : 'text-[#D4AF37]'
                  }`}>
                    {result.riskCategory} Risk
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#08080A] border border-[#10B981]/30">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Expected Heirloom Lifespan</p>
                  <p className="text-lg font-serif font-bold text-[#A7F3D0] mt-0.5">
                    {result.expectedLifespanYears}
                  </p>
                </div>
              </div>

              {/* Care Guidelines */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-neutral-800 space-y-2">
                <h4 className="text-[10px] font-mono font-semibold text-[#10B981] uppercase tracking-[0.2em]">
                  Care & Maintenance Protocol
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {result.careGuidelines.map((guide, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span>{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="py-24 text-center text-neutral-500 space-y-2">
              <Calculator className="w-12 h-12 mx-auto text-neutral-700" />
              <p className="text-xs">Adjust physical sliders on the left to compute durability risk and lifespan metrics.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
