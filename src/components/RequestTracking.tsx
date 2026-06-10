import React, { useState } from 'react';
import { EmergencyRequest } from '../types';
import { ArrowLeft, Check, CheckCircle, Clock, MapPin, Phone, Hospital, AlertCircle, Map, Milestone, HeartHandshake } from 'lucide-react';

interface RequestTrackingProps {
  request: EmergencyRequest;
  onBack: () => void;
  onConfirmTimeline: (newStatus: 'confirmed' | 'completed') => void;
  assignedDonorInitial?: string;
  assignedDonorDistance?: string;
}

export default function RequestTracking({
  request,
  onBack,
  onConfirmTimeline,
  assignedDonorInitial = 'R.K.',
  assignedDonorDistance = '2.5 km',
}: RequestTrackingProps) {
  const [localStatus, setLocalStatus] = useState<typeof request.status>(request.status || 'accepted');

  const handleAdvance = () => {
    if (localStatus === 'accepted') {
      setLocalStatus('confirmed');
      onConfirmTimeline('confirmed');
      alert('Donor arrival logged! Timeline advanced to "Health Worker Confirmed" step.');
    } else if (localStatus === 'confirmed') {
      setLocalStatus('completed');
      onConfirmTimeline('completed');
      alert('Case finalized! Donation Completed has been logged. Case archived.');
    }
  };

  const getUrgencyText = () => {
    switch (request.urgency) {
      case 'critical':
        return 'Critical (Immediate)';
      case 'high':
        return 'High (Under 4 hours)';
      default:
        return 'Normal Routine';
    }
  };

  return (
    <div className="bg-brand-surface text-stone-900 font-sans min-h-screen pb-16 pt-16 flex flex-col antialiased animate-fade-in-up">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-white border-b border-brand-highest shadow-m3-1">
        <button 
          onClick={onBack}
          aria-label="Go back" 
          className="text-[#af101a] hover:bg-stone-50 transition-colors active:scale-95 duration-100 p-2 rounded-full h-10 w-10 flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-extrabold text-xl text-[#af101a] uppercase tracking-tight flex-1 text-center">BloodLink</h1>
        <div className="w-10 h-10"></div> {/* Spacer balance */}
      </header>

      {/* Main Content Layout */}
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-6">
        {/* Header telemetry info line */}
        <section className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-stone-800">
              Request ID: #{request.id || 'BL902'}
            </h2>
            <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-1 font-semibold">
              <Clock size={14} />
              Created Today, 09:42 AM
            </p>
          </div>
          
          <div className="bg-[#9df898] text-[#016619] px-4 py-2 border border-[#016619]/20 rounded-xl flex items-center gap-1.5 font-bold text-xs shadow-sm">
            <CheckCircle size={15} fill="#daffd1" />
            <span className="capitalize">{localStatus}</span>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Status Timeline Card */}
          <div className="md:col-span-7 bg-white rounded-2xl shadow-m3-1 border border-stone-100 p-6 flex flex-col h-full">
            <h3 className="font-extrabold text-sm text-stone-700 mb-6 border-b border-stone-150 pb-2 uppercase tracking-widest">
              Status Timeline
            </h3>
            
            <div className="relative pl-8 flex-grow flex flex-col justify-between gap-6 pb-2">
              {/* Vertical timeline line mapping */}
              <div className="absolute left-[9px] top-[14px] bottom-[14px] w-[2px] bg-stone-200 rounded-full"></div>
              
              {/* Colored active fill line mapping */}
              <div 
                className="absolute left-[9px] top-[14px] w-[2px] bg-[#016619] rounded-full transition-all duration-500" 
                style={{
                  height: localStatus === 'accepted' ? '40%' : localStatus === 'confirmed' ? '70%' : '100%'
                }}
              ></div>

              {/* Step 1: Created */}
              <div className="relative flex items-center group">
                <div className="absolute -left-[31px] w-5 h-5 rounded-full bg-[#016619] text-white flex items-center justify-center shadow-sm z-10">
                  <Check size={11} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-xs font-black text-stone-800">Request Created</p>
                  <p className="text-[10px] text-stone-400 font-bold mt-0.5">09:42 AM</p>
                </div>
              </div>

              {/* Step 2: Notified */}
              <div className="relative flex items-center group">
                <div className="absolute -left-[31px] w-5 h-5 rounded-full bg-[#016619] text-white flex items-center justify-center shadow-sm z-10">
                  <Check size={11} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-xs font-black text-stone-800">Donors Notified</p>
                  <p className="text-[10px] text-stone-400 font-bold mt-0.5">09:45 AM (12 notified)</p>
                </div>
              </div>

              {/* Step 3: Accepted */}
              <div className="relative flex items-center group">
                <div className={`absolute -left-[31px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm z-10 ${
                  ['accepted', 'confirmed', 'completed'].includes(localStatus) 
                    ? 'bg-[#016619] text-white ring-4 ring-[#9df898]/40' 
                    : 'bg-stone-200 text-stone-400'
                }`}>
                  {['accepted', 'confirmed', 'completed'].includes(localStatus) ? (
                    <Check size={11} strokeWidth={3} />
                  ) : (
                    <Clock size={11} />
                  )}
                </div>
                <div>
                  <p className={`text-xs font-black ${['accepted', 'confirmed', 'completed'].includes(localStatus) ? 'text-[#016619]' : 'text-stone-500'}`}>
                    Donor Accepted
                  </p>
                  <p className="text-[10px] text-stone-400 font-bold mt-0.5">
                    10:15 AM - Donor ({assignedDonorInitial}) {assignedDonorDistance ? `is ${assignedDonorDistance} away` : 'en route'}
                  </p>
                </div>
              </div>

              {/* Step 4: Health Worker Confirmed */}
              <div className={`relative flex items-center group ${['confirmed', 'completed'].includes(localStatus) ? 'opacity-100' : 'opacity-65'}`}>
                <div className={`absolute -left-[31px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm z-10 ${
                  ['confirmed', 'completed'].includes(localStatus) 
                    ? 'bg-[#016619] text-white ring-4 ring-[#9df898]/40' 
                    : 'bg-stone-200 text-stone-400'
                }`}>
                  {['confirmed', 'completed'].includes(localStatus) ? <Check size={11} strokeWidth={3} /> : null}
                </div>
                <div>
                  <p className="text-xs font-black text-stone-800">Health Worker Confirmed</p>
                  <p className="text-[10px] text-stone-400 font-bold mt-0.5">
                    {['confirmed', 'completed'].includes(localStatus) ? 'Arrival validated at station' : 'Pending arrival of donor'}
                  </p>
                </div>
              </div>

              {/* Step 5: Donation Completed */}
              <div className={`relative flex items-center group ${localStatus === 'completed' ? 'opacity-100' : 'opacity-65'}`}>
                <div className={`absolute -left-[31px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm z-10 ${
                  localStatus === 'completed' 
                    ? 'bg-[#016619] text-white ring-4 ring-[#9df898]/10' 
                    : 'bg-stone-200 text-stone-400'
                }`}>
                  {localStatus === 'completed' ? <Check size={11} strokeWidth={3} /> : null}
                </div>
                <div>
                  <p className="text-xs font-black text-stone-800">Donation Completed</p>
                  <p className="text-[10px] text-stone-400 font-bold mt-0.5">
                    {localStatus === 'completed' ? 'Vials secured and verified' : 'Pending completion'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Stack */}
          <div className="md:col-span-5 flex flex-col gap-5 h-full">
            {/* Patient Info Card */}
            <div className="bg-white rounded-2xl shadow-m3-1 border border-stone-100 p-4">
              <h3 className="font-bold text-sm text-stone-700 mb-3 flex items-center gap-2">
                <HeartHandshake size={15} className="text-[#af101a]" />
                Patient Details
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <p className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Blood Type</p>
                  <p className="text-xl font-black text-[#af101a]">{request.bloodGroup}</p>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <p className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Units</p>
                  <p className="text-xl font-black text-stone-800">{request.units}</p>
                </div>
                <div className="col-span-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <p className="text-[9px] text-stone-500 font-bold uppercase tracking-widest font-bold">Urgency</p>
                  <p className="text-xs text-[#af101a] font-black flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} fill="#ffdad6" />
                    {getUrgencyText()}
                  </p>
                </div>
              </div>
            </div>

            {/* Hospital & Map Container Card */}
            <div className="bg-white rounded-2xl shadow-m3-1 border border-stone-100 p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#0061a4] mb-3 flex items-center gap-1.5">
                  <Hospital size={16} />
                  Clinic Area
                </h3>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 mb-3">
                  <p className="text-xs font-black text-stone-800">{request.hospitalName}</p>
                  <p className="text-[10px] text-stone-400 font-bold mt-0.5">{request.location}</p>
                  
                  {/* Dynamic Radar Map Mock */}
                  <div className="h-28 rounded-lg bg-indigo-50/50 overflow-hidden relative border border-stone-150 mt-3 select-none">
                    <div className="absolute inset-0 bg-stone-100 flex flex-col items-center justify-center text-stone-400 scan-line">
                      <Map size={24} className="text-[#33a0fd] animate-pulse" />
                      <span className="text-[9px] font-bold text-[#0061a4] mt-1.5 uppercase tracking-widest">P2P RADAR FEED</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => alert(`Simulating phone link connection with Donor (${assignedDonorInitial}). GSM call trunk initializing.`)}
                className="w-full h-11 bg-[#33a0fd]/10 text-[#0061a4] hover:bg-[#33a0fd]/25 rounded-xl font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone size={14} fill="currentColor" />
                Contact Donor
              </button>
            </div>
          </div>

          {/* Emergency Action CTA */}
          <div className="md:col-span-12 mt-2">
            {localStatus !== 'completed' ? (
              <button 
                onClick={handleAdvance}
                className="w-full h-14 bg-[#af101a] text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest shadow-m3-2 hover:bg-[#af101a]/95 transition-all flex items-center justify-center gap-2 select-none"
              >
                <Milestone size={18} />
                <span>
                  {localStatus === 'accepted' ? 'Confirm Donor Arrival' : 'Confirm Donation Completed'}
                </span>
              </button>
            ) : (
              <div className="w-full bg-[#9df898]/20 border border-[#9df898] py-4 rounded-xl text-center text-sm font-bold text-[#016619]">
                🎉 Emergency Case Finalized as Completed & Archived
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
