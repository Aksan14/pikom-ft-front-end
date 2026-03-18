import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiCalendar,
  HiDocumentText,
  HiUsers,
  HiPhotograph,
  HiChartBar,
  HiLogout,
  HiMenu,
  HiX,
  HiArrowLeft,
} from 'react-icons/hi';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const menuItems = [
    { to: '/admin', icon: HiChartBar, label: 'Dashboard', exact: true },
    { to: '/admin/kegiatan', icon: HiCalendar, label: 'Kegiatan' },
    { to: '/admin/artikel', icon: HiDocumentText, label: 'Artikel' },
    ...(isAdmin ? [{ to: '/admin/anggota', icon: HiUsers, label: 'Anggota' }] : []),
    { to: '/admin/media', icon: HiPhotograph, label: 'Media' },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-br from-red-700 to-red-800 text-white p-2.5 rounded-xl shadow-lg"
      >
        {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Header with Logo */}
        <div className="p-5 border-b border-gray-800/50">
          <div className="flex items-center space-x-3">
            <img src="/IMG_4163.PNG" alt="IMM" className="w-10 h-10 object-contain" />
            <div>
              <h2 className="font-extrabold text-sm">Panel Admin</h2>
              <p className="text-xs mt-0.5">
                <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text font-bold">{user?.role?.toUpperCase()}</span>
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-5 border-b border-gray-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-sm font-extrabold shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold">{user?.name}</p>
              <p className="text-gray-500 text-xs">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1.5 mt-2">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold px-3 mb-3">Menu Utama</p>
          {menuItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                (item.exact ? location.pathname === item.to : isActive(item.to))
                  ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg shadow-red-900/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50 space-y-1.5">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all font-medium"
          >
            <HiArrowLeft size={18} />
            <span>Kembali ke Website</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full font-medium"
          >
            <HiLogout size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
