import React, { useState } from 'react';
import { Menu, WifiOff, Users, CheckCircle, Droplet, CheckCheck, Download, Inbox, AlertTriangle, RefreshCw, Home, Heart, Radio, User } from 'lucide-react';
import { SystemAlert } from '../types';

interface AdminDashboardProps {
  onSelectRole: (role: any) => void;
  systemAlerts: SystemAlert[];
}

export default function AdminDashboard({ onSelectRole, systemAlerts }: AdminDashboardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('Report exported successfully! BloodLink district data is downloaded as BloodLink_District_Summary.csv.');
    }, 1500);
  };

  const handleViewFeedback = () => {
    alert(
      "Direct Patient Feedback Logs:\n\n" +
      "1. 'Quick response by station. R.K. arrived in 15 mins at Rural Center!' - Ward-4, Rural Health Center\n" +
      "2. 'The offline radio BLE sync saved my father at Kallur. No cell reception, but a local health worker synced O+ requested locally!' - Acceptor, Kallur Mandal\n" +
      "3. 'System makes tracking donor en route very accurate.' - Dr. Sharma"
    );
  };

  return (
    <div className="bg-brand-surface text-stone-900 font-sans min-h-screen pb-24 antialiased flex flex-col animate-fade-in-up">
      {/* TopAppBar */}
      <header className="bg-white text-[#af101a] border-b border-brand-highest h-14 w-full sticky top-0 z-50 flex justify-between items-center px-4 shadow-m3-1">
        <button 
          onClick={() => onSelectRole('selection')}
          className="text-stone-600 hover:bg-stone-50 transition-colors p-2 rounded-full flex items-center justify-center h-10 w-10 text-[#af101a]"
          title="Menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-extrabold text-xl uppercase tracking-tight">BloodLink</h1>
        <button 
          onClick={() => onSelectRole('offline_dashboard')}
          className="text-stone-600 hover:bg-stone-50 transition-colors p-2 rounded-full flex items-center justify-center h-10 w-10 pointer-events-none"
        >
          <WifiOff size={20} />
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="px-4 py-6 max-w-xl mx-auto w-full flex-grow space-y-6">
        {/* Header Section */}
        <section>
          <h2 className="text-2xl font-extrabold text-stone-800">Admin Overview</h2>
          <p className="text-xs text-stone-500 mt-1 font-bold">System status and key metrics.</p>
        </section>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-2 gap-4">
          {/* Total Donors */}
          <div className="bg-white rounded-2xl p-4 flex flex-col justify-between aspect-square border border-brand-highest shadow-m3-1">
            <div className="bg-[#d1e4ff] text-[#0061a4] p-2.5 rounded-xl w-fit">
              <Users size={20} />
            </div>
            <div className="mt-auto">
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Total Donors</p>
              <p className="text-2xl font-black text-stone-850 mt-1">1,240</p>
            </div>
          </div>

          {/* Active Donors */}
          <div className="bg-white rounded-2xl p-4 flex flex-col justify-between aspect-square border border-brand-highest shadow-m3-1">
            <div className="bg-[#9df898] text-[#016619] p-2.5 rounded-xl w-fit">
              <CheckCircle size={20} fill="#daffd1" />
            </div>
            <div className="mt-auto">
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Active Donors</p>
              <p className="text-2xl font-black text-stone-850 mt-1">850</p>
            </div>
          </div>

          {/* Requests This Month */}
          <div className="bg-white rounded-2xl p-4 flex flex-col justify-between aspect-square border border-brand-highest shadow-m3-1">
            <div className="bg-[#ffdad6] text-[#af101a] p-2.5 rounded-xl w-fit">
              <Droplet size={20} fill="currentColor" />
            </div>
            <div className="mt-auto">
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Requests / Month</p>
              <p className="text-2xl font-black text-stone-850 mt-1">42</p>
            </div>
          </div>

          {/* Fulfilled */}
          <div className="bg-white rounded-2xl p-4 flex flex-col justify-between aspect-square border border-brand-highest shadow-m3-1">
            <div className="bg-stone-105 text-stone-700 p-2.5 rounded-xl w-fit bg-stone-100 border border-stone-200">
              <CheckCheck size={20} />
            </div>
            <div className="mt-auto">
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Fulfilled</p>
              <p className="text-2xl font-black text-stone-850 mt-1">38</p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col gap-3">
          <button 
            type="button"
            onClick={handleExport}
            disabled={downloading}
            className="bg-[#af101a] hover:bg-[#af101a]/95 text-white font-extrabold text-xs h-12 rounded-full flex items-center justify-center w-full shadow-m3-2 active:scale-95 transition-all uppercase tracking-wider gap-2 select-none"
          >
            {downloading ? <RefreshCw className="animate-spin" size={16} /> : <Download size={16} />}
            <span>{downloading ? 'Compiling Report...' : 'Export District Report'}</span>
          </button>
          <button 
            type="button"
            onClick={handleViewFeedback}
            className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-extrabold text-xs h-12 rounded-full flex items-center justify-center w-full active:scale-95 transition-all uppercase tracking-wider gap-2 select-none"
          >
            <Inbox size={16} />
            <span>View Direct Feedback</span>
          </button>
        </section>

        {/* Recent System Alerts */}
        <section className="pt-2">
          <h3 className="text-sm font-extrabold text-stone-800 mb-4 uppercase tracking-wider">Recent System Alerts</h3>
          <div className="flex flex-col gap-3">
            {systemAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`rounded-2xl p-4 flex items-start gap-3 border ${
                  alert.type === 'urgent_low_stock' 
                    ? 'bg-[#FFF0F0] border-[#af101a]/20 text-[#af101a]' 
                    : 'bg-white border-brand-highest text-stone-800'
                }`}
              >
                {alert.type === 'urgent_low_stock' ? (
                  <AlertTriangle size={18} className="shrink-0 mt-0.5 animate-bounce" fill="#ffdad6" />
                ) : (
                  <RefreshCw size={18} className="shrink-0 mt-0.5 text-[#0061a4]" />
                )}
                <div>
                  <p className="font-extrabold text-sm text-stone-900 leading-none">{alert.title}</p>
                  <p className="text-xs text-stone-500 mt-2 font-medium leading-relaxed leading-normal">{alert.description}</p>
                  <p className="text-[10px] text-stone-400 font-bold mt-2 hover:underline">{alert.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-1 py-1 bg-white border-t border-brand-highest shadow-m3-2">
        <button 
          onClick={() => onSelectRole('donor_home')}
          className="flex flex-col items-center justify-center text-stone-500 hover:text-[#af101a] p-2 rounded-xl min-w-[64px]"
        >
          <Home size={18} />
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </button>
        <button 
          onClick={() => onSelectRole('acceptor_create')}
          className="flex flex-col items-center justify-center text-[#af101a] p-2 rounded-xl min-w-[64px]"
        >
          <Heart size={18} fill="#af101a" />
          <span className="text-[10px] font-black mt-0.5">Requests</span>
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
