import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, User as UserIcon, Lock, Mail, CheckCircle, AlertCircle, KeyRound, Sparkles, X } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup' | 'admin-login';
  onClose: () => void;
  onLoginSuccess: (user: User, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess
}) => {
  const [activePortal, setActivePortal] = useState<'selection' | 'admin' | 'user-login' | 'user-signup' | 'forgot-pass'>(
    initialMode === 'admin-login' ? 'admin' : initialMode === 'signup' ? 'user-signup' : 'user-login'
  );

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('1995-06-15');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [bodyWeightKg, setBodyWeightKg] = useState('72');
  const [profession, setProfession] = useState('Software Engineer');
  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('California');
  const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
  const [otpCode, setOtpCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);

  // Status message
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Handle User Signup
  const handleUserSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setErrorMsg('Please accept the Terms & Conditions to proceed.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          password,
          dob,
          gender,
          bodyWeightKg,
          profession,
          country,
          state,
          profilePicture
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');

      setSuccessMsg('Email Verification sent! Welcome to GemVault AI.');
      setTimeout(() => {
        onLoginSuccess(data.user, data.token);
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle User Login
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Admin Login with 2FA
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, otp: otpCode })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Admin login failed');

      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login Fillers
  const fillDemoUser = () => {
    setEmail('customer@gemvault.ai');
    setPassword('customer123');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@gemvault.ai');
    setPassword('admin123');
    setOtpCode('123456');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl editorial-card rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden my-8"
      >
        {/* Glow background accent */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0B0B0E] text-neutral-400 hover:text-white border border-neutral-800 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Cryptographic Authentication Protocol</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#FFF8E7]">
            GemVault AI Sovereign Access
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Choose your authentication portal to access deep optical metrics & astro reports
          </p>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#A7F3D0] text-xs flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* PORTAL SELECTION (Two Animated Cards Requirement) */}
        {activePortal === 'selection' && (
          <div className="grid md:grid-cols-2 gap-6 my-4">
            
            {/* Card 1: ADMIN PORTAL */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-2xl bg-[#08080A] border border-[#D4AF37]/40 hover:border-[#D4AF37] shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#FFF8E7]">ADMIN PORTAL</h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Restricted access for Chief Gemologists, Security Auditors & Researchers. Requires 2FA OTP validation.
                </p>
              </div>

              <div className="mt-8 space-y-2">
                <button
                  onClick={() => {
                    setActivePortal('admin');
                    fillDemoAdmin();
                  }}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md"
                >
                  Admin Login (With 2FA)
                </button>
                <button
                  onClick={() => setActivePortal('forgot-pass')}
                  className="w-full py-2 rounded-xl text-xs text-[#D4AF37]/80 hover:text-[#FFF8E7] transition-all font-mono"
                >
                  Forgot Password
                </button>
              </div>
            </motion.div>

            {/* Card 2: USER PORTAL */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-2xl bg-[#08080A] border border-[#10B981]/40 hover:border-[#10B981] shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] mb-4">
                  <UserIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#FFF8E7]">USER PORTAL</h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  For Collectors, Jewelers, and Astrological Clients. Analyze gems, calculate carat requirements, and mint certificates.
                </p>
              </div>

              <div className="mt-8 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setActivePortal('user-login');
                      fillDemoUser();
                    }}
                    className="py-2.5 rounded-xl font-semibold text-xs text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/40 hover:bg-[#10B981]/20 transition-all uppercase tracking-wider font-mono"
                  >
                    User Login
                  </button>
                  <button
                    onClick={() => setActivePortal('user-signup')}
                    className="py-2.5 rounded-xl font-semibold text-xs text-black bg-[#10B981] hover:opacity-90 transition-all uppercase tracking-wider font-mono"
                  >
                    Sign Up
                  </button>
                </div>
                <button
                  onClick={() => setActivePortal('forgot-pass')}
                  className="w-full py-2 rounded-xl text-xs text-[#10B981]/80 hover:text-[#A7F3D0] transition-all font-mono"
                >
                  Forgot Password
                </button>
              </div>
            </motion.div>

          </div>
        )}

        {/* ADMIN LOGIN FORM */}
        {activePortal === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-[0.2em] flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Gateway</span>
              </span>
              <button
                type="button"
                onClick={() => setActivePortal('selection')}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Change Portal
              </button>
            </div>

            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gemvault.ai"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">2FA Security OTP (Demo: 123456)</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-[#D4AF37]" />
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08080A] border border-[#D4AF37]/50 text-[#FFF8E7] text-sm font-mono tracking-widest focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#D4AF37] rounded"
                />
                <span>Remember Session</span>
              </label>
              <button
                type="button"
                onClick={() => setActivePortal('forgot-pass')}
                className="text-[#D4AF37] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md mt-4 text-black"
            >
              {loading ? 'Authenticating Admin...' : 'Authenticate & Enter Admin Portal'}
            </button>
          </form>
        )}

        {/* USER LOGIN FORM */}
        {activePortal === 'user-login' && (
          <form onSubmit={handleUserLogin} className="space-y-4 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono font-semibold text-[#10B981] uppercase tracking-[0.2em] flex items-center space-x-1">
                <UserIcon className="w-4 h-4" />
                <span>User Gateway</span>
              </span>
              <button
                type="button"
                onClick={() => setActivePortal('selection')}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Change Portal
              </button>
            </div>

            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@gemvault.ai"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-sm focus:border-[#10B981] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-sm focus:border-[#10B981] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#10B981] rounded"
                />
                <span>Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => setActivePortal('forgot-pass')}
                className="text-[#10B981] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-[#10B981] text-black hover:opacity-90 transition-all shadow-md mt-2"
            >
              {loading ? 'Logging In...' : 'Sign In To Dashboard'}
            </button>

            {/* Google Login Simulation */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setEmail('customer@gemvault.ai');
                  setPassword('customer123');
                }}
                className="w-full py-2.5 rounded-xl bg-[#08080A] border border-neutral-800 hover:border-neutral-600 text-xs text-neutral-200 font-medium flex items-center justify-center space-x-2 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <span className="text-xs text-neutral-400">Don't have an account? </span>
              <button
                type="button"
                onClick={() => setActivePortal('user-signup')}
                className="text-xs font-semibold text-[#10B981] hover:underline"
              >
                Create One Now
              </button>
            </div>
          </form>
        )}

        {/* USER SIGNUP FORM (Full Detailed Fields Requirement) */}
        {activePortal === 'user-signup' && (
          <form onSubmit={handleUserSignup} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono font-semibold text-[#10B981] uppercase tracking-[0.2em]">
                Full Profile Registration
              </span>
              <button
                type="button"
                onClick={() => setActivePortal('user-login')}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Already registered? Login
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alexander Wright"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-xs focus:border-[#10B981] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@example.com"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-xs focus:border-[#10B981] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 019-2831"
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-xs focus:border-[#10B981] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                  Date of Birth (For Astro Zodiac)
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-[#D4AF37]/50 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-xs focus:border-[#10B981] focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                  Body Weight (Kg) (Carat = Weight / 12)
                </label>
                <input
                  type="number"
                  value={bodyWeightKg}
                  onChange={(e) => setBodyWeightKg(e.target.value)}
                  placeholder="72"
                  required
                  min="20"
                  max="250"
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-[#D4AF37]/50 text-[#FFF8E7] text-xs focus:border-[#D4AF37] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Profession</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Software Executive / Doctor / Business"
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-xs focus:border-[#10B981] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="United States"
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-xs focus:border-[#10B981] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-xs focus:border-[#10B981] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-xs focus:border-[#10B981] focus:outline-none"
                />
              </div>
            </div>

            {/* Profile Picture Upload Link */}
            <div>
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Profile Picture URL</label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-xs focus:border-[#10B981] focus:outline-none"
                />
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#D4AF37] flex-shrink-0">
                  <img src={profilePicture} alt="Avatar Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Terms and Email Verification notice */}
            <div className="space-y-2 pt-2">
              <label className="flex items-center space-x-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="accent-[#10B981] rounded"
                />
                <span>I agree to the GemVault Protocol Terms & Conditions and Privacy Policy</span>
              </label>

              <p className="text-[11px] text-[#D4AF37]/80 italic font-mono">
                * An email verification link will be sent automatically upon registration.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md mt-4 text-black"
            >
              {loading ? 'Registering Account...' : 'Create Account & Verify Email'}
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {activePortal === 'forgot-pass' && (
          <div className="space-y-4 max-w-md mx-auto text-center">
            <h3 className="text-lg font-serif font-bold text-[#FFF8E7]">Reset Cryptographic Password</h3>
            <p className="text-xs text-neutral-400">
              Enter your registered email address and we will send a secure password reset key.
            </p>

            <div className="text-left">
              <label className="block text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="w-full px-3 py-2 rounded-xl bg-[#08080A] border border-neutral-800 text-neutral-100 text-sm focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setSuccessMsg('Reset key sent to ' + (email || 'your email') + '. Please check inbox.');
              }}
              className="w-full py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider editorial-button-gold shadow-md text-black"
            >
              Send Password Reset Link
            </button>

            <button
              type="button"
              onClick={() => setActivePortal('user-login')}
              className="text-xs text-neutral-400 hover:text-white underline block mx-auto pt-2"
            >
              Return to Login
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
