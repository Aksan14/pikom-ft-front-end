import { useState, useEffect } from 'react';
import api from '../../services/api';
import type { Article } from '../../types';
import { HiPlus, HiPencil, HiTrash, HiEye, HiX } from 'react-icons/hi';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ManageArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    title: '', content: '', excerpt: '', category: 'kajian', thumbnail: '', is_published: true,
  });

  useEffect(() => { fetchArticles(); }, [page]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/articles?page=${page}&limit=10`);
      if (res.data.success) {
        setArticles(res.data.data || []);
        setTotal(res.data.total);
      }
    } catch { /* */ }
    setLoading(false);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', content: '', excerpt: '', category: 'kajian', thumbnail: '', is_published: true });
    setShowModal(true);
  };

  const openEdit = (article: Article) => {
    setEditing(article);
    setForm({
      title: article.title, content: article.content, excerpt: article.excerpt,
      category: article.category, thumbnail: article.thumbnail, is_published: article.is_published,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/articles/${editing.id}`, form);
        toast.success('Artikel berhasil diupdate');
      } else {
        await api.post('/articles', form);
        toast.success('Artikel berhasil ditambahkan');
      }
      setShowModal(false);
      fetchArticles();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus artikel ini?')) return;
    try {
      await api.delete(`/articles/${id}`);
      toast.success('Artikel berhasil dihapus');
      fetchArticles();
    } catch {
      toast.error('Gagal menghapus');
    }
  };

  const categoryLabel: Record<string, string> = { kajian: 'Kajian', opini: 'Opini', berita: 'Berita', tutorial: 'Tutorial' };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Artikel</h1>
          <p className="text-gray-500 text-sm mt-1">{total} artikel total</p>
        </div>
        <button onClick={openCreate} className="flex items-center px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors">
          <HiPlus className="mr-2" /> Tambah Artikel
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
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Penulis</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{article.title}</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{categoryLabel[article.category] || article.category}</span></td>
                    <td className="px-4 py-3 text-gray-600">{article.author_name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${article.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {article.is_published ? 'Terbit' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        {article.is_published && <a href={`/artikel/${article.id}`} target="_blank" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><HiEye size={16} /></a>}
                        <button onClick={() => openEdit(article)} className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded"><HiPencil size={16} /></button>
                        <button onClick={() => handleDelete(article.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><HiTrash size={16} /></button>
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
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-lg font-bold">{editing ? 'Edit Artikel' : 'Tambah Artikel'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><HiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan</label>
                <textarea rows={2} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konten (HTML)</label>
                <textarea rows={10} value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm font-mono" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="kajian">Kajian</option>
                    <option value="opini">Opini</option>
                    <option value="berita">Berita</option>
                    <option value="tutorial">Tutorial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.is_published ? 'true' : 'false'} onChange={e => setForm({...form, is_published: e.target.value === 'true'})} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="true">Terbit</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
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
