import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import type { Event } from '../types';
import { HiCalendar, HiLocationMarker, HiClock, HiFilter } from 'react-icons/hi';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 9;

  useEffect(() => {
    fetchEvents();
  }, [category, status, page]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (category) params.append('category', category);
      if (status) params.append('status', status);
      const res = await api.get(`/events?${params}`);
      if (res.data.success) {
        setEvents(res.data.data || []);
        setTotal(res.data.total);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const categoryLabel: Record<string, string> = {
    kajian: 'Kajian', pelatihan: 'Pelatihan', aksi_sosial: 'Aksi Sosial', lainnya: 'Lainnya',
  };
  const statusLabel: Record<string, string> = {
    akan_datang: 'Akan Datang', berlangsung: 'Berlangsung', selesai: 'Selesai',
  };
  const statusColor: Record<string, string> = {
    akan_datang: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    berlangsung: 'bg-green-100 text-green-800 border-green-200',
    selesai: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-black text-white py-24 overflow-hidden">
        <div className="islamic-pattern absolute inset-0"></div>
        <div className="absolute top-10 left-10 w-60 h-60 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block px-4 py-1.5 glass text-xs font-bold rounded-full uppercase tracking-wider mb-6">Agenda</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            Kegiatan & <span className="text-yellow-400">Kajian</span>
          </h1>
          <p className="text-red-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Jadwal kegiatan, kajian, pelatihan, dan aksi sosial IMM Fakultas Teknik
          </p>
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-12 h-1 rounded-full bg-red-500"></span>
            <span className="w-12 h-1 rounded-full bg-yellow-500"></span>
            <span className="w-12 h-1 rounded-full bg-green-500"></span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky z-10 shadow-sm" style={{ top: '68px' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center" style={{ gap: '12px', flexWrap: 'wrap' }}>
            <div className="flex items-center text-red-800" style={{ gap: '6px' }}>
              <HiFilter size={16} />
              <span style={{ fontSize: '13px' }} className="font-semibold">Filter:</span>
            </div>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="border border-gray-200 bg-gray-50 font-medium focus:ring-2 focus:ring-red-500 focus:border-red-500"
              style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '13px' }}
            >
              <option value="">Semua Kategori</option>
              <option value="kajian">Kajian</option>
              <option value="pelatihan">Pelatihan</option>
              <option value="aksi_sosial">Aksi Sosial</option>
              <option value="lainnya">Lainnya</option>
            </select>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="border border-gray-200 bg-gray-50 font-medium focus:ring-2 focus:ring-red-500 focus:border-red-500"
              style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '13px' }}
            >
              <option value="">Semua Status</option>
              <option value="akan_datang">Akan Datang</option>
              <option value="berlangsung">Berlangsung</option>
              <option value="selesai">Selesai</option>
            </select>
            <span className="text-gray-400 font-medium" style={{ marginLeft: 'auto', fontSize: '13px' }}>{total} kegiatan ditemukan</span>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <LoadingSpinner />
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiCalendar size={36} className="text-red-300" />
              </div>
              <p className="text-gray-400 text-lg font-medium">Belum ada kegiatan</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                  <Link key={event.id} to={`/kegiatan/${event.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group">
                    <div className="h-52 bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center relative overflow-hidden">
                      {event.poster ? (
                        <img src={event.poster} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="text-center text-white">
                          <HiCalendar size={48} className="mx-auto mb-2 opacity-30" />
                          <span className="text-sm opacity-60 font-medium">{categoryLabel[event.category]}</span>
                        </div>
                      )}
                      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${statusColor[event.status]}`}>
                        {statusLabel[event.status]}
                      </span>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full">
                        {categoryLabel[event.category]}
                      </span>
                      <h3 className="text-lg font-extrabold text-gray-900 mt-4 mb-3 group-hover:text-red-700 transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center"><HiCalendar className="mr-2.5 text-red-400 flex-shrink-0" size={16} /> {event.date}</div>
                        <div className="flex items-center"><HiClock className="mr-2.5 text-red-400 flex-shrink-0" size={16} /> {event.time} WIB</div>
                        <div className="flex items-center"><HiLocationMarker className="mr-2.5 text-red-400 flex-shrink-0" size={16} /> {event.location}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        page === i + 1 ? 'bg-gradient-to-br from-red-700 to-red-800 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
