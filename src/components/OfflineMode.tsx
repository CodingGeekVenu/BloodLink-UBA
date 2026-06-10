import React, { useState } from 'react';
import { WifiOff, Radio, CloudOff, Group, Save, CheckCircle, StopCircle, RefreshCw, Home, Heart, Users, User, Menu } from 'lucide-react';

interface OfflineModeProps {
  onSyncComplete: () => void;
  onSelectRole: (role: any) => void;
  pendingSyncCount: number;
}

export default function OfflineMode({ onSyncComplete, onSelectRole, pendingSyncCount }: OfflineModeProps) {
  const [broadcastOn, setBroadcastOn] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [localSavingMsgActive, setLocalSavingMsgActive] = useState(true);

  const handleRetrySync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      onSyncComplete();
      alert('Local caching synced! 1 emergency request has been safely uploaded to the central database, notifying Kurnool central main hub.');
    }, 1800);
  };

  return (
    <div className="bg-brand-surface text-stone-900 font-sans min-h-screen flex flex-col pb-24 antialiased animate-fade-in-up">
      {/* Offline Banner */}
      <div className="bg-[#0061a4] text-white flex items-center justify-center py-2.5 px-4 sticky top-0 z-45 shadow-sm">
        <CloudOff size={18} className="mr-2" />
        <span className="text-xs font-bold tracking-wider uppercase">
          No Internet – Offline Mode Active
        </span>
      </div>

      {/* TopAppBar */}
      <header className="bg-white text-[#af101a] border-b border-brand-highest sticky top-0 h-14 w-full z-40 flex justify-between items-center px-4 shadow-m3-1">
        <button 
          onClick={() => onSelectRole('selection')}
          className="text-stone-600 hover:bg-stone-50 transition-colors p-2 rounded-full flex items-center justify-center h-10 w-10"
        >
          <Menu size={20} />
        </button>
        <span className="font-extrabold text-xl uppercase tracking-tight">BloodLink</span>
        <button 
          onClick={() => onSelectRole('offline_dashboard')}
          className="text-[#0061a4] hover:bg-stone-50 transition-colors p-2 rounded-full flex items-center justify-center h-10 w-10"
        >
          <WifiOff size={20} />
        </button>
      </header>

      <main className="flex-grow px-4 py-6 flex flex-col gap-5 max-w-xl mx-auto w-full">
        {/* Status Card (Bento Style Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BLE Broadcast Status */}
          <div className="bg-white rounded-2xl border border-brand-highest p-6 shadow-m3-1 flex flex-col items-center justify-center text-center gap-4">
            <div className={`h-16 w-16 bg-[#d1e4ff] text-[#0061a4] rounded-full flex items-center justify-center relative z-10 ${
              broadcastOn ? 'animate-pulse' : ''
            }`}>
              {/* Pulsating back ring */}
              {broadcastOn && (
                <div className="absolute inset-0 bg-[#33a0fd]/20 rounded-full animate-ping pointer-events-none -z-10"></div>
              )}
              <Radio size={36} />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-md font-bold text-stone-800">
                BLE nearby broadcast {broadcastOn ? 'ON' : 'OFF'}
              </h2>
              <p className="text-xs text-stone-500 max-w-[200px] mx-auto">
                {broadcastOn 
                  ? 'Searching for local peer-to-peer radio connections.' 
                  : 'Broadcast transmitter silenced. Tap Start below to reactivate.'}
              </p>
            </div>
          </div>

          {/* Stats Stack */}
          <div className="flex flex-col gap-4">
            {/* Detected Donors Card */}
            <div className="bg-white rounded-xl p-4 border border-brand-highest flex items-center justify-between shadow-m3-1">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#9df898] text-[#016619] rounded-full flex items-center justify-center">
                  <Group size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nearby Donors</p>
                  <p className="text-lg font-black text-stone-800">3 Detected</p>
                </div>
              </div>
            </div>

            {/* Offline Saved Sync */}
            <div className="bg-white rounded-xl p-4 border border-brand-highest flex items-center justify-between shadow-m3-1">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-stone-100 text-stone-700 rounded-full flex items-center justify-center">
                  <Save size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Pending Sync</p>
                  <p className="text-lg font-black text-stone-800">{pendingSyncCount} Request</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Save Confirmation Message */}
        {localSavingMsgActive && (
          <div className="bg-[#016619]/5 border border-[#016619]/20 rounded-2xl p-4 flex items-start gap-3 mt-1 animate-fade-in-up">
            <CheckCircle size={22} className="text-[#016619] mt-0.5 shrink-0" fill="#daffd1" />
            <div className="space-y-1 flex-1">
              <h3 className="font-bold text-sm text-stone-800">Request saved locally</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Your blood request has been saved to your offline device memory cache. BloodLink will automatically notify nearby active units and upload files as soon as cellular service or internet is restored.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-end">
          <button 
            type="button"
            onClick={() => setBroadcastOn(!broadcastOn)}
            className="h-11 px-6 rounded-full border-2 border-brand-outline/35 text-stone-700 font-extrabold text-xs hover:bg-stone-50 transition-colors active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <StopCircle size={16} />
            {broadcastOn ? 'Stop Broadcast' : 'Start Broadcast'}
          </button>
          <button 
            type="button"
            onClick={handleRetrySync}
            disabled={syncing || pendingSyncCount === 0}
            className={`h-11 px-6 rounded-full font-extrabold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto ${
              syncing 
                ? 'bg-stone-400 text-stone-200 cursor-wait' 
                : pendingSyncCount === 0 
                  ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                  : 'bg-[#0061a4] text-white hover:bg-[#0061a4]/90 hover:shadow-m3-2'
            }`}
          >
            <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Synchronizing...' : 'Retry Sync'}
          </button>
        </div>
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
          className="flex flex-col items-center justify-center text-[#af101a] p-2 rounded-xl min-w-[64px]"
        >
          <Radio size={18} fill="#af101a" />
          <span className="text-[10px] font-black mt-0.5">Offline</span>
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
