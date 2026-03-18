import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import type { Event } from '../types';
import { useAuth } from '../context/AuthContext';
import { HiCalendar, HiLocationMarker, HiClock, HiUserGroup, HiArrowLeft } from 'react-icons/hi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function EventDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      if (res.data.success) {
        setEvent(res.data.data.event);
        setParticipants(res.data.data.participants);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated && id) {
      // Check registration status quietly
      api.get('/my/registrations').then(res => {
        if (res.data.success && res.data.data) {
          const found = res.data.data.find((r: any) => r.event_id === Number(id));
          setIsRegistered(!!found);
        }
      }).catch(() => {});
    }
  }, [isAuthenticated, id]);

  const handleRegister = async () => {
    try {
      await api.post(`/events/${id}/register`);
      setIsRegistered(true);
      setParticipants(p => p + 1);
      toast.success('Berhasil mendaftar kegiatan!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Gagal mendaftar');
    }
  };

  const handleUnregister = async () => {
    try {
      await api.delete(`/events/${id}/register`);
      setIsRegistered(false);
      setParticipants(p => p - 1);
      toast.success('Pendaftaran dibatalkan');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Gagal membatalkan');
    }
  };

  const categoryLabel: Record<string, string> = {
    kajian: 'Kajian', pelatihan: 'Pelatihan', aksi_sosial: 'Aksi Sosial', lainnya: 'Lainnya',
  };
  const statusLabel: Record<string, string> = {
    akan_datang: 'Akan Datang', berlangsung: 'Berlangsung', selesai: 'Selesai',
  };

  if (loading) return <LoadingSpinner />;
  if (!event) return <div className="text-center py-20 text-gray-500">Kegiatan tidak ditemukan</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-10">
        <Link to="/kegiatan" className="inline-flex items-center text-red-700 hover:text-red-800 mb-8 font-medium text-sm group">
          <HiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Kegiatan
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Poster */}
          <div className="h-64 md:h-96 bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center relative">
            {event.poster ? (
              <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-white">
                <HiCalendar size={64} className="mx-auto mb-3 opacity-20" />
                <span className="text-lg opacity-50 font-medium">{categoryLabel[event.category]}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <div className="p-8 md:p-10">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-sm font-bold text-red-700 bg-red-50 px-4 py-1.5 rounded-full">
                {categoryLabel[event.category]}
              </span>
              <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${
                event.status === 'akan_datang' ? 'bg-yellow-100 text-yellow-800' :
                event.status === 'berlangsung' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {statusLabel[event.status]}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">{event.title}</h1>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { icon: HiCalendar, text: event.date, color: 'from-red-500 to-red-600' },
                { icon: HiClock, text: `${event.time} WIB`, color: 'from-yellow-500 to-yellow-600' },
                { icon: HiLocationMarker, text: event.location, color: 'from-green-500 to-green-600' },
                { icon: HiUserGroup, text: `${participants} peserta terdaftar`, color: 'from-blue-500 to-blue-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                    <item.icon className="text-white" size={18} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-8 mb-8">
              <h2 className="text-xl font-extrabold text-gray-900 mb-5">Deskripsi Kegiatan</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {event.description}
              </div>
            </div>

            {event.author_name && (
              <p className="text-sm text-gray-400 mb-6">Dibuat oleh: <span className="font-medium">{event.author_name}</span></p>
            )}

            {/* Registration */}
            {event.status !== 'selesai' && (
              <div className="border-t border-gray-100 pt-8">
                {isAuthenticated ? (
                  isRegistered ? (
                    <div className="flex items-center justify-between bg-green-50 rounded-2xl p-6 border border-green-100">
                      <div>
                        <p className="text-green-800 font-bold">Anda sudah terdaftar</p>
                        <p className="text-green-600 text-sm mt-1">Silakan hadir tepat waktu</p>
                      </div>
                      <button
                        onClick={handleUnregister}
                        className="px-5 py-2.5 bg-red-100 text-red-700 rounded-xl text-sm font-bold hover:bg-red-200 transition-colors"
                      >
                        Batalkan
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleRegister}
                      className="w-full py-4 bg-gradient-to-r from-red-700 to-red-800 text-white font-bold rounded-xl hover:from-red-800 hover:to-red-900 transition-all shadow-lg hover:shadow-xl btn-shine"
                    >
                      Daftar Kegiatan Ini
                    </button>
                  )
                ) : (
                  <div className="text-center bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
                    <p className="text-yellow-800 font-medium mb-3">Login untuk mendaftar kegiatan ini</p>
                    <Link to="/login" className="inline-flex items-center px-6 py-2.5 bg-red-700 text-white font-bold rounded-xl hover:bg-red-800 transition-colors text-sm">Login</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
