import React, { useState } from 'react';
import { EmergencyRequest } from '../types';
import { Menu, WifiOff, Droplet, Clock, Hospital, MapPin, ShieldCheck, Heart, Users, Radio, User, Home } from 'lucide-react';

interface CreateRequestProps {
  onBack: () => void;
  onSubmit: (request: Omit<EmergencyRequest, 'id' | 'status' | 'createdAt'>, dispatchType: 'broadcast' | 'offline') => void;
  onSelectRole: (role: any) => void;
}

export default function CreateRequest({ onBack, onSubmit, onSelectRole }: CreateRequestProps) {
  const [bloodGroup, setBloodGroup] = useState('');
  const [units, setUnits] = useState<number | ''>('');
  const [urgency, setUrgency] = useState<'critical' | 'high' | 'normal'>('critical');
  const [hospitalName, setHospitalName] = useState('');
  const [location, setLocation] = useState('');
  const [requiredTime, setRequiredTime] = useState('');
  const [doctorVerified, setDoctorVerified] = useState(false);
  const [hwId, setHwId] = useState('');

  const handleAction = (dispatchType: 'broadcast' | 'offline') => {
    if (!bloodGroup || !units || !hospitalName || !location || !requiredTime) {
      alert('Please fill out all asterisk (*) required fields.');
      return;
    }
    if (doctorVerified && !hwId) {
      alert('Please provide your Health Worker ID or disable verification.');
      return;
    }
    onSubmit({
      bloodGroup,
      units: Number(units),
      urgency,
      hospitalName,
      location,
      requiredTime,
      doctorVerified,
      hwId: doctorVerified ? hwId : undefined,
    }, dispatchType);
  };

  return (
    <div className="bg-brand-surface text-stone-900 font-sans min-h-screen pb-24 antialiased flex flex-col animate-fade-in-up">
      {/* TopAppBar */}
      <header className="bg-white text-[#af101a] font-bold border-b border-brand-highest sticky w-full top-0 z-50 flex justify-between items-center px-4 h-14 shadow-m3-1">
        <button 
          onClick={onBack}
          aria-label="Menu" 
          className="text-stone-600 hover:bg-stone-100 transition-colors active:scale-95 duration-100 p-2 rounded-full flex items-center justify-center h-10 w-10"
        >
          <Menu size={20} />
        </button>
        <div className="font-extrabold text-xl tracking-tight uppercase">
          BloodLink
        </div>
        <button 
          onClick={() => onSelectRole('offline_dashboard')}
          aria-label="Connectivity Status" 
          className="text-[#0061a4] hover:bg-stone-50 transition-colors p-2 rounded-full flex items-center justify-center h-10 w-10"
        >
          <WifiOff size={20} />
        </button>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow container mx-auto px-4 py-6 max-w-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-stone-800">Create Emergency Request</h1>
          <p className="text-xs text-stone-500 mt-1">
            Quickly broadcast a need for blood to nearby donors and stations.
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Patient Blood Group & Units Required */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-stone-700 mb-1 ml-1" htmlFor="blood_group">
                Patient Blood Group *
              </label>
              <div className="relative">
                <select 
                  className="w-full h-11 bg-white border border-brand-outline/45 rounded-xl px-3 py-2 text-stone-800 text-sm font-medium outline-none focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a] appearance-none" 
                  id="blood_group" 
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  required
                >
                  <option value="">Select Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                  <Droplet size={14} fill={bloodGroup ? "#af101a" : "transparent"} className={bloodGroup ? "text-[#af101a]" : ""} />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-stone-700 mb-1 ml-1" htmlFor="units_required">
                Units Required *
              </label>
              <input 
                className="w-full h-11 bg-white border border-brand-outline/45 rounded-xl px-3 py-2 text-stone-800 text-sm font-medium outline-none focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a]" 
                id="units_required" 
                max="20" 
                min="1" 
                value={units}
                onChange={(e) => setUnits(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g. 2" 
                required 
                type="number"
              />
            </div>
          </div>

          {/* Urgency Level */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-stone-700 mb-1 ml-1">Urgency Level *</span>
            <div className="flex rounded-xl border border-brand-outline/35 overflow-hidden bg-stone-50" role="group">
              <button 
                className={`flex-1 h-11 font-bold text-xs border-r border-[#8f6f6c]/30 flex items-center justify-center transition-all ${
                  urgency === 'critical' 
                    ? 'bg-[#af101a] text-white shadow-inner font-extrabold' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                onClick={() => setUrgency('critical')} 
                type="button"
              >
                Critical
              </button>
              <button 
                className={`flex-1 h-11 font-bold text-xs border-r border-[#8f6f6c]/30 flex items-center justify-center transition-all ${
                  urgency === 'high' 
                    ? 'bg-amber-600 text-white shadow-inner font-extrabold' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                onClick={() => setUrgency('high')} 
                type="button"
              >
                High
              </button>
              <button 
                className={`flex-1 h-11 font-bold text-xs flex items-center justify-center transition-all ${
                  urgency === 'normal' 
                    ? 'bg-stone-600 text-white shadow-inner font-extrabold' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                onClick={() => setUrgency('normal')} 
                type="button"
              >
                Normal
              </button>
            </div>
          </div>

          {/* Hospital & Location */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-stone-700 mb-1 ml-1" htmlFor="hospital_name">
                Hospital / Clinic Name *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <Hospital size={16} />
                </span>
                <input 
                  className="w-full h-11 bg-white border border-brand-outline/45 rounded-xl pl-10 pr-3 py-2 text-stone-800 text-sm font-medium outline-none focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a]" 
                  id="hospital_name" 
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder="Enter hospital name" 
                  required 
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-stone-700 mb-1 ml-1" htmlFor="location">
                Location / Ward *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <MapPin size={16} />
                </span>
                <input 
                  className="w-full h-11 bg-white border border-brand-outline/45 rounded-xl pl-10 pr-3 py-2 text-stone-800 text-sm font-medium outline-none focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a]" 
                  id="location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter specific cabin or ward number" 
                  required 
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Required By Time */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-stone-700 mb-1 ml-1" htmlFor="required_time">
              Required By (Time) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                <Clock size={16} />
              </span>
              <input 
                className="w-full h-11 bg-white border border-brand-outline/45 rounded-xl pl-10 pr-3 py-2 text-stone-800 text-sm font-medium outline-none focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a]" 
                id="required_time" 
                value={requiredTime}
                onChange={(e) => setRequiredTime(e.target.value)}
                required 
                type="time"
              />
            </div>
          </div>

          {/* Verification Container */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[#016619]">
                <ShieldCheck size={20} fill="#9df898" />
                <span className="font-bold text-sm">Doctor / HW Verification</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer h-10">
                <input 
                  type="checkbox" 
                  checked={doctorVerified}
                  onChange={(e) => setDoctorVerified(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[8px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#016619]"></div>
              </label>
            </div>
            
            {doctorVerified && (
              <div className="flex flex-col pt-2 border-t border-stone-200/50 animate-fade-in-up">
                <label className="text-xs font-bold text-stone-700 mb-1 ml-1" htmlFor="hw_id">
                  Health Worker ID / Doctor Reg No.
                </label>
                <input 
                  className="w-full h-11 bg-white border border-brand-outline/40 rounded-xl px-3 py-2 text-stone-800 text-sm font-medium outline-none focus:border-[#016619] focus:ring-1 focus:ring-[#016619]" 
                  id="hw_id" 
                  value={hwId}
                  onChange={(e) => setHwId(e.target.value)}
                  placeholder="e.g. BL-4902" 
                  type="text"
                />
                <p className="text-[11px] text-stone-500 mt-1 font-medium select-none ml-1">
                  Verified requests receive priority notification and are marked with verified badge.
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3 pt-4">
            <button 
              onClick={() => handleAction('broadcast')}
              className="w-full h-12 bg-[#af101a] hover:bg-[#af101a]/95 text-white font-extrabold rounded-full flex items-center justify-center space-x-2 hover:shadow-m3-2 active:scale-95 transition-all text-xs uppercase tracking-wider"
              type="button"
            >
              <Heart size={16} fill="currentColor" />
              <span>Find Matching Donors</span>
            </button>
            <button 
              onClick={() => handleAction('offline')}
              className="w-full h-12 bg-[#33a0fd]/10 text-[#0061a4] border-2 border-[#33a0fd]/30 hover:bg-[#33a0fd]/20 font-extrabold rounded-full flex items-center justify-center space-x-2 active:scale-95 transition-all text-xs uppercase tracking-wider"
              type="button"
            >
              <Radio size={16} />
              <span>Save Offline & Broadcast Nearby</span>
            </button>
          </div>
        </form>
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
