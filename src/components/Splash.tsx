import React, { useEffect } from 'react';
import { Droplet } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="bg-brand-surface h-screen w-full flex flex-col justify-between items-center overflow-hidden font-sans cursor-pointer select-none"
      onClick={onComplete}
      id="splash-screen"
    >
      {/* Top Spacer */}
      <div className="flex-1"></div>

      {/* Main Branding Content */}
      <main className="flex flex-col items-center justify-center space-y-6 px-4 w-full max-w-sm">
        {/* Pulsating Brand Icon */}
        <div className="text-[#af101a] animate-pulse-scale mb-2 relative">
          <div className="relative flex items-center justify-center">
            {/* Soft backdrop ring animated */}
            <div className="absolute w-24 h-24 bg-[#af101a]/10 rounded-full animate-ping pointer-events-none"></div>
            {/* Thick inner blood cross icon */}
            <div className="w-24 h-24 rounded-full border-4 border-[#af101a] flex items-center justify-center bg-white shadow-m3-2">
              <span className="text-4xl font-bold font-mono">+</span>
            </div>
          </div>
          {/* Main Droplet */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 -z-10 text-[#af101a]/20">
            <Droplet size={140} fill="currentColor" strokeWidth={0.5} />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-3xl font-extrabold text-[#af101a] tracking-tight text-center uppercase tracking-wider animate-fade-in-up">
          BloodLink
        </h1>

        {/* Tagline */}
        <p className="text-lg text-[#5b403d] text-center font-medium animate-fade-in-up delay-100">
          Emergency Blood Donor Network
        </p>

        {/* Loading Indicator */}
        <div className="mt-8 animate-fade-in-up delay-200 w-24 h-1 bg-brand-container rounded-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#af101a] rounded-full animate-progress-slide"></div>
        </div>
      </main>

      {/* Footer Logos Placeholder */}
      <footer className="flex-1 flex flex-col justify-end w-full pb-8 px-4 items-center animate-fade-in-up delay-200">
        <div className="text-[#5b403d] text-xs font-bold mb-3 opacity-70 uppercase tracking-widest text-[11px]">
          Supported By
        </div>
        <div className="flex items-center justify-center space-x-6 opacity-80">
          {/* UBA Placeholder */}
          <div className="flex items-center justify-center w-16 h-12 bg-white rounded-lg border border-brand-highest shadow-m3-1 hover:border-[#af101a] transition-all duration-200">
            <span className="text-xs font-black text-[#5b403d]">UBA</span>
          </div>
          {/* Divider */}
          <div className="h-6 w-px bg-brand-highest"></div>
          {/* SRM Placeholder */}
          <div className="flex items-center justify-center w-16 h-12 bg-white rounded-lg border border-brand-highest shadow-m3-1 hover:border-[#af101a] transition-all duration-200">
            <span className="text-xs font-black text-[#5b403d]">SRM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
