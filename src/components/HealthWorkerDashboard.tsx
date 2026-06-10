import React from 'react';
import { EmergencyRequest, ActivityLog } from '../types';
import { Menu, WifiOff, Plus, HeartPulse, Sparkles, Droplet, UserCheck, Bluetooth, ChevronRight, Activity, Users, ShieldAlert, CheckCircle, UserPlus, Home, Heart, Radio, User } from 'lucide-react';

interface HealthWorkerDashboardProps {
  activeRequests: EmergencyRequest[];
  activityLogs: ActivityLog[];
  onSelectRequest: (request: EmergencyRequest) => void;
  onNewEmergency: () => void;
  onSelectRole: (role: any) => void;
  isOfflineMode: boolean;
}

export default function HealthWorkerDashboard({
  activeRequests,
  activityLogs,
  onSelectRequest,
  onNewEmergency,
  onSelectRole,
  isOfflineMode,
}: HealthWorkerDashboardProps) {
  // Find requests matching
  const urgentCount = activeRequests.filter(r => r.status !== 'completed').length || 3;

  // Let's create a placeholder request if none exist, so there is always a card to tap on
  const mainRequest = activeRequests[0] || {
    id: '#BL902',
    bloodGroup: 'O+',
    units: 2,
    urgency: 'high',
    hospitalName: 'Rural Health Center, Block C',
    location: 'Ward 4, Bed 12',
    requiredTime: 'Under 4 hours',
    status: 'accepted',
    doctorVerified: true,
    createdAt: 'Today, 09:42 AM',
  };

  return (
    <div className="bg-brand-surface text-stone-900 font-sans min-h-screen pb-24 md:pb-6 flex flex-col antialiased animate-fade-in-up">
      {/* TopAppBar */}
      <header className="bg-white text-[#af101a] border-b border-brand-highest h-14 w-full z-45 sticky top-0 flex justify-between items-center px-4 shadow-m3-1">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSelectRole('selection')}
            className="text-stone-600 hover:bg-stone-50 transition-colors p-2 rounded-full flex items-center justify-center h-10 w-10 md:hidden"
            title="Menu"
          >
            <Menu size={20} />
          </button>
          <span className="font-extrabold text-xl uppercase tracking-tight">BloodLink</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSelectRole('offline_dashboard')}
            className="text-stone-600 hover:bg-stone-50 transition-colors p-2 rounded-full flex items-center justify-center h-10 w-10"
            title="Connectivity status"
          >
            <WifiOff size={20} className={isOfflineMode ? "text-[#0061a4]" : ""} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* NavigationDrawer - Web / Large Devices Sidebar (Screen 8) */}
        <aside className="bg-white text-stone-800 border-r border-brand-highest h-auto w-80 shadow-m3-1 hidden md:flex flex-col p-5 sticky top-14 self-start space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-stone-100">
            <img 
              alt="User profile" 
              className="w-12 h-12 rounded-full object-cover border-2 border-[#af101a]/30 shadow-sm" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASHXTOp3xl_r2hsbctEkO0IZ8W6PPzehWbfD2UqVolbBwU-F6RUyQwurXZelq0RCxJcaVu8ZEZd0o34e0Xslu5xlK_m2msXPKzmnbMQNJeUv_6NN0UYodR6-98qSb3xriTDLzD0xuY_AJWhE52X3tgjakOyVY5IODs8-fKBJzJt0EfJw2DLO-UnSGrI-F5akKjApBKbjCVXCKwrUE1ecx4JZ8co5O9nj4srGlM6VKNn7i543ZdT4IvOXBgnBLAsSDsurEOYao6cbXT" 
            />
            <div>
              <div className="font-extrabold text-sm text-stone-800">Dr. Sharma</div>
              <div className="text-xs text-stone-500 font-mono">ID: BL-4902</div>
              <div className="text-[10px] bg-[#016619]/10 text-[#016619] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 mt-1 border border-[#016619]/20 w-fit">
                <Sparkles size={8} fill="currentColor" />
                Verified Main Hub
              </div>
            </div>
          </div>
          
          <nav className="flex-grow space-y-1.5 text-sm font-bold text-stone-600">
            <button 
              onClick={() => onSelectRole('selection')}
              className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 hover:text-[#af101a] transition-all rounded-xl w-full text-left"
            >
              <HeartPulse size={18} />
              <span>Shift Primary Role</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 hover:text-[#af101a] transition-all rounded-xl w-full text-left">
              <ChevronRight size={18} className="text-stone-400" />
              <span>History Archive</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 hover:text-[#af101a] transition-all rounded-xl w-full text-left">
              <ChevronRight size={18} className="text-stone-400" />
              <span>Settings Portal</span>
            </button>
          </nav>

          <div className="p-4 bg-stone-50 border border-stone-100 rounded-2xl text-[11px] text-stone-500 font-medium">
            <span className="font-bold text-stone-700 block mb-1">Emergency Guild</span>
            Follow standard clinic guidelines prior to releasing verified emergency sync.
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-grow p-4 md:p-6 w-full max-w-4xl">
          {/* Welcome Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-stone-800">Welcome, Dr. Sharma</h1>
            <p className="text-xs text-stone-500 font-bold mt-1">Kurnool District Main Hub</p>
          </div>

          {/* Conditional Offline mode alert indicator bar */}
          {isOfflineMode && (
            <div className="bg-[#d1e4ff] text-[#001d36] p-4 rounded-xl mb-6 flex items-start gap-3 border border-[#9ecaff]">
              <Bluetooth size={20} className="text-[#0061a4] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-xs">Offline Mode Active</h3>
                <p className="text-[11px] text-[#001d36]/80 mt-1 font-semibold leading-relaxed">
                  Rural connection system active. Sync logs are being saved to your local device memory layout. They will automatically sync with BloodLink central main database once network service connects.
                </p>
              </div>
            </div>
          )}

          {/* Bento Grid Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Active Requests Card */}
            <div 
              onClick={() => onSelectRequest(mainRequest as EmergencyRequest)}
              className="bg-[#af101a] text-white rounded-2xl p-6 relative overflow-hidden group hover:shadow-m3-2 transition-all active:scale-95 duration-100 sm:col-span-2 row-span-2 min-h-[200px] flex flex-col justify-between cursor-pointer"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-10 group-hover:scale-110 transition-transform duration-500 text-white">
                <Droplet size={140} fill="currentColor" strokeWidth={0.5} />
              </div>
              <div className="relative z-10 flex justify-between items-start">
                <Activity size={32} />
                <div className="bg-white text-[#af101a] px-3 py-1 rounded-full font-black text-xs flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#af101a] animate-ping"></span>
                  Urgent
                </div>
              </div>
              <div className="relative z-10 mt-6">
                <div className="text-4xl font-extrabold">{urgentCount}</div>
                <div className="text-sm font-black mt-1">Active Requests</div>
                <p className="text-xs mt-2 opacity-90 font-medium max-w-[80%] leading-normal">
                  {activeRequests.length > 0 
                    ? `${activeRequests[0].bloodGroup} needed at ${activeRequests[0].hospitalName}.`
                    : 'O- and B+ required immediately at City General Hospital.'}
                </p>
              </div>
            </div>

            {/* Verified Donors Metric Card */}
            <div className="bg-white border border-brand-highest rounded-2xl p-4 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-stone-50 transition-colors active:scale-95 min-h-[140px] shadow-m3-1">
              <Users size={32} className="text-[#016619] mb-2" />
              <div className="text-2xl font-black text-stone-800">124</div>
              <div className="text-xs text-stone-500 font-bold mt-1">Verified Donors</div>
            </div>

            {/* Pending Verifications Card */}
            <div className="bg-white border border-brand-highest rounded-2xl p-4 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-stone-50 transition-colors active:scale-95 min-h-[140px] shadow-m3-1">
              <UserCheck size={32} className="text-[#0061a4] mb-2" />
              <div className="text-2xl font-black text-stone-800">5</div>
              <div className="text-xs text-stone-500 font-bold mt-1">Pending Check</div>
            </div>

            {/* Offline Sync State tracker */}
            <div className="bg-stone-100 border border-brand-highest rounded-2xl p-4 flex flex-col justify-center items-center text-center hover:bg-stone-200/50 transition-colors active:scale-95 sm:col-span-2 min-h-[140px] shadow-m3-1">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Radio size={36} className="text-[#0061a4] animate-pulse" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0061a4] flex items-center justify-center text-[9px] text-white font-extrabold">1</span>
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm text-stone-800">Offline Sync</div>
                  <div className="text-xs font-semibold text-stone-500 mt-1">Waiting for connection...</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <section className="mt-6">
            <h2 className="text-md font-extrabold text-stone-800 mb-4 uppercase tracking-wider">Recent Activity</h2>
            <div className="bg-white border border-brand-highest rounded-2xl overflow-hidden shadow-m3-1">
              {/* Summary Header */}
              <div className="bg-stone-50 px-4 py-3 border-b border-brand-highest flex justify-between items-center">
                <span className="font-black text-xs text-stone-700">Completed Cases: 45</span>
                <span className="font-bold text-xs text-[#af101a] cursor-not-allowed uppercase tracking-wider">View All</span>
              </div>
              
              {/* Activity List */}
              <div className="divide-y divide-stone-100">
                {activityLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="p-4 flex items-start gap-3 hover:bg-stone-50/55 transition-colors cursor-pointer active:scale-[0.99]"
                  >
                    <div className={`rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-0.5 ${
                      log.type === 'donation_completed' 
                        ? 'bg-[#9df898] text-[#016619]' 
                        : 'bg-[#d1e4ff] text-[#0061a4]'
                    }`}>
                      {log.type === 'donation_completed' ? <CheckCircle size={18} /> : <UserPlus size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="font-bold text-sm text-stone-800 truncate">{log.title}</div>
                        <div className="text-[10px] text-stone-400 font-bold shrink-0">{log.timeAgo}</div>
                      </div>
                      <div className="text-xs text-stone-500 mt-1 leading-normal">{log.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Emergency FAB Button */}
          <button 
            onClick={onNewEmergency}
            aria-label="New Emergency Request" 
            className="fixed bottom-[88px] right-4 md:bottom-8 md:right-8 bg-[#af101a] hover:bg-[#af101a]/90 text-white w-14 h-14 rounded-2xl shadow-m3-3 flex items-center justify-center active:scale-90 z-40 transition-transform"
          >
            <Plus size={28} />
          </button>
        </main>
      </div>

      {/* BottomNavBar - Standard Mobile Drawer support (Screen 8) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-1 py-1 bg-white border-t border-brand-highest shadow-m3-2 md:hidden">
        <button 
          onClick={() => onSelectRole('donor_home')}
          className="flex flex-col items-center justify-center text-stone-500 hover:text-[#af101a] p-2 rounded-xl min-w-[64px]"
        >
          <Home size={18} />
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </button>
        <button 
          onClick={() => onSelectRole('acceptor_create')}
          className="flex flex-col items-center justify-center text-stone-500 hover:text-[#af101a] p-1.5 rounded-xl min-w-[64px]"
        >
          <Heart size={18} />
          <span className="text-[10px] font-bold mt-0.5">Requests</span>
        </button>
        <button 
          onClick={() => onSelectRole('hw_dashboard')}
          className="flex flex-col items-center justify-center text-[#af101a] p-1.5 rounded-xl min-w-[64px]"
        >
          <Users size={18} fill="#af101a" />
          <span className="text-[10px] font-black mt-0.5">Donors</span>
        </button>
        <button 
          onClick={() => onSelectRole('offline_dashboard')}
          className="flex flex-col items-center justify-center text-stone-500 hover:text-[#af101a] p-1.5 rounded-xl min-w-[64px]"
        >
          <Radio size={18} />
          <span className="text-[10px] font-bold mt-0.5">Offline</span>
        </button>
        <button 
          onClick={() => onSelectRole('selection')}
          className="flex flex-col items-center justify-center text-stone-500 hover:text-[#af101a] p-1.5 rounded-xl min-w-[64px]"
        >
          <User size={18} />
          <span className="text-[10px] font-bold mt-0.5">Role Menu</span>
        </button>
      </nav>
    </div>
  );
}
