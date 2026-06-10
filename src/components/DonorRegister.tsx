import React, { useState, useEffect } from 'react';
import { DonorInfo } from '../types';
import { ArrowLeft, User, Phone, Droplet, Cake, MapPin, Calendar, CheckSquare, Square } from 'lucide-react';

interface DonorRegisterProps {
  onBack: () => void;
  onRegister: (donor: Omit<DonorInfo, 'id' | 'available'>) => void;
  existingDonor?: DonorInfo | null;
}

export default function DonorRegister({ onBack, onRegister, existingDonor }: DonorRegisterProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [area, setArea] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (existingDonor) {
      setFullName(existingDonor.fullName);
      setPhone(existingDonor.phone);
      setBloodGroup(existingDonor.bloodGroup);
      setAge(existingDonor.age);
      setArea(existingDonor.area);
      setLastDonationDate(existingDonor.lastDonationDate || '');
      setConsent(existingDonor.consent);
    }
  }, [existingDonor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !bloodGroup || !age || !area || !consent) {
      alert('Please fill out all required fields and accept the consent checkbox.');
      return;
    }
    onRegister({
      fullName,
      phone,
      bloodGroup,
      age: Number(age),
      area,
      lastDonationDate: lastDonationDate || undefined,
      consent,
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans antialiased text-stone-900 pb-12 animate-fade-in-up">
      {/* TopAppBar */}
      <header className="bg-white border-b border-brand-highest flex justify-between items-center px-4 h-14 w-full z-50 sticky top-0 shadow-m3-1">
        <button 
          onClick={onBack}
          aria-label="Go back" 
          className="h-10 w-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors rounded-full active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-extrabold text-xl text-[#af101a] uppercase tracking-heavy">BloodLink</h1>
        <div className="h-10 w-10"></div> {/* Balanced placeholder */}
      </header>

      <main className="flex-1 w-full max-w-xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-stone-800 mb-2">
            {existingDonor ? 'Update Profile' : 'Donor Registration'}
          </h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            {existingDonor 
              ? 'Keep your details accurate so health workers can contact you.' 
              : 'Join the verified donor network to save lives in your area.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1" htmlFor="fullName">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <User size={18} />
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2 border border-brand-outline/40 rounded-xl focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a] bg-stone-50 outline-none text-stone-800 font-medium text-sm h-11 transition-all"
                id="fullName" 
                name="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name" 
                required 
                type="text"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1" htmlFor="phone">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <Phone size={18} />
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2 border border-brand-outline/40 rounded-xl focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a] bg-stone-50 outline-none text-stone-800 font-medium text-sm h-11 transition-all"
                id="phone" 
                name="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}" 
                placeholder="10-digit mobile number" 
                required 
                type="tel"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1" htmlFor="bloodGroup">
                Blood Group *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#af101a]">
                  <Droplet size={18} fill="currentColor" />
                </div>
                <select 
                  className="block w-full pl-10 pr-3 py-2 border border-brand-outline/40 rounded-xl focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a] bg-stone-50 outline-none text-stone-800 font-medium text-sm h-11 transition-all appearance-none"
                  id="bloodGroup" 
                  name="bloodGroup" 
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  required
                >
                  <option value="">Select group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1" htmlFor="age">
                Age *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Cake size={18} />
                </div>
                <input 
                  className="block w-full pl-10 pr-3 py-2 border border-brand-outline/40 rounded-xl focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a] bg-stone-50 outline-none text-stone-800 font-medium text-sm h-11 transition-all"
                  id="age" 
                  max="65" 
                  min="18" 
                  name="age" 
                  value={age}
                  onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Years (18-65)" 
                  required 
                  type="number"
                />
              </div>
            </div>
          </div>

          {/* Village / Area */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1" htmlFor="area">
              Village / Area *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <MapPin size={18} />
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2 border border-brand-outline/40 rounded-xl focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a] bg-stone-50 outline-none text-stone-800 font-medium text-sm h-11 transition-all"
                id="area" 
                name="area" 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Current locality or village center" 
                required 
                type="text"
              />
            </div>
          </div>

          {/* Last Donation Date */}
          <div>
            <label className="block text-sm font-bold text-[#5b403d] mb-1" htmlFor="lastDonation">
              Last Donation Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <Calendar size={18} />
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2 border border-brand-outline/40 rounded-xl focus:border-[#af101a] focus:ring-1 focus:ring-[#af101a] bg-stone-50 outline-none text-stone-800 font-medium text-sm h-11 transition-all"
                id="lastDonation" 
                name="lastDonation" 
                value={lastDonationDate}
                onChange={(e) => setLastDonationDate(e.target.value)}
                type="date"
              />
            </div>
            <p className="mt-1 text-[11px] text-stone-400 ml-1">Leave blank if never donated.</p>
          </div>

          {/* Consent Checkbox */}
          <div 
            onClick={() => setConsent(!consent)}
            className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-start gap-3 mt-6 cursor-pointer select-none hover:bg-stone-100/50 transition-colors"
          >
            <div className="flex items-center mt-0.5">
              <button 
                type="button" 
                className="text-[#af101a] focus:outline-none"
                aria-label="Consent checkbox"
              >
                {consent ? <CheckSquare size={20} className="fill-[#af101a]/10" /> : <Square size={20} />}
              </button>
            </div>
            <div className="flex-1">
              <span className="font-bold text-sm text-stone-800 block">
                I consent to be contacted during verified blood emergencies.
              </span>
              <p className="text-xs text-stone-500 mt-1 leading-normal">
                Your details are secure and only visible to verified health workers.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button 
              className="w-full flex items-center justify-center bg-[#af101a] hover:bg-[#af101a]/95 active:scale-95 transition-all duration-200 text-white font-bold text-md h-12 rounded-full shadow-m3-2"
              type="submit"
            >
              {existingDonor ? 'Save Changes' : 'Register as Donor'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
