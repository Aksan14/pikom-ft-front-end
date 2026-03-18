import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiLockClosed, HiMail, HiIdentification, HiUser } from 'react-icons/hi';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Login berhasil!');
        navigate('/');
      } else {
        await register(nim, name, email, password);
        toast.success('Registrasi berhasil! Silakan login.');
        setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Terjadi kesalahan');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="islamic-pattern absolute inset-0"></div>
      <div className="absolute top-20 -left-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-in-up">
          <Link to="/" className="inline-block">
            <div className="relative">
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-yellow-400/20 rounded-full blur-xl"></div>
              <img src="/IMG_4163.PNG" alt="Logo IMM" className="w-24 h-24 mx-auto relative z-10 drop-shadow-2xl" />
            </div>
            <h1 className="text-white font-extrabold text-xl mt-4">IMM Fakultas Teknik</h1>
            <p className="text-red-300/70 text-sm mt-1">Fakultas Teknik — Unismuh Makassar</p>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in-up delay-100">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Daftar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">NIM</label>
                  <div className="relative">
                    <HiIdentification className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={nim}
                      onChange={(e) => setNim(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                      placeholder="Masukkan NIM"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                  placeholder="Masukkan email"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                  placeholder="Masukkan password"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-red-700 to-red-800 text-white font-bold rounded-xl hover:from-red-800 hover:to-red-900 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl btn-shine"
            >
              {loading ? 'Memproses...' : (isLogin ? 'Login' : 'Daftar')}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="font-bold text-gray-700 text-xs mb-2">Demo Login:</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>Admin: <span className="font-mono">admin@imm.org / admin123</span></p>
                <p>Pengurus: <span className="font-mono">pengurus1@imm.org / pengurus123</span></p>
                <p>Anggota: <span className="font-mono">anggota1@imm.org / anggota123</span></p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-white/50 text-sm hover:text-white transition-colors font-medium">← Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  );
}
