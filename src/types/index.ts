export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'processed';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface DashboardStats {
  total: number;
  thisWeek: number;
  topService: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HeroCard {
  icon: string;
  title: string;
  description: string;
}
