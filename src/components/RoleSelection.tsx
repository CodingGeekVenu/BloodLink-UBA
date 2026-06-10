import React from 'react';
import { AppRole } from '../types';
import { Droplet, User, HeartPulse, Shield, ShieldAlert } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: AppRole) => void;
  isRegistered: boolean;
}

export default function RoleSelection({ onSelectRole, isRegistered }: RoleSelectionProps) {
  return (
    <div className="bg-brand-surface min-h-screen flex flex-col font-sans select-none animate-fade-in-up">
      {/* TopAppBar */}
      <header className="bg-white text-[#af101a] border-b border-brand-highest flex justify-between items-center px-4 h-14 w-full z-50 shadow-m3-1 sticky top-0">
        <div className="font-extrabold text-xl tracking-tight uppercase">
          BloodLink
        </div>
        <div className="text-xs text-stone-500 font-medium">Rural Synergy Portal</div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 w-full max-w-4xl mx-auto">
        <div className="text-center mb-10 max-w-md">
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 mb-2">
            Continue as
          </h1>
          <p className="text-stone-500 text-sm">
            Select your primary role to customize your dashboard and features.
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          {/* Card 1: Donor */}
          <button
            onClick={() => onSelectRole(isRegistered ? 'donor_home' : 'donor_register')}
            className="group flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white border border-brand-highest hover:border-[#af101a] hover:bg-stone-50 transition-all duration-200 min-h-[160px] active:scale-95 shadow-m3-1 hover:shadow-m3-2 focus:outline-none focus:ring-2 focus:ring-[#af101a]"
            id="role-donor"
          >
            <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#af101a] flex items-center justify-center mb-3 group-hover:bg-[#af101a] group-hover:text-white transition-colors duration-200 shadow-sm">
              <Droplet size={32} fill="currentColor" />
            </div>
            <h2 className="text-lg font-bold text-stone-800">Donor</h2>
            {isRegistered && (
              <span className="text-[11px] bg-[#016619]/10 text-[#016619] px-2 py-0.5 rounded-full font-bold mt-1">
                Registered Profile Active
              </span>
            )}
          </button>

          {/* Card 2: Acceptor / Patient Family */}
          <button
            onClick={() => onSelectRole('acceptor_create')}
            className="group flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white border border-brand-highest hover:border-[#0061a4] hover:bg-stone-50 transition-all duration-200 min-h-[160px] active:scale-95 shadow-m3-1 hover:shadow-m3-2 focus:outline-none focus:ring-2 focus:ring-[#0061a4]"
            id="role-acceptor"
          >
            <div className="w-16 h-16 rounded-full bg-[#d1e4ff] text-[#0061a4] flex items-center justify-center mb-3 group-hover:bg-[#0061a4] group-hover:text-white transition-colors duration-200 shadow-sm">
              <User size={32} />
            </div>
            <h2 className="text-lg font-bold text-stone-800">Acceptor / Patient Family</h2>
          </button>

          {/* Card 3: Health Worker */}
          <button
            onClick={() => onSelectRole('hw_dashboard')}
            className="group flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white border border-brand-highest hover:border-[#016619] hover:bg-stone-50 transition-all duration-200 min-h-[160px] active:scale-95 shadow-m3-1 hover:shadow-m3-2 focus:outline-none focus:ring-2 focus:ring-[#016619]"
            id="role-healthworker"
          >
            <div className="w-16 h-16 rounded-full bg-[#9df898] text-[#016619] flex items-center justify-center mb-3 group-hover:bg-[#016619] group-hover:text-white transition-colors duration-200 shadow-sm">
              <HeartPulse size={32} />
            </div>
            <h2 className="text-lg font-bold text-stone-800">Health Worker / Hospital Staff</h2>
          </button>

          {/* Card 4: Admin */}
          <button
            onClick={() => onSelectRole('admin_dashboard')}
            className="group flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white border border-brand-highest hover:border-stone-700 hover:bg-stone-50 transition-all duration-200 min-h-[160px] active:scale-95 shadow-m3-1 hover:shadow-m3-2 focus:outline-none focus:ring-2 focus:ring-stone-700"
            id="role-admin"
          >
            <div className="w-16 h-16 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center mb-3 group-hover:bg-stone-700 group-hover:text-white transition-colors duration-200 shadow-sm">
              <Shield size={32} />
            </div>
            <h2 className="text-lg font-bold text-stone-800">Admin</h2>
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-[#0061a4] font-medium text-sm">
          <ShieldAlert size={16} />
          <p>Verified emergency blood coordination.</p>
        </div>
      </main>
    </div>
  );
}
