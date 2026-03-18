import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import type { Media } from '../../types';
import { HiUpload, HiTrash, HiPhotograph } from 'react-icons/hi';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ManageMedia() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchMedia(); }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await api.get('/media');
      if (res.data.success) {
        setMediaList(res.data.data || []);
      }
    } catch { /* */ }
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('File berhasil diupload');
      fetchMedia();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Gagal mengupload file');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus media ini?')) return;
    try {
      await api.delete(`/media/${id}`);
      toast.success('Media berhasil dihapus');
      fetchMedia();
    } catch {
      toast.error('Gagal menghapus');
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isImage = (filetype: string) => filetype.startsWith('image/');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Media</h1>
          <p className="text-gray-500 text-sm mt-1">{mediaList.length} file</p>
        </div>
        <div>
          <input ref={fileInputRef} type="file" onChange={handleUpload} className="hidden" accept="image/*,.pdf,.doc,.docx" />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50"
          >
            <HiUpload className="mr-2" /> {uploading ? 'Mengupload...' : 'Upload File'}
          </button>
        </div>
      </div>

      {loading ? <LoadingSpinner /> : mediaList.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-16 text-center">
          <HiPhotograph className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Belum ada media</h3>
          <p className="text-gray-400">Upload file pertama Anda</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList.map(media => (
            <div key={media.id} className="bg-white rounded-xl shadow-sm border overflow-hidden group">
              <div className="aspect-square bg-gray-100 relative">
                {isImage(media.filetype) ? (
                  <img src={`/${media.filepath}`} alt={media.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <HiPhotograph className="mx-auto text-gray-300 mb-2" size={40} />
                      <span className="text-xs text-gray-500 uppercase">{media.filetype.split('/')[1]}</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => handleDelete(media.id)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                    <HiTrash size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">{media.filename}</p>
                <p className="text-xs text-gray-500 mt-1">{formatSize(media.filesize)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
