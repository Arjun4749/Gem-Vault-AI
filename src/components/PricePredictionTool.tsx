import React, { useState } from 'react';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { PricePredictionInput, PricePredictionResult } from '../types';

export const PricePredictionTool: React.FC = () => {
  const [gemstoneName, setGemstoneName] = useState('Natural Royal Blue Sapphire');
  const [caratWeight, setCaratWeight] = useState(5.25);
  const [color, setColor] = useState('Cornflower Royal Blue');
  const [clarity, setClarity] = useState<'VVS1' | 'VVS2' | 'VS1' | 'VS2' | 'SI1' | 'I1'>('VVS1');
  const [origin, setOrigin] = useState('Ceylon (Sri Lanka)');
  const [treatment, setTreatment] = useState<'None' | 'Heat Treated' | 'Oil Injected' | 'Glass Filled'>('None');
  const [demandFactor, setDemandFactor] = useState<'Low' | 'Medium' | 'High' | 'Extreme'>('High');
  const [rarityScore, setRarityScore] = useState(9);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PricePredictionResult | null>(null);

  const handlePredictPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: PricePredictionInput = {
        gemstoneName,
        caratWeight,
        color,
        clarity,
        origin,
        treatment,
        demandFactor,
        rarityScore
      };

      const res = await fetch('/api/price-prediction/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Prediction failed');

      setResult(data.result);
    } catch (err: any) {
      alert('Price estimation error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono tracking-[0.2em] uppercase">
          <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Multi-Variable Auction Regression Engine</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#FFF8E7]">
          Dynamic Gemstone Valuation & Price AI
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Evaluates market pricing algorithms across 4,000+ wholesale auction records considering origin premium, zero-treatment multipliers, clarity grades, and carat exponential scaling.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs */}
        <form onSubmit={handlePredictPrice} className="lg:col-span-5 p-6 rounded-2xl editorial-card space-y-4">
          <h3 className="text-base font-serif font-bold text-[#FFF8E7] pb-2 border-b border-neutral-800">
            Valuation Parameters
          </h3>

          <div>
            <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Gemstone Variety</label>
            <select
              value={gemstoneName}
              onChange={(e) => setGemstoneName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
            >
              <option value="Natural Royal Blue Sapphire">Natural Royal Blue Sapphire</option>
              <option value="Natural Pigeon Blood Ruby">Natural Pigeon Blood Ruby</option>
              <option value="Natural Zambian Emerald">Natural Zambian Emerald</option>
              <option value="Natural Yellow Sapphire">Natural Yellow Sapphire</option>
              <option value="Colorless Diamond">Colorless Diamond</option>
              <option value="Red Coral">Red Coral</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">Carat Weight</label>
              <input
                type="number"
                step="0.01"
                value={caratWeight}
                onChange={(e) => setCaratWeight(Number(e.target.value))}
                min="0.1"
                max="100"
                required
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-[#D4AF37]/40 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Clarity Grade</label>
              <select
                value={clarity}
                onChange={(e) => setClarity(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="VVS1">VVS1 (Eye Clean)</option>
                <option value="VVS2">VVS2</option>
                <option value="VS1">VS1</option>
                <option value="VS2">VS2</option>
                <option value="SI1">SI1</option>
                <option value="I1">I1</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">Geographical Origin</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-[#D4AF37]/40 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none"
            >
              <option value="Ceylon (Sri Lanka)">Ceylon (Sri Lanka) [+50% Premium]</option>
              <option value="Mogok (Burma)">Mogok (Burma) [+80% Premium]</option>
              <option value="Colombia (Muzo)">Colombia (Muzo) [+60% Premium]</option>
              <option value="Zambia">Zambia [+25% Premium]</option>
              <option value="Madagascar">Madagascar (Standard)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Artificial Treatment</label>
            <select
              value={treatment}
              onChange={(e) => setTreatment(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
            >
              <option value="None">None (100% Natural Untreated)</option>
              <option value="Heat Treated">Heat Treated (-35% Discount)</option>
              <option value="Oil Injected">Oil Injected (-50% Discount)</option>
              <option value="Glass Filled">Glass Filled (-80% Discount)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Global Market Demand</label>
              <select
                value={demandFactor}
                onChange={(e) => setDemandFactor(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Extreme">Extreme</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Rarity Index (1-10)</label>
              <input
                type="number"
                value={rarityScore}
                onChange={(e) => setRarityScore(Number(e.target.value))}
                min="1"
                max="10"
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md flex items-center justify-center space-x-2 mt-4"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{loading ? 'Running AI Regression...' : 'Run Dynamic Price Estimate'}</span>
          </button>
        </form>

        {/* Output */}
        <div className="lg:col-span-7 p-6 rounded-2xl editorial-card space-y-6">
          
          <h3 className="text-base font-serif font-bold text-[#FFF8E7] flex items-center justify-between border-b border-neutral-800 pb-3">
            <span>Market Valuation Outcome</span>
            {result && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-1 rounded-full">
                Regression Confidence: {result.confidenceScore}%
              </span>
            )}
          </h3>

          {result ? (
            <div className="space-y-6">
              
              {/* Main Price Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* USD Price Card */}
                <div className="p-5 rounded-2xl bg-[#08080A] border border-[#D4AF37]/40 shadow-lg relative overflow-hidden">
                  <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em]">Estimated Value (USD)</p>
                  <h4 className="text-3xl font-serif font-bold text-[#FFF8E7] mt-1">
                    ${result.estimatedPriceUsd.toLocaleString()}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-2 font-mono">
                    Range: ${result.priceRangeUsd.min.toLocaleString()} - ${result.priceRangeUsd.max.toLocaleString()}
                  </p>
                </div>

                {/* INR Price Card */}
                <div className="p-5 rounded-2xl bg-[#08080A] border border-[#10B981]/40 shadow-lg relative overflow-hidden">
                  <p className="text-[10px] font-mono text-[#10B981] uppercase tracking-[0.2em]">Estimated Value (INR ₹)</p>
                  <h4 className="text-3xl font-serif font-bold text-[#A7F3D0] mt-1">
                    ₹{result.estimatedPriceInr.toLocaleString()}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-2 font-mono">
                    Range: ₹{result.priceRangeInr.min.toLocaleString()} - ₹{result.priceRangeInr.max.toLocaleString()}
                  </p>
                </div>

              </div>

              {/* Price Trend Chart */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-neutral-800 space-y-2">
                <h5 className="text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-[0.2em] flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <span>Historical Auction Price Appreciation Trend (USD)</span>
                </h5>

                <div className="h-44 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.historicalPriceTrend}>
                      <XAxis dataKey="month" stroke="#737373" fontSize={11} />
                      <YAxis stroke="#737373" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0B0B0E', borderColor: '#D4AF37', borderRadius: '8px', color: '#FFF8E7' }} />
                      <Line type="monotone" dataKey="priceUsd" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: '#10B981' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-[#08080A] border border-[#D4AF37]/30 text-xs space-y-1">
                <p className="font-semibold text-[#D4AF37] uppercase tracking-wider text-[10px] font-mono">Market Analyst Report:</p>
                <p className="text-neutral-300 leading-relaxed">{result.marketAnalysisSummary}</p>
              </div>

            </div>
          ) : (
            <div className="py-24 text-center text-neutral-500 space-y-2">
              <BarChart3 className="w-12 h-12 mx-auto text-neutral-700" />
              <p className="text-xs">Adjust gemstone carat, origin, and treatment parameters above to compute instant auction valuations.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
