import { useState, useEffect } from 'react';
import api from '../../services/api';
import type { DashboardStats, Event } from '../../types';
import { HiUsers, HiCalendar, HiDocumentText, HiUserAdd, HiTrendingUp, HiClipboardList } from 'react-icons/hi';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/dashboard/stats'),
      api.get('/events/upcoming'),
    ]).then(([statsRes, eventsRes]) => {
      if (statsRes.data.success) setStats(statsRes.data.data);
      if (eventsRes.data.success) setRecentEvents(eventsRes.data.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const statCards = [
    { label: 'Total Anggota', value: stats?.total_members || 0, icon: HiUsers, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { label: 'Anggota Aktif', value: stats?.active_members || 0, icon: HiUserAdd, gradient: 'from-green-500 to-green-600', bg: 'bg-green-50 border-green-100' },
    { label: 'Total Kegiatan', value: stats?.total_events || 0, icon: HiCalendar, gradient: 'from-red-500 to-red-600', bg: 'bg-red-50 border-red-100' },
    { label: 'Kegiatan Aktif', value: stats?.active_events || 0, icon: HiTrendingUp, gradient: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50 border-yellow-100' },
    { label: 'Total Artikel', value: stats?.total_articles || 0, icon: HiDocumentText, gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-50 border-purple-100' },
    { label: 'Total Pendaftaran', value: stats?.total_registrations || 0, icon: HiClipboardList, gradient: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 mt-2">Selamat datang di panel admin IMM Fakultas Teknik</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {statCards.map((card, i) => (
          <div key={i} className={`${card.bg} rounded-2xl p-6 border card-hover`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{card.label}</p>
                <p className="text-4xl font-extrabold text-gray-900">{card.value}</p>
              </div>
              <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                <card.icon size={26} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Kegiatan Mendatang</h2>
        {recentEvents.length === 0 ? (
          <p className="text-gray-400 text-sm">Tidak ada kegiatan mendatang</p>
        ) : (
          <div className="space-y-3">
            {recentEvents.slice(0, 5).map(event => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-400 mt-1">{event.date} &bull; {event.time} &bull; {event.location}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  event.status === 'akan_datang' ? 'bg-yellow-100 text-yellow-800' :
                  event.status === 'berlangsung' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {event.status === 'akan_datang' ? 'Akan Datang' : event.status === 'berlangsung' ? 'Berlangsung' : 'Selesai'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
