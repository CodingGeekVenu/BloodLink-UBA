import React, { useState } from 'react';
import { EmergencyRequest, DonorInfo } from '../types';
import { ArrowLeft, WifiOff, Menu, Filter, Info, Phone, Bell, Home, Heart, Users, Radio, User, CheckCircle, MapPin } from 'lucide-react';

interface MatchingDonorsProps {
  request: EmergencyRequest;
  customDonors?: DonorInfo[]; // Registered donors that match
  onBack: () => void;
  onSelectDonor: (donorName: string, donorInitial: string, distance: string) => void;
  onSelectRole: (role: any) => void;
}

export default function MatchingDonors({
  request,
  customDonors = [],
  onBack,
  onSelectDonor,
  onSelectRole,
}: MatchingDonorsProps) {
  const [filterRadius, setFilterRadius] = useState<number>(10);
  const [notifiedDonors, setNotifiedDonors] = useState<string[]>([]);
  const [backupDonors, setBackupDonors] = useState<string[]>([]);

  // Base list of prefilled matching donors matching O+ (or other groups)
  const defaultDonors = [
    {
      id: 'd1',
      fullName: 'Rajesh Kumar',
      phone: '9848022338',
      bloodGroup: request.bloodGroup,
      age: 29,
      area: 'Kurnool Outskirts',
      consent: true,
      available: true,
      initials: 'R.K.',
      distance: '2.5 km',
      verified: true,
      lastDonatedText: 'Available',
    },
    {
      id: 'd2',
      fullName: 'Srinivas Murthy',
      phone: '9843321102',
      bloodGroup: request.bloodGroup,
      age: 34,
      area: 'Kallur Mandal',
      consent: true,
      available: false,
      initials: 'S.M.',
      distance: '4.1 km',
      verified: true,
      lastDonatedText: 'Last donated 2w ago',
    },
    {
      id: 'd3',
      fullName: 'Anjali J.',
      phone: '9440621289',
      bloodGroup: request.bloodGroup,
      age: 24,
      area: 'C-Camp Circle',
      consent: true,
      available: true,
      initials: 'A.J.',
      distance: '5.8 km',
      verified: false,
      lastDonatedText: 'Available',
    }
  ];

  // Merge registered user profile if their blood group fits
  const allDonors = [...defaultDonors];
  customDonors.forEach((cd) => {
    if (cd.bloodGroup === request.bloodGroup && cd.fullName) {
      const init = cd.fullName.split(' ').map(n => n[0]).join('.').toUpperCase();
      allDonors.unshift({
        id: cd.id,
        fullName: cd.fullName,
        phone: cd.phone,
        bloodGroup: cd.bloodGroup,
        age: cd.age,
        area: cd.area,
        consent: cd.consent,
        available: cd.available,
        initials: init || 'U.D.',
        distance: '0.8 km (You)',
        verified: true,
        lastDonatedText: cd.available ? 'Available' : 'Unavailable',
      });
    }
  });

  const handleNotify = (donorId: string, initial: string) => {
    if (notifiedDonors.includes(donorId)) return;
    setNotifiedDonors((prev) => [...prev, donorId]);
    alert(`Notification broadcast dispatched to Donor (${initial}). They will receive an SMS and push alert.`);
  };

  const handleBackup = (donorId: string, initial: string) => {
    if (backupDonors.includes(donorId)) {
      setBackupDonors((prev) => prev.filter(id => id !== donorId));
    } else {
      setBackupDonors((prev) => [...prev, donorId]);
      alert(`Donor (${initial}) marked as a secondary backup alternative.`);
    }
  };

  const handleConfirmDonor = (fullName: string, initials: string, distance: string) => {
    const confirm = window.confirm(`Assign Donor "${fullName}" (${initials}) to this emergency request? This will activate telemetry tracking.`);
    if (confirm) {
      onSelectDonor(fullName, initials, distance);
    }
  };

  return (
    <div className="bg-brand-surface text-stone-900 font-sans antialiased min-h-screen pb-24 flex flex-col animate-fade-in-up">
      {/* TopAppBar */}
      <header className="bg-white border-b border-brand-highest h-14 w-full sticky top-0 z-50 flex justify-between items-center px-4 shadow-m3-1">
        <div className="flex items-center gap-1">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-50 rounded-full active:scale-95 transition-all"
            title="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="font-extrabold text-xl text-[#af101a] uppercase tracking-tight">BloodLink</span>
        </div>
        <button 
          onClick={() => onSelectRole('offline_dashboard')}
          aria-label="Offline Mode status" 
          className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-50 rounded-full"
        >
          <WifiOff size={20} />
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="px-4 py-6 max-w-xl mx-auto w-full scan-line flex-grow">
        {/* Context Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-stone-800 flex items-center gap-2">
              Matching Donors 
            </h2>
            <span className="bg-[#ffdad6] text-[#af101a] px-3 py-1 rounded-full font-black text-xs inline-flex items-center">
              {request.bloodGroup}
            </span>
          </div>
          <button 
            onClick={() => {
              const r = prompt('Specify maximum search radial distance (km):', filterRadius.toString());
              if (r) setFilterRadius(Number(r));
            }}
            className="h-9 px-4 rounded-full border border-brand-outline/40 text-stone-700 font-bold text-xs flex items-center gap-1 bg-white hover:bg-stone-50 transition-colors"
          >
            <Filter size={14} />
            Filter ({filterRadius}km)
          </button>
        </div>

        {/* Info card of emergency context */}
        <div className="mb-5 bg-blue-50/50 border border-blue-100 p-3.5 rounded-2xl flex gap-3 text-xs text-[#0061a4] font-medium leading-normal">
          <Info size={18} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Broadcasting Active:</span> Dispatched urgent telemetry to nearby matching contacts. Select a donor to track their arrival at <span className="font-bold">{request.hospitalName}</span>.
          </div>
        </div>

        {/* Donor Cards List */}
        <div className="flex flex-col gap-4">
          {allDonors.map((donor) => {
            const isNotified = notifiedDonors.includes(donor.id);
            const isBackup = backupDonors.includes(donor.id);

            return (
              <article 
                key={donor.id}
                className={`bg-white rounded-2xl border border-brand-highest shadow-m3-1 p-4 flex flex-col gap-4 relative overflow-hidden transition-all ${
                  !donor.available ? 'opacity-70 saturate-50' : 'hover:border-[#af101a] hover:shadow-m3-2'
                }`}
              >
                {/* Visual Status Indicator Strip */}
                <div className={`absolute top-0 left-0 w-full h-1.5 ${donor.available ? 'bg-[#016619]' : 'bg-stone-300'}`}></div>

                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#d1e4ff] text-[#0061a4] flex items-center justify-center font-extrabold text-md shrink-0">
                      {donor.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-md font-extrabold text-stone-800">Initials: {donor.initials}</h3>
                        {donor.verified && (
                          <span className="text-[#0061a4] shrink-0" title="Verified Badge">
                            <CheckCircle size={15} fill="#d1e4ff" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500 font-semibold text-xs mt-1">
                        <span className="flex items-center gap-0.5"><MapPin size={12} /> {donor.distance}</span>
                        <span>•</span>
                        <span className={`flex items-center gap-1 font-bold ${donor.available ? 'text-[#016619]' : 'text-stone-500'}`}>
                          <span className={`w-2 h-2 rounded-full ${donor.available ? 'bg-[#016619]' : 'bg-stone-300'}`}></span>
                          {donor.lastDonatedText}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-100 rounded-xl px-3 py-1.5 flex flex-col items-center justify-center border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Group</span>
                    <span className="text-lg font-black text-[#af101a]">{donor.bloodGroup}</span>
                  </div>
                </div>

                {/* Actions Block */}
                <div className="flex items-center gap-2 mt-1 pt-3 border-t border-stone-100">
                  <button 
                    onClick={() => handleConfirmDonor(donor.fullName, donor.initials, donor.distance)}
                    disabled={!donor.available}
                    className={`flex-1 h-11 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs shadow-sm transition-all active:scale-95 ${
                      donor.available 
                        ? 'bg-[#af101a] text-white hover:bg-[#af101a]/90' 
                        : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <Phone size={14} fill="currentColor" />
                    Call
                  </button>

                  <button 
                    onClick={() => handleNotify(donor.id, donor.initials)}
                    disabled={!donor.available}
                    className={`flex-1 h-11 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs shadow-sm transition-all active:scale-95 ${
                      donor.available 
                        ? isNotified 
                          ? 'bg-[#016619]/15 text-[#016619] border border-[#016619]/30'
                          : 'bg-[#0061a4] text-white hover:bg-[#0061a4]/90' 
                        : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <Bell size={14} className={isNotified ? "" : "animate-bounce"} />
                    {isNotified ? 'Notified!' : 'Notify'}
                  </button>

                  <button 
                    onClick={() => handleBackup(donor.id, donor.initials)}
                    className={`px-3 h-11 border border-brand-outline/40 rounded-xl flex items-center justify-center font-bold text-xs transition-all active:scale-95 whitespace-nowrap ${
                      isBackup ? 'bg-stone-700 text-white border-stone-700' : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {isBackup ? 'Backup Active' : 'Mark as Backup'}
                  </button>
                </div>
              </article>
            );
          })}
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
