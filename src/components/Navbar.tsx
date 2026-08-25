import React from 'react';
import { ShieldCheck, Gem, LogOut, Compass, Cpu, Calculator, Award, BarChart3 } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'signup' | 'admin-login') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/90 border-b border-[#D4AF37]/20 px-4 lg:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] via-[#10B981] to-[#AA7C11] p-0.5 shadow-lg shadow-[#D4AF37]/10 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
              <Gem className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-cinzel text-xl font-bold tracking-widest gold-gradient-text">
                GEMVAULT
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 tracking-widest">
                AI v3.0
              </span>
            </div>
            <p className="text-[9px] text-[#D4AF37]/70 uppercase tracking-[0.2em] font-mono">
              SOVEREIGN GEM PROTOCOL
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'landing'
                ? 'bg-[#D4AF37]/15 text-[#FFF8E7] border border-[#D4AF37]/40 shadow-sm shadow-[#D4AF37]/10'
                : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'analysis'
                ? 'bg-[#10B981]/15 text-[#A7F3D0] border border-[#10B981]/40'
                : 'text-neutral-400 hover:text-[#10B981] hover:bg-[#121216]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Image AI</span>
          </button>

          <button
            onClick={() => setActiveTab('rashi')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'rashi'
                ? 'bg-[#D4AF37]/15 text-[#FFF8E7] border border-[#D4AF37]/40 shadow-sm shadow-[#D4AF37]/10'
                : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Find My Rashi</span>
          </button>

          <button
            onClick={() => setActiveTab('astrology')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'astrology'
                ? 'bg-[#D4AF37]/15 text-[#FFF8E7] border border-[#D4AF37]/40'
                : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Astro Navratna</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'pricing'
                ? 'bg-[#D4AF37]/15 text-[#FFF8E7] border border-[#D4AF37]/40'
                : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Price Valuation</span>
          </button>

          <button
            onClick={() => setActiveTab('durability')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'durability'
                ? 'bg-[#10B981]/15 text-[#A7F3D0] border border-[#10B981]/40'
                : 'text-neutral-400 hover:text-[#10B981] hover:bg-[#121216]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Durability</span>
          </button>

          <button
            onClick={() => setActiveTab('blockchain')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'blockchain'
                ? 'bg-[#D4AF37]/15 text-[#FFF8E7] border border-[#D4AF37]/40'
                : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Certificate</span>
          </button>
        </nav>

        {/* User Auth Controls */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-[#0F0F12] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all text-left"
              >
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]"
                />
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-[#FFF8E7] line-clamp-1">{user.fullName}</p>
                  <p className="text-[9px] text-[#10B981] uppercase tracking-wider font-mono">
                    {user.role}
                  </p>
                </div>
              </button>

              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 rounded-xl bg-[#0F0F12] text-neutral-400 hover:text-rose-400 border border-neutral-800 hover:border-rose-900/50 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-[#D4AF37] hover:text-[#FFF8E7] bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
              >
                Sign In
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wider uppercase editorial-button-gold shadow-md"
              >
                Create Account
              </button>

              <button
                onClick={() => onOpenAuth('admin-login')}
                title="Admin Security Portal"
                className="p-2 rounded-xl bg-[#0F0F12] text-neutral-400 hover:text-[#D4AF37] border border-neutral-800 hover:border-[#D4AF37]/30 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
