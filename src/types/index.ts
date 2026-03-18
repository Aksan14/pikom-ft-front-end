export interface User {
  id: number;
  nim: string;
  name: string;
  email: string;
  role: 'admin' | 'pengurus' | 'anggota';
  jabatan: string;
  photo: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  category: 'kajian' | 'pelatihan' | 'aksi_sosial' | 'lainnya';
  date: string;
  time: string;
  location: string;
  poster: string;
  status: 'akan_datang' | 'berlangsung' | 'selesai';
  created_by: number;
  author_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: 'aqidah' | 'akhlak' | 'ilmu' | 'sosial' | 'umum';
  thumbnail: string;
  author_id: number;
  author_name?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: number;
  event_id: number;
  user_id: number;
  user_name?: string;
  user_nim?: string;
  user_email?: string;
  event_title?: string;
  registered_at: string;
}

export interface DashboardStats {
  total_members: number;
  active_members: number;
  total_events: number;
  active_events: number;
  total_articles: number;
  total_registrations: number;
}

export interface Media {
  id: number;
  filename: string;
  filepath: string;
  filetype: string;
  filesize: number;
  uploaded_by: number;
  created_at: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  total: number;
  page: number;
  limit: number;
}
