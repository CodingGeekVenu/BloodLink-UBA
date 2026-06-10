import React, { useState } from 'react';
import { DonorInfo, EmergencyRequest } from '../types';
import { Menu, WifiOff, Droplet, Calendar, Bell, Edit2, History, Home, Heart, Users, Radio, User, BookOpen } from 'lucide-react';

interface DonorHomeProps {
  donor: DonorInfo;
  activeRequests: EmergencyRequest[];
  onUpdateProfile: () => void;
  onSelectRole: (role: any) => void;
  onViewRequest: (request: EmergencyRequest) => void;
  onToggleAvailability: (available: boolean) => void;
}

export default function DonorHome({
  donor,
  activeRequests,
  onUpdateProfile,
  onSelectRole,
  onViewRequest,
  onToggleAvailability,
}: DonorHomeProps) {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Default simulated alert if no real active requests
  const mainAlert = activeRequests.find(r => r.status !== 'completed') || {
    id: '#BL902',
    bloodGroup: donor.bloodGroup,
    units: 2,
    urgency: 'high',
    hospitalName: 'Rural Health Center, Block C',
    location: 'Ward 4, Bed 12',
    requiredTime: 'Under 4 hours',
    doctorVerified: true,
    status: 'accepted',
    createdAt: 'Today, 09:42 AM',
  };

  const formattedDonationDate = donor.lastDonationDate 
    ? new Date(donor.lastDonationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Never donated';

  return (
    <div className="bg-brand-surface text-stone-900 font-sans min-h-screen pb-24 pt-16 flex flex-col antialiased animate-fade-in-up">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-white border-b border-brand-highest shadow-m3-1">
        <button 
          onClick={() => onSelectRole('selection')}
          className="text-[#af101a] hover:bg-stone-100 transition-colors active:scale-95 duration-100 p-2 rounded-full flex items-center justify-center h-10 w-10"
          title="Switch Roles"
        >
          <Menu size={22} />
        </button>
        <h1 className="font-extrabold text-xl text-[#af101a] tracking-tight uppercase">BloodLink</h1>
        <button 
          onClick={() => onSelectRole('offline_dashboard')}
          className="text-[#0061a4] hover:bg-stone-50 transition-colors p-2 rounded-full flex items-center justify-center h-10 w-10"
          title="View Offline Sync"
        >
          <WifiOff size={22} className="text-[#0061a4]" />
        </button>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-6 w-full">
        {/* Welcome & Availability Toggle */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-5 rounded-2xl shadow-m3-1 border border-stone-100 gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-stone-800">Welcome back, {donor.fullName}</h2>
            <p className="text-xs text-stone-500 mt-0.5">Manage your status and availability.</p>
          </div>
          <div className="flex items-center gap-3 bg-stone-50 px-3 py-2 rounded-xl border border-stone-100 w-fit self-end sm:self-auto">
            <span className={`text-xs font-bold ${donor.available ? 'text-[#016619]' : 'text-stone-500'}`}>
              {donor.available ? 'Available' : 'Unavailable'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={donor.available}
                onChange={(e) => onToggleAvailability(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#016619]"></div>
            </label>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5">
          {/* Blood Info Card */}
          <section className="bg-white p-5 rounded-2xl shadow-m3-1 border border-stone-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Droplet size={140} className="text-[#af101a]" fill="currentColor" strokeWidth={0.5} />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#af101a] p-2 bg-[#ffdad6] rounded-full">
                  <Droplet size={20} fill="currentColor" />
                </span>
                <h3 className="text-md font-bold text-stone-700">My Blood Group</h3>
              </div>
              <div className="text-5xl font-black text-[#af101a] leading-none tracking-tight">
                {donor.bloodGroup}
              </div>
              <div className="flex items-center gap-2 text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100 w-fit">
                <Calendar size={14} className="text-stone-400" />
                <span className="text-xs font-bold">Last Donation: {formattedDonationDate}</span>
              </div>
            </div>
          </section>

          {/* Emergency Alerts */}
          <section className="bg-[#FFF0F0] border-2 border-[#af101a] p-5 rounded-2xl shadow-m3-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#af101a]/5 rounded-bl-full"></div>
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-[#af101a] animate-bounce" fill="currentColor" />
                <h3 className="text-md font-extrabold text-[#af101a]">Emergency Alerts</h3>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-m3-1 border border-[#ffdad6] flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-stone-800">1 Active Request</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {mainAlert.bloodGroup} needed at {mainAlert.hospitalName}
                  </p>
                </div>
                <button 
                  onClick={() => onViewRequest(mainAlert as EmergencyRequest)}
                  className="bg-[#af101a] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-[#af101a]/95 transition-all active:scale-95 shrink-0"
                >
                  View
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <section className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
          <button 
            onClick={onUpdateProfile}
            className="border border-brand-outline/30 text-[#af101a] bg-white font-bold text-xs px-5 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors active:scale-95 w-full shadow-m3-1"
          >
            <Edit2 size={14} />
            Update Profile
          </button>
          <button 
            onClick={() => setIsHistoryModalOpen(true)}
            className="text-[#af101a] bg-[#ffdad6]/40 font-bold text-xs px-5 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#ffdad6]/60 transition-colors active:scale-95 w-full"
          >
            <History size={14} />
            View Donation History
          </button>
        </section>
      </main>

      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center p-4 z-50 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-m3-3 p-6 max-w-sm w-full space-y-4">
            <h3 className="font-extrabold text-lg text-[#af101a]">Donation Record</h3>
            <div className="border-t border-stone-100 pt-3 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-stone-500">12 Jan 2024</span>
                <span className="font-bold text-[#016619]">A+ Recipient (Rural Sync)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-stone-500">15 Aug 2023</span>
                <span className="font-bold text-[#016619]">Mobile Drive camp</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-stone-500">22 Mar 2023</span>
                <span className="font-bold text-stone-500">Routine Check-Up Donation</span>
              </div>
            </div>
            <button
              onClick={() => setIsHistoryModalOpen(false)}
              className="w-full py-2 bg-[#af101a] text-white font-bold rounded-xl text-xs hover:bg-[#af101a]/90 transition-all"
            >
              Close History
            </button>
          </div>
        </div>
      )}

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-1 py-1 bg-white border-t border-brand-highest shadow-m3-2">
        <button 
          onClick={() => onSelectRole('donor_home')}
          className="flex flex-col items-center justify-center text-[#af101a] p-2 rounded-xl min-w-[64px]"
        >
          <Home size={18} fill="#af101a" />
          <span className="text-[10px] font-black mt-0.5">Home</span>
        </button>
        <button 
          onClick={() => onSelectRole('acceptor_create')}
          className="flex flex-col items-center justify-center text-stone-500 hover:text-[#af101a] p-2 rounded-xl min-w-[64px]"
        >
          <Heart size={18} />
          <span className="text-[10px] font-bold mt-0.5">Requests</span>
        </button>
        <button 
          onClick={() => onSelectRole('hw_dashboard')}
          className="flex flex-col items-center justify-center text-stone-500 hover:text-[#af101a] p-2 rounded-xl min-w-[64px]"
        >
          <Users size={18} />
          <span className="text-[10px] font-bold mt-0.5">Donors</span>
        </button>
        <button 
          onClick={() => onSelectRole('offline_dashboard')}
          className="flex flex-col items-center justify-center text-stone-500 hover:text-[#af101a] p-2 rounded-xl min-w-[64px]"
        >
          <Radio size={18} />
          <span className="text-[10px] font-bold mt-0.5">Offline</span>
        </button>
        <button 
          onClick={() => onSelectRole('selection')}
          className="flex flex-col items-center justify-center text-stone-500 hover:text-[#af101a] p-2 rounded-xl min-w-[64px]"
        >
          <User size={18} />
          <span className="text-[10px] font-bold mt-0.5">Role Menu</span>
        </button>
      </nav>
    </div>
  );
}
