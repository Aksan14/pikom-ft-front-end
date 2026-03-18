import { useState, useEffect } from 'react';
import api from '../../services/api';
import type { User } from '../../types';
import { HiPlus, HiPencil, HiTrash, HiX, HiCheck, HiBan } from 'react-icons/hi';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ManageMembers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    nim: '', name: '', email: '', password: '', role: 'anggota', jabatan: '', is_active: true,
  });

  useEffect(() => { fetchUsers(); }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users?page=${page}&limit=10`);
      if (res.data.success) {
        setUsers(res.data.data || []);
        setTotal(res.data.total);
      }
    } catch { /* */ }
    setLoading(false);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ nim: '', name: '', email: '', password: '', role: 'anggota', jabatan: '', is_active: true });
    setShowModal(true);
  };

  const openEdit = (user: User) => {
    setEditing(user);
    setForm({
      nim: user.nim, name: user.name, email: user.email, password: '',
      role: user.role, jabatan: user.jabatan, is_active: user.is_active,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (editing && !payload.password) {
        const { password, ...rest } = payload;
        if (editing) {
          await api.put(`/users/${editing.id}`, rest);
        }
      } else if (editing) {
        await api.put(`/users/${editing.id}`, payload);
      } else {
        await api.post('/users', payload);
      }
      toast.success(editing ? 'Anggota berhasil diupdate' : 'Anggota berhasil ditambahkan');
      setShowModal(false);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus anggota ini?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('Anggota berhasil dihapus');
      fetchUsers();
    } catch {
      toast.error('Gagal menghapus');
    }
  };

  const roleLabel: Record<string, string> = { admin: 'Admin', pengurus: 'Pengurus', anggota: 'Anggota' };
  const roleColor: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800',
    pengurus: 'bg-blue-100 text-blue-800',
    anggota: 'bg-gray-100 text-gray-800',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Anggota</h1>
          <p className="text-gray-500 text-sm mt-1">{total} anggota total</p>
        </div>
        <button onClick={openCreate} className="flex items-center px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors">
          <HiPlus className="mr-2" /> Tambah Anggota
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Nama</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">NIM</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        {user.jabatan && <div className="text-xs text-gray-500">{user.jabatan}</div>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">{user.nim}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColor[user.role]}`}>{roleLabel[user.role]}</span></td>
                    <td className="px-4 py-3">
                      {user.is_active ? (
                        <span className="flex items-center text-green-600 text-xs"><HiCheck className="mr-1" /> Aktif</span>
                      ) : (
                        <span className="flex items-center text-red-600 text-xs"><HiBan className="mr-1" /> Nonaktif</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button onClick={() => openEdit(user)} className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded"><HiPencil size={16} /></button>
                        <button onClick={() => handleDelete(user.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><HiTrash size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {total > 10 && (
            <div className="flex justify-center items-center gap-2 p-4 border-t">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Prev</button>
              <span className="text-sm text-gray-600">Halaman {page}</span>
              <button disabled={page * 10 >= total} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Next</button>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-lg font-bold">{editing ? 'Edit Anggota' : 'Tambah Anggota'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><HiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIM</label>
                  <input type="text" value={form.nim} onChange={e => setForm({...form, nim: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password {editing && '(kosongkan jika tidak diubah)'}</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" {...(!editing && { required: true })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="anggota">Anggota</option>
                    <option value="pengurus">Pengurus</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                  <input type="text" value={form.jabatan} onChange={e => setForm({...form, jabatan: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="mr-2" />
                <label className="text-sm text-gray-700">Aktif</label>
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
