import React, { useState, useEffect } from 'react';
import { AppRole, DonorInfo, EmergencyRequest, ActivityLog, SystemAlert } from './types';
import Splash from './components/Splash';
import RoleSelection from './components/RoleSelection';
import DonorRegister from './components/DonorRegister';
import DonorHome from './components/DonorHome';
import CreateRequest from './components/CreateRequest';
import MatchingDonors from './components/MatchingDonors';
import OfflineMode from './components/OfflineMode';
import HealthWorkerDashboard from './components/HealthWorkerDashboard';
import RequestTracking from './components/RequestTracking';
import AdminDashboard from './components/AdminDashboard';
import { Layers, ChevronRight, Check } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState<AppRole>('splash');
  const [isHUDExtended, setIsHUDExtended] = useState(false);

  // Stateful databases
  const [donorProfile, setDonorProfile] = useState<DonorInfo | null>(() => {
    const saved = localStorage.getItem('bloodlink_donor_profile');
    return saved ? JSON.parse(saved) : {
      id: 'D-99',
      fullName: 'Venu Madhav',
      phone: '9848032100',
      bloodGroup: 'O+',
      age: 26,
      area: 'Kurnool District Main Hub',
      consent: true,
      available: true,
    };
  });

  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>([
    {
      id: 'BL902',
      bloodGroup: 'O+',
      units: 2,
      urgency: 'high',
      hospitalName: 'Rural Health Center, Block C',
      location: 'Ward 4, Bed 12',
      requiredTime: '14:30',
      doctorVerified: true,
      hwId: 'BL-4902',
      status: 'accepted',
      createdAt: 'Today, 09:42 AM',
      donorInitial: 'R.K.',
      donorDistance: '2.5 km',
    }
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 'act1',
      type: 'donation_completed',
      title: 'Donation Completed',
      description: 'Donor #892 successfully completed A+ donation.',
      timeAgo: '10 mins ago',
    },
    {
      id: 'act2',
      type: 'new_donor',
      title: 'New Donor Registered',
      description: 'Rajesh Kumar (O-) added to verified list.',
      timeAgo: '2 hrs ago',
    }
  ]);

  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: 'alert1',
      type: 'urgent_low_stock',
      title: 'Low Stock: O Negative',
      description: 'District 4 reserves are below 10%. Immediate mobilization recommended.',
      timeAgo: '2 hours ago',
    },
    {
      id: 'alert2',
      type: 'sync_completed',
      title: 'Offline Sync Completed',
      description: 'Data from 3 rural mobile units successfully synchronized with the main database.',
      timeAgo: '5 hours ago',
    }
  ]);

  const [trackingRequest, setTrackingRequest] = useState<EmergencyRequest>(emergencyRequests[0]);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(1);
  const [lastAssignedDonorInitial, setLastAssignedDonorInitial] = useState<string>('R.K.');
  const [lastAssignedDonorDistance, setLastAssignedDonorDistance] = useState<string>('2.5 km');

  useEffect(() => {
    if (donorProfile) {
      localStorage.setItem('bloodlink_donor_profile', JSON.stringify(donorProfile));
    } else {
      localStorage.removeItem('bloodlink_donor_profile');
    }
  }, [donorProfile]);

  // Handler to register/edit donor details
  const handleRegisterDonor = (details: Omit<DonorInfo, 'id' | 'available'>) => {
    const freshDonor: DonorInfo = {
      ...details,
      id: donorProfile?.id || 'D-' + Math.floor(Math.random() * 900 + 100),
      available: donorProfile ? donorProfile.available : true,
    };
    setDonorProfile(freshDonor);
    setRole('donor_home');

    // Add activity log
    const log: ActivityLog = {
      id: 'act-' + Date.now(),
      type: 'new_donor',
      title: 'New Donor Registered',
      description: `${freshDonor.fullName} (${freshDonor.bloodGroup}) added to verified list.`,
      timeAgo: 'Just now',
    };
    setActivityLogs(prev => [log, ...prev]);
  };

  // Handler to toggle online/offline availability
  const handleToggleAvailability = (newAvailable: boolean) => {
    if (donorProfile) {
      setDonorProfile({ ...donorProfile, available: newAvailable });
    }
  };

  // Handler to create blood request
  const handleCreateRequest = (
    details: Omit<EmergencyRequest, 'id' | 'status' | 'createdAt'>, 
    dispatchType: 'broadcast' | 'offline'
  ) => {
    const id = 'BL' + Math.floor(Math.random() * 900 + 100);
    const newReq: EmergencyRequest = {
      ...details,
      id,
      status: dispatchType === 'offline' ? 'created' : 'notified',
      createdAt: 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setEmergencyRequests(prev => [newReq, ...prev]);
    setTrackingRequest(newReq);

    if (dispatchType === 'offline') {
      setPendingSyncCount(prev => prev + 1);
      setRole('offline_dashboard');
    } else {
      setRole('matching_donors');
    }
  };

  // Handler to accept a specific donor en-route
  const handleSelectDonor = (donorName: string, donorInitial: string, distance: string) => {
    setLastAssignedDonorInitial(donorInitial);
    setLastAssignedDonorDistance(distance);

    // Update the request status
    const updatedRequests = emergencyRequests.map((req) => {
      if (req.id === trackingRequest.id) {
        return {
          ...req,
          status: 'accepted' as const,
          donorInitial,
          donorDistance: distance,
        };
      }
      return req;
    });

    setEmergencyRequests(updatedRequests);
    
    const updatedTrack = updatedRequests.find(r => r.id === trackingRequest.id) || trackingRequest;
    setTrackingRequest({ ...updatedTrack, status: 'accepted', donorInitial, donorDistance: distance });
    setRole('request_tracking');
  };

  // Handler to audit timeline level sequence
  const handleConfirmTimeline = (newStatus: 'confirmed' | 'completed') => {
    const updatedRequests = emergencyRequests.map((req) => {
      if (req.id === trackingRequest.id) {
        return {
          ...req,
          status: newStatus,
        };
      }
      return req;
    });

    setEmergencyRequests(updatedRequests);
    setTrackingRequest({ ...trackingRequest, status: newStatus });

    if (newStatus === 'completed') {
      // Add activity log
      const log: ActivityLog = {
        id: 'act-' + Date.now(),
        type: 'donation_completed',
        title: 'Donation Case Fulfilled',
        description: `Emergency request #${trackingRequest.id} has successfully secured matching O+ vials.`,
        timeAgo: 'Just now',
      };
      setActivityLogs(prev => [log, ...prev]);
    }
  };

  // Handler to sync offline saved log files
  const handleSyncComplete = () => {
    // Sync all pending offline creations to active notified
    const syncedRequests = emergencyRequests.map((req) => {
      if (req.status === 'created') {
        return { ...req, status: 'notified' as const };
      }
      return req;
    });
    setEmergencyRequests(syncedRequests);
    setPendingSyncCount(0);

    // Push system log alert
    const alertItem: SystemAlert = {
      id: 'alert-' + Date.now(),
      type: 'sync_completed',
      title: 'P2P Offline Sync Finished',
      description: `Data from ${emergencyRequests.filter(r => r.status === 'created').length + 1} rural peer device synchronised successfully.`,
      timeAgo: 'Just now',
    };
    setSystemAlerts(prev => [alertItem, ...prev]);
  };

  return (
    <div className="relative min-h-screen bg-brand-surface selection:bg-[#ffdad6] selection:text-[#af101a]">
      
      {/* Primary Component Router */}
      {role === 'splash' && (
        <Splash onComplete={() => setRole('selection')} />
      )}

      {role === 'selection' && (
        <RoleSelection 
          onSelectRole={(r) => setRole(r)} 
          isRegistered={!!donorProfile} 
        />
      )}

      {role === 'donor_register' && (
        <DonorRegister 
          onBack={() => setRole('selection')}
          onRegister={handleRegisterDonor}
          existingDonor={donorProfile}
        />
      )}

      {role === 'donor_home' && donorProfile && (
        <DonorHome 
          donor={donorProfile}
          activeRequests={emergencyRequests}
          onUpdateProfile={() => setRole('donor_register')}
          onSelectRole={(r) => setRole(r)}
          onViewRequest={(req) => {
            setTrackingRequest(req);
            setRole('request_tracking');
          }}
          onToggleAvailability={handleToggleAvailability}
        />
      )}

      {role === 'acceptor_create' && (
        <CreateRequest 
          onBack={() => setRole('selection')}
          onSubmit={handleCreateRequest}
          onSelectRole={(r) => setRole(r)}
        />
      )}

      {role === 'matching_donors' && (
        <MatchingDonors 
          request={trackingRequest}
          customDonors={donorProfile ? [donorProfile] : []}
          onBack={() => setRole('acceptor_create')}
          onSelectDonor={handleSelectDonor}
          onSelectRole={(r) => setRole(r)}
        />
      )}

      {role === 'offline_dashboard' && (
        <OfflineMode 
          onSyncComplete={handleSyncComplete}
          onSelectRole={(r) => setRole(r)}
          pendingSyncCount={pendingSyncCount}
        />
      )}

      {role === 'hw_dashboard' && (
        <HealthWorkerDashboard 
          activeRequests={emergencyRequests}
          activityLogs={activityLogs}
          onSelectRequest={(req) => {
            setTrackingRequest(req);
            setRole('request_tracking');
          }}
          onNewEmergency={() => setRole('acceptor_create')}
          onSelectRole={(r) => setRole(r)}
          isOfflineMode={pendingSyncCount > 0}
        />
      )}

      {role === 'request_tracking' && (
        <RequestTracking 
          request={trackingRequest}
          onBack={() => setRole('selection')}
          onConfirmTimeline={handleConfirmTimeline}
          assignedDonorInitial={lastAssignedDonorInitial}
          assignedDonorDistance={lastAssignedDonorDistance}
        />
      )}

      {role === 'admin_dashboard' && (
        <AdminDashboard 
          onSelectRole={(r) => setRole(r)}
          systemAlerts={systemAlerts}
        />
      )}

      {/* Evaluator HUD overlay - collapses to the side of the screen */}
      <div className="fixed top-20 right-4 z-[9999] opacity-95 transition-all duration-300">
        <div className="flex flex-col items-end">
          {/* Pulse Layer Switch icon to open HUD */}
          <button 
            onClick={() => setIsHUDExtended(!isHUDExtended)}
            className="h-10 px-3 bg-[#0061a4] text-white rounded-full flex items-center justify-center gap-1.5 shadow-m3-3 border hover:bg-opacity-95 focus:outline-none focus:ring-1 focus:ring-[#0061a4] font-bold text-xs"
          >
            <Layers size={15} />
            <span>{isHUDExtended ? 'Close Screens HUD' : 'Evaluate Screens HUD'}</span>
            <ChevronRight size={14} className={`transform transition-transform ${isHUDExtended ? 'rotate-90' : ''}`} />
          </button>

          {/* Collapsible Panel List */}
          {isHUDExtended && (
            <div className="mt-2 bg-white rounded-2xl border border-brand-highest p-3 w-64 shadow-m3-3 space-y-1.5 text-xs font-semibold max-h-[80vh] overflow-y-auto animate-fade-in-up">
              <div className="text-[10px] text-stone-400 uppercase tracking-widest pb-1 border-b border-stone-100 mb-2 font-black">
                Jump to specific frame
              </div>
              
              <button 
                onClick={() => { setRole('splash'); setIsHUDExtended(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'splash' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 1: Splash Screen</span>
                {role === 'splash' && <Check size={12} strokeWidth={3} />}
              </button>

              <button 
                onClick={() => { setRole('selection'); setIsHUDExtended(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'selection' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 2: Role Menu</span>
                {role === 'selection' && <Check size={12} strokeWidth={3} />}
              </button>

              <button 
                onClick={() => { setRole('donor_register'); setIsHUDExtended(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'donor_register' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 3: Donor Signup</span>
                {role === 'donor_register' && <Check size={12} strokeWidth={3} />}
              </button>

              <button 
                onClick={() => {
                  if (!donorProfile) {
                    setDonorProfile({
                      id: 'D-55',
                      fullName: 'Venu Madhav',
                      phone: '9848032100',
                      bloodGroup: 'O+',
                      age: 26,
                      area: 'Kurnool rural',
                      consent: true,
                      available: true,
                    });
                  }
                  setRole('donor_home');
                  setIsHUDExtended(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'donor_home' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 4: Donor Home</span>
                {role === 'donor_home' && <Check size={12} strokeWidth={3} />}
              </button>

              <button 
                onClick={() => { setRole('acceptor_create'); setIsHUDExtended(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'acceptor_create' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 5: Create Request</span>
                {role === 'acceptor_create' && <Check size={12} strokeWidth={3} />}
              </button>

              <button 
                onClick={() => { setRole('matching_donors'); setIsHUDExtended(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'matching_donors' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 6: Donor Matches</span>
                {role === 'matching_donors' && <Check size={12} strokeWidth={3} />}
              </button>

              <button 
                onClick={() => { setRole('offline_dashboard'); setIsHUDExtended(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'offline_dashboard' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 7: Offline Module</span>
                {role === 'offline_dashboard' && <Check size={12} strokeWidth={3} />}
              </button>

              <button 
                onClick={() => { setRole('hw_dashboard'); setIsHUDExtended(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'hw_dashboard' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 8: Health Worker</span>
                {role === 'hw_dashboard' && <Check size={12} strokeWidth={3} />}
              </button>

              <button 
                onClick={() => { setRole('request_tracking'); setIsHUDExtended(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'request_tracking' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 9: Request Tracking</span>
                {role === 'request_tracking' && <Check size={12} strokeWidth={3} />}
              </button>

              <button 
                onClick={() => { setRole('admin_dashboard'); setIsHUDExtended(false); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left hover:bg-[#ffdad6]/40 hover:text-[#af101a] transition-all ${
                  role === 'admin_dashboard' ? 'bg-[#ffdad6] text-[#af101a]' : 'text-stone-600'
                }`}
              >
                <span>Screen 10: Admin overview</span>
                {role === 'admin_dashboard' && <Check size={12} strokeWidth={3} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
