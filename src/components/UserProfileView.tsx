import React from 'react';
import { User, Calendar, Weight, Briefcase, Heart, DollarSign, CheckCircle2, Mail, Phone, Globe } from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileViewProps {
  user: UserType | null;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="py-20 text-center text-neutral-400 space-y-3">
        <User className="w-12 h-12 mx-auto text-neutral-600" />
        <p className="text-xs sm:text-sm">Please sign in to view your complete profile and saved gemstone reports.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Profile Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl editorial-card border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        
        <img
          src={user.profilePicture}
          alt={user.fullName}
          className="w-28 h-28 rounded-2xl object-cover border-2 border-[#D4AF37]/80 shadow-xl flex-shrink-0"
        />

        <div className="space-y-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 uppercase">
              {user.role}
            </span>
            {user.isVerified && (
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] font-semibold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center space-x-1 uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Verified Collector</span>
              </span>
            )}
          </div>

          <h2 className="text-3xl font-serif font-bold text-[#FFF8E7]">{user.fullName}</h2>
          <p className="text-xs text-neutral-400 flex items-center justify-center md:justify-start space-x-2 font-mono">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{user.email}</span>
            {user.phoneNumber && (
              <>
                <span>•</span>
                <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{user.phoneNumber}</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Profile Attributes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        <div className="p-4 rounded-2xl bg-[#08080A] border border-neutral-800 space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4AF37]">
            <Calendar className="w-4 h-4" />
            <span>Date of Birth</span>
          </div>
          <p className="text-sm font-semibold text-neutral-200">{user.dob || '1995-06-15'}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08080A] border border-neutral-800 space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#10B981]">
            <Weight className="w-4 h-4" />
            <span>Body Weight (Kg)</span>
          </div>
          <p className="text-sm font-semibold text-neutral-200">{user.bodyWeightKg ? `${user.bodyWeightKg} kg` : '72 kg'}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08080A] border border-neutral-800 space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4AF37]">
            <Briefcase className="w-4 h-4" />
            <span>Profession</span>
          </div>
          <p className="text-sm font-semibold text-neutral-200">{user.profession || 'Software Executive'}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08080A] border border-neutral-800 space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#10B981]">
            <Globe className="w-4 h-4" />
            <span>Location</span>
          </div>
          <p className="text-sm font-semibold text-neutral-200">{user.country || 'United States'}, {user.state || 'California'}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08080A] border border-neutral-800 space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4AF37]">
            <Heart className="w-4 h-4" />
            <span>Health Goal</span>
          </div>
          <p className="text-sm font-semibold text-neutral-200">{user.healthGoal || 'Vitality & Focus'}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08080A] border border-neutral-800 space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#10B981]">
            <DollarSign className="w-4 h-4" />
            <span>Financial Goal</span>
          </div>
          <p className="text-sm font-semibold text-neutral-200">{user.financialGoal || 'Wealth Preservation'}</p>
        </div>

      </div>

    </div>
  );
};
