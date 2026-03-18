import { useState, useEffect } from 'react';
import api from '../../services/api';
import type { Event } from '../../types';
import { HiPlus, HiPencil, HiTrash, HiEye, HiX } from 'react-icons/hi';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [page] = useState(1);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    title: '', description: '', category: 'kajian', date: '', time: '', location: '', poster: '', status: 'akan_datang',
  });

  useEffect(() => { fetchEvents(); }, [page]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/events?page=${page}&limit=10`);
      if (res.data.success) {
        setEvents(res.data.data || []);
        setTotal(res.data.total);
      }
    } catch { /* */ }
    setLoading(false);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', description: '', category: 'kajian', date: '', time: '', location: '', poster: '', status: 'akan_datang' });
    setShowModal(true);
  };

  const openEdit = (event: Event) => {
    setEditing(event);
    setForm({
      title: event.title, description: event.description, category: event.category,
      date: event.date, time: event.time, location: event.location, poster: event.poster, status: event.status,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/events/${editing.id}`, form);
        toast.success('Kegiatan berhasil diupdate');
      } else {
        await api.post('/events', form);
        toast.success('Kegiatan berhasil ditambahkan');
      }
      setShowModal(false);
      fetchEvents();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus kegiatan ini?')) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success('Kegiatan berhasil dihapus');
      fetchEvents();
    } catch {
      toast.error('Gagal menghapus');
    }
  };

  const categoryLabel: Record<string, string> = { kajian: 'Kajian', pelatihan: 'Pelatihan', aksi_sosial: 'Aksi Sosial', lainnya: 'Lainnya' };
  const statusLabel: Record<string, string> = { akan_datang: 'Akan Datang', berlangsung: 'Berlangsung', selesai: 'Selesai' };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Kegiatan</h1>
          <p className="text-gray-500 text-sm mt-1">{total} kegiatan total</p>
        </div>
        <button onClick={openCreate} className="flex items-center px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors">
          <HiPlus className="mr-2" /> Tambah Kegiatan
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Judul</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Kategori</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Tanggal</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {events.map(event => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{event.title}</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">{categoryLabel[event.category]}</span></td>
                    <td className="px-4 py-3 text-gray-600">{event.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'akan_datang' ? 'bg-yellow-100 text-yellow-800' :
                        event.status === 'berlangsung' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>{statusLabel[event.status]}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <a href={`/kegiatan/${event.id}`} target="_blank" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><HiEye size={16} /></a>
                        <button onClick={() => openEdit(event)} className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded"><HiPencil size={16} /></button>
                        <button onClick={() => handleDelete(event.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><HiTrash size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-lg font-bold">{editing ? 'Edit Kegiatan' : 'Tambah Kegiatan'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><HiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="kajian">Kajian</option>
                    <option value="pelatihan">Pelatihan</option>
                    <option value="aksi_sosial">Aksi Sosial</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="akan_datang">Akan Datang</option>
                    <option value="berlangsung">Berlangsung</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                  <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
                  <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Batal</button>
                <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded-lg text-sm hover:bg-red-800">
                  {editing ? 'Update' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
