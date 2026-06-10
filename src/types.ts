export type AppRole =
  | 'splash'
  | 'selection'
  | 'donor_register'
  | 'donor_home'
  | 'acceptor_create'
  | 'matching_donors'
  | 'offline_dashboard'
  | 'hw_dashboard'
  | 'request_tracking'
  | 'admin_dashboard';

export interface DonorInfo {
  id: string;
  fullName: string;
  phone: string;
  bloodGroup: string;
  age: number;
  area: string;
  lastDonationDate?: string;
  consent: boolean;
  available: boolean;
}

export interface EmergencyRequest {
  id: string;
  bloodGroup: string;
  units: number;
  urgency: 'critical' | 'high' | 'normal';
  hospitalName: string;
  location: string;
  requiredTime: string;
  doctorVerified: boolean;
  hwId?: string;
  status: 'created' | 'notified' | 'accepted' | 'confirmed' | 'completed';
  createdAt: string;
  acceptedDonorId?: string;
  donorInitial?: string;
  donorDistance?: string;
}

export interface ActivityLog {
  id: string;
  type: 'donation_completed' | 'new_donor' | 'request_created';
  title: string;
  description: string;
  timeAgo: string;
}

export interface SystemAlert {
  id: string;
  type: 'urgent_low_stock' | 'sync_completed' | 'general';
  title: string;
  description: string;
  timeAgo: string;
}
