import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  Compass,
  Sparkles,
  BarChart3,
  Calculator,
  Award,
  History,
  Bell,
  Settings,
  User as UserIcon,
  LogOut,
  Moon,
  Sun,
  ShieldCheck
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onLogout
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard & Analytics', icon: LayoutDashboard, category: 'Overview' },
    { id: 'analysis', label: 'Gemstone Analysis', icon: Cpu, category: 'AI Tools' },
    { id: 'rashi', label: 'Find My Rashi', icon: Compass, category: 'AI Tools' },
    { id: 'astrology', label: 'Astro Navratna AI', icon: Sparkles, category: 'AI Tools' },
    { id: 'pricing', label: 'Price Estimation', icon: BarChart3, category: 'AI Tools' },
    { id: 'durability', label: 'Durability Physics', icon: Calculator, category: 'AI Tools' },
    { id: 'blockchain', label: 'Blockchain Certificates', icon: Award, category: 'Security' },
    { id: 'reports', label: 'Reports & History', icon: History, category: 'User' },
    { id: 'profile', label: 'User Profile', icon: UserIcon, category: 'User' },
    { id: 'notifications', label: 'Notifications', icon: Bell, category: 'User' },
    { id: 'settings', label: 'Settings', icon: Settings, category: 'System' }
  ];

  if (user?.role === 'Admin') {
    menuItems.push({ id: 'admin', label: 'Admin Portal Panel', icon: ShieldCheck, category: 'System' });
  }

  return (
    <aside className="w-64 bg-[#050505] border-r border-[#D4AF37]/20 flex flex-col justify-between h-[calc(100vh-61px)] sticky top-[61px] p-4 text-neutral-300 z-30 hidden md:flex">
      
      {/* Top Menu Items */}
      <div className="space-y-6 overflow-y-auto pr-1">
        
        {/* User Mini Profile Header */}
        {user && (
          <div className="p-3 rounded-2xl bg-[#0E0E12] border border-[#D4AF37]/30 flex items-center space-x-3">
            <img
              src={user.profilePicture}
              alt={user.fullName}
              className="w-10 h-10 rounded-xl object-cover border border-[#D4AF37]"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#FFF8E7] truncate">{user.fullName}</p>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="text-[9px] text-[#10B981] uppercase font-mono tracking-widest">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Categories */}
        {['Overview', 'AI Tools', 'Security', 'User', 'System'].map((cat) => {
          const items = menuItems.filter(m => m.category === cat);
          if (items.length === 0) return null;

          return (
            <div key={cat} className="space-y-1">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]/70 px-3 py-1">
                {cat}
              </p>

              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#D4AF37]/15 text-[#FFF8E7] border border-[#D4AF37]/40 shadow-sm shadow-[#D4AF37]/10 font-semibold'
                        : 'text-neutral-400 hover:text-[#D4AF37] hover:bg-[#121216]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-neutral-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          );
        })}

      </div>

      {/* Bottom Controls */}
      <div className="pt-4 border-t border-neutral-900 space-y-2">
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0E0E12] border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-all"
        >
          <div className="flex items-center space-x-2">
            {darkMode ? <Moon className="w-4 h-4 text-[#D4AF37]" /> : <Sun className="w-4 h-4 text-[#D4AF37]" />}
            <span>Dark Atmosphere</span>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1A1A22] text-[#D4AF37]">
            {darkMode ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Logout */}
        {user && (
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs text-rose-400 hover:bg-rose-950/20 hover:border-rose-900/40 border border-transparent transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        )}

      </div>

    </aside>
  );
};
