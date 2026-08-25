import React, { useState } from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';
import { User } from '../types';

interface AdminPanelProps {
  adminUser: User;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ adminUser }) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'usr-admin-1',
      fullName: 'Dr. Evelyn Vance (Chief Gemologist)',
      email: 'admin@gemvault.ai',
      role: 'Admin',
      isVerified: true,
      twoFactorEnabled: true,
      createdAt: '2025-01-10T10:00:00Z'
    },
    {
      id: 'usr-researcher-1',
      fullName: 'Prof. Rajesh Sharma',
      email: 'researcher@gemvault.ai',
      role: 'Researcher',
      isVerified: true,
      createdAt: '2025-02-01T12:00:00Z'
    },
    {
      id: 'usr-jeweler-1',
      fullName: 'Aria Sterling',
      email: 'jeweler@gemvault.ai',
      role: 'Jeweler',
      isVerified: true,
      createdAt: '2025-02-15T09:30:00Z'
    },
    {
      id: 'usr-customer-1',
      fullName: 'Alexander Wright',
      email: 'customer@gemvault.ai',
      role: 'Customer',
      isVerified: true,
      createdAt: '2025-03-01T15:45:00Z'
    }
  ]);

  const handleRoleChange = (userId: string, newRole: any) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="p-6 rounded-2xl editorial-card border border-[#D4AF37]/30 shadow-2xl flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#FFF8E7]">
              Administrative Control & Governance Gateway
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Role-Based Access Control (RBAC), 2FA Security Enforcement & Protocol Node Configuration.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
          2FA Active
        </span>
      </div>

      {/* User Governance Table */}
      <div className="p-6 rounded-2xl bg-[#08080A] border border-neutral-800 shadow-xl space-y-4">
        <h3 className="text-base font-serif font-bold text-[#FFF8E7] flex items-center space-x-2">
          <UserCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>User Role & Privilege Management</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#050505] text-neutral-400 font-mono text-[10px] uppercase tracking-[0.15em] border-b border-neutral-800">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3">Verification</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#0B0B0E] transition-colors">
                  <td className="p-3 font-semibold text-[#FFF8E7]">{u.fullName}</td>
                  <td className="p-3 font-mono text-neutral-400">{u.email}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="px-2 py-1 rounded-lg bg-[#050505] border border-neutral-800 text-xs text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Jeweler">Jeweler</option>
                      <option value="Customer">Customer</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 uppercase">
                      Verified
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => alert(`Reset 2FA key initiated for ${u.email}`)}
                      className="text-[11px] text-[#D4AF37] hover:underline font-mono"
                    >
                      Reset 2FA Key
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
