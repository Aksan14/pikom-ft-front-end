import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout, isPengurus } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/tentang', label: 'Tentang' },
    { to: '/kegiatan', label: 'Kegiatan' },
    { to: '/artikel', label: 'Artikel' },
    { to: '/kontak', label: 'Kontak' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
          : 'bg-white'
      }`}
    >
      {/* === Top accent line === */}
      <div className="h-1 bg-gradient-to-r from-red-800 via-yellow-500 to-green-600" />

      {/* === Main bar === */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between" style={{ height: '72px' }}>

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center shrink-0" style={{ gap: '12px' }}>
              <img
                src="/IMG_4163.PNG"
                alt="Logo IMM"
                className="object-contain w-11 h-11 sm:w-14 sm:h-14"
              />
              <div className="hidden sm:block">
                <p className="font-extrabold text-red-800 leading-none" style={{ fontSize: '14px', letterSpacing: '-0.02em' }}>
                  IMM PIKOM FT
                </p>
                <p className="font-medium text-gray-400 leading-none" style={{ fontSize: '10px', marginTop: '4px', letterSpacing: '0.04em' }}>
                  Pimpinan Komisariat Fakultas Teknik UNISMUH MAKASSAR
                </p>
              </div>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center" style={{ gap: '6px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-semibold transition-colors duration-200 ${
                    isActive(link.to)
                      ? 'bg-red-800 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '13.5px', whiteSpace: 'nowrap' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Desktop auth ── */}
            <div className="hidden lg:flex items-center shrink-0" style={{ gap: '12px' }}>
              {isAuthenticated ? (
                <>
                  {isPengurus && (
                    <Link
                      to="/admin"
                      className="font-bold bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors"
                      style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px' }}
                    >
                      Dashboard
                    </Link>
                  )}

                  <div style={{ width: '1px', height: '24px', background: '#e5e7eb' }} />

                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <div className="bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center text-white font-bold" style={{ width: '32px', height: '32px', borderRadius: '50%', fontSize: '12px' }}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-700" style={{ fontSize: '13px' }}>
                      {user?.name?.split(' ')[0]}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    style={{ padding: '8px', borderRadius: '8px' }}
                    title="Logout"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center font-bold bg-red-800 text-white hover:bg-red-900 transition-colors"
                  style={{ gap: '8px', padding: '9px 20px', borderRadius: '8px', fontSize: '13px' }}
                >
                  Login
                  <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}
            </div>

            {/* ── Mobile toggle ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-600 hover:bg-gray-100 transition-colors"
              style={{ padding: '8px', borderRadius: '8px' }}
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile menu === */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[480px]' : 'max-h-0'
        }`}
      >
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto" style={{ padding: '16px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-semibold transition-colors ${
                    isActive(link.to)
                      ? 'bg-red-800 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  style={{ display: 'block', padding: '10px 16px', borderRadius: '10px', fontSize: '14px' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #f3f4f6', margin: '12px 0', paddingTop: '12px' }}>
              {isAuthenticated ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {isPengurus && (
                    <Link
                      to="/admin"
                      className="font-bold bg-yellow-400 text-gray-900"
                      style={{ display: 'block', textAlign: 'center', padding: '10px 16px', borderRadius: '10px', fontSize: '14px' }}
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="bg-gray-50" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="bg-gradient-to-br from-red-700 to-red-900 text-white font-bold" style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-700" style={{ fontSize: '14px' }}>{user?.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="font-semibold text-red-600 hover:text-red-800"
                      style={{ fontSize: '12px' }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-red-800 text-white hover:bg-red-900 transition-colors font-bold"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', fontSize: '14px' }}
                >
                  Login
                  <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
