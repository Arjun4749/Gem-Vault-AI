import React from 'react';
import { motion } from 'motion/react';
import { Compass, BarChart3, Calculator, Award, Sparkles, ArrowRight, Cpu } from 'lucide-react';
import { Gem3DCanvas } from './Gem3DCanvas';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'signup' | 'admin-login') => void;
  onNavigateTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth, onNavigateTab }) => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E5E5E5] overflow-hidden selection:bg-[#D4AF37]/30">
      
      {/* Background Subtle Editorial Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#D4AF37]/05 rounded-full blur-[120px] pointer-events-none" />

      {/* Editorial Grid Subtle Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-24 space-y-28">
        
        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-12 items-center pt-6">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Editorial Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0E0E12] border border-[#D4AF37]/30 shadow-lg shadow-[#D4AF37]/5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
              <span className="text-[10px] font-mono font-medium tracking-[0.2em] text-[#D4AF37] uppercase">
                Enterprise AI & Web3 Gemstone Protocol
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-[1.15] tracking-tight text-[#FFF8E7]">
              Smart Gemstone{' '}
              <span className="gold-gradient-text italic font-normal">
                Authentication
              </span>{' '}
              & Astro Intelligence
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-sans">
              Precision CNN Optical Scanning, Planetary Navratna Alignment, Mohs Durability Risk Physics, Dynamic Auction Price Regression, and SHA-256 Blockchain Certificate Minting.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => onNavigateTab('analysis')}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider editorial-button-gold shadow-xl flex items-center space-x-2.5 group"
              >
                <Cpu className="w-4 h-4 text-black" />
                <span>Launch Optical Scan AI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateTab('rashi')}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#FFF8E7] bg-[#D4AF37]/15 border border-[#D4AF37] hover:bg-[#D4AF37]/25 transition-all shadow-lg flex items-center space-x-2.5"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Find My Rashi</span>
              </button>

              <button
                onClick={() => onNavigateTab('astrology')}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#FFF8E7] bg-[#0F0F14] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all shadow-lg flex items-center space-x-2.5"
              >
                <Sparkles className="w-4 h-4 text-[#10B981]" />
                <span>Astro Recommendation</span>
              </button>
            </div>

            {/* Feature Highlights Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#D4AF37]/15">
              <div>
                <p className="text-2xl font-serif font-bold text-[#FFF8E7]">99.4%</p>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">Authenticity Precision</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-[#10B981]">SHA-256</p>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">Blockchain Hash</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-[#D4AF37]">BodyWeight/12</p>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">Carat Formula</p>
              </div>
            </div>

          </motion.div>

          {/* 3D Interactive Gemstone Canvas Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#D4AF37]/30 via-[#10B981]/20 to-[#D4AF37]/10 backdrop-blur-2xl shadow-2xl border border-[#D4AF37]/30">
              <div className="bg-[#0A0A0D]/95 rounded-[22px] p-4 sm:p-5 text-center overflow-hidden">
                <div className="flex justify-between items-center mb-3 px-1">
                  <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-[0.2em] flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    <span>Realtime 3D Refraction • 9 Navratna Gems</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest font-bold">Interactive WebGL</span>
                </div>

                <Gem3DCanvas height={440} showControls={true} />

                <p className="text-[11px] text-neutral-400 mt-3 font-mono tracking-wider">
                  Real-time WebGL Gem Refraction • Toggle between 9-Stone Orbit Ring & Single Stone Inspection
                </p>
              </div>
            </div>
          </motion.div>

        </section>

        {/* 5 CORE CAPABILITIES GRID */}
        <section className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">SYSTEM ARCHITECTURE</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FFF8E7]">
              Sovereign Gemstone Intelligence Engine
            </h2>
            <p className="text-sm text-neutral-400">
              End-to-end multi-modal deep learning pipeline for mineral authentication, astrological prescription, and NFT verification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Tool 1: Image Analysis */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => onNavigateTab('analysis')}
              className="editorial-card p-6 rounded-2xl cursor-pointer space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] group-hover:bg-[#10B981]/20 transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#FFF8E7]">OpenCV & CNN Optical Analysis</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Noise reduction, reflection indexing, texture uniformity, and clarity grading classifying Natural vs Synthetic vs Fake vs Treated.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#10B981] flex items-center space-x-1 uppercase tracking-wider">
                <span>Start Image Scan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Tool 2: Astro Recommendation */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => onNavigateTab('astrology')}
              className="editorial-card p-6 rounded-2xl cursor-pointer space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-colors">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#FFF8E7]">Planetary Navratna Prescriber</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Maps DOB to Zodiac & Ruling Planet. Calculates exact weight requirement via <span className="text-[#D4AF37] font-mono">Carat = Weight / 12</span>.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#D4AF37] flex items-center space-x-1 uppercase tracking-wider">
                <span>Calculate Recommendation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Tool 3: Price Regression */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => onNavigateTab('pricing')}
              className="editorial-card p-6 rounded-2xl cursor-pointer space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#FFF8E7]">Dynamic Price Regression</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Multi-variable price estimation considering Origin (Mogok, Ceylon, Colombia), Clarity, Carat weight scaling, and Demand rarity.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#D4AF37] flex items-center space-x-1 uppercase tracking-wider">
                <span>Estimate Valuation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Tool 4: Durability Gauge */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => onNavigateTab('durability')}
              className="editorial-card p-6 rounded-2xl cursor-pointer space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] group-hover:bg-[#10B981]/20 transition-colors">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#FFF8E7]">Durability Physics Gauge</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Evaluates <span className="text-[#10B981] font-mono">(H + T + R + C) / 4</span> formula for Mohs hardness, fracture toughness, thermal shock & chemical resistance.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#10B981] flex items-center space-x-1 uppercase tracking-wider">
                <span>Test Structural Risk</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Tool 5: Blockchain Certificate */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => onNavigateTab('blockchain')}
              className="editorial-card p-6 rounded-2xl cursor-pointer space-y-4 group lg:col-span-2"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#FFF8E7]">SHA-256 Web3 Blockchain Certificate</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Mints immutable cryptographic certificates with QR code verification, timestamped block hashes, and exportable ERC-721 compatible NFT metadata JSON structure.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#D4AF37] flex items-center space-x-1 uppercase tracking-wider">
                <span>Issue & Verify Certificates</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="relative p-8 md:p-12 rounded-3xl editorial-card-gold text-center space-y-6 overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-serif font-bold text-[#FFF8E7]">
              Ready To Verify & Authenticate Your Gemstone?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              Join thousands of collectors, jewelers, and researchers utilizing GemVault AI for transparent mineral valuation and astrological prescriptions.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider editorial-button-gold shadow-xl"
              >
                Create Account Now
              </button>

              <button
                onClick={() => onOpenAuth('admin-login')}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#FFF8E7] bg-[#0E0E12] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all"
              >
                Admin Security Portal
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
