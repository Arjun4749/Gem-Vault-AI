import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardAnalytics } from './components/DashboardAnalytics';
import { GemstoneAnalysisTool } from './components/GemstoneAnalysisTool';
import { AIGemRecommendationTool } from './components/AIGemRecommendationTool';
import { FindMyRashiTool } from './components/FindMyRashiTool';
import { PricePredictionTool } from './components/PricePredictionTool';
import { DurabilityCalculator } from './components/DurabilityCalculator';
import { BlockchainCertificateManager } from './components/BlockchainCertificateManager';
import { ReportsHistoryView } from './components/ReportsHistoryView';
import { UserProfileView } from './components/UserProfileView';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'admin-login'>('login');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Check stored user session on startup
  useEffect(() => {
    const savedUser = localStorage.getItem('gemvault_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (err) {
        console.error('Failed to parse saved session:', err);
      }
    }
  }, []);

  const handleAuthSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('gemvault_user', JSON.stringify(loggedInUser));
    setAuthModalOpen(false);
    if (activeTab === 'landing') {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gemvault_user');
    setActiveTab('landing');
  };

  const handleOpenAuth = (mode: 'login' | 'signup' | 'admin-login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#050505] text-[#E5E5E5]' : 'bg-[#FAF8F5] text-[#1A1A1A]'} font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-[#FFF8E7]`}>
      
      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Layout Container */}
      <div className="flex">
        
        {/* Sidebar Navigation */}
        {activeTab !== 'landing' && (
          <Sidebar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLogout={handleLogout}
          />
        )}

        {/* Dynamic Route Content Panel */}
        <main className={`flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full transition-all ${
          activeTab === 'landing' ? 'p-0 md:p-0 max-w-none' : ''
        }`}>
          
          {activeTab === 'landing' && (
            <LandingPage
              onOpenAuth={handleOpenAuth}
              onNavigateTab={(tab) => {
                if (!user && (tab === 'reports' || tab === 'admin')) {
                  handleOpenAuth('login');
                } else {
                  setActiveTab(tab);
                }
              }}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardAnalytics onNavigateTab={setActiveTab} />
          )}

          {activeTab === 'analysis' && (
            <GemstoneAnalysisTool />
          )}

          {activeTab === 'rashi' && (
            <FindMyRashiTool userDob={user?.dob} userName={user?.fullName} userWeight={user?.bodyWeightKg} />
          )}

          {activeTab === 'astrology' && (
            <AIGemRecommendationTool userName={user?.fullName} userDob={user?.dob} userWeight={user?.bodyWeightKg} />
          )}

          {activeTab === 'pricing' && (
            <PricePredictionTool />
          )}

          {activeTab === 'durability' && (
            <DurabilityCalculator />
          )}

          {activeTab === 'blockchain' && (
            <BlockchainCertificateManager />
          )}

          {activeTab === 'reports' && (
            <ReportsHistoryView />
          )}

          {activeTab === 'profile' && (
            <UserProfileView user={user} />
          )}

          {activeTab === 'admin' && user?.role === 'Admin' && (
            <AdminPanel adminUser={user} />
          )}

        </main>
      </div>

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
