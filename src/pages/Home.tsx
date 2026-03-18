import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import type { Event, Article } from '../types';
import { HiCalendar, HiLocationMarker, HiClock, HiArrowRight, HiBookOpen, HiStar } from 'react-icons/hi';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [prayerDate, setPrayerDate] = useState('');
  const [, setNextPrayer] = useState('');
  const [, setCountdown] = useState('');
  const [currentWita, setCurrentWita] = useState('');
  const [, setNextPrayerTime] = useState('');
  const [, setPassedPrayers] = useState<string[]>([]);

  useEffect(() => {
    api.get('/events/upcoming').then(res => {
      if (res.data.success) setEvents(res.data.data || []);
    }).catch(() => {});
    api.get('/articles/latest').then(res => {
      if (res.data.success) setArticles(res.data.data || []);
    }).catch(() => {});

    // Fetch prayer times from Aladhan API — Makassar, Kemenag RI method
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    setPrayerDate(`${dd}-${mm}-${yyyy}`);
    fetch(`https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=-5.1477&longitude=119.4327&method=20`)
      .then(res => res.json())
      .then(data => {
        if (data?.data?.timings) {
          const t = data.data.timings;
          setPrayerTimes({
            Fajr: t.Fajr?.replace(/\s*\(.*\)/, ''),
            Sunrise: t.Sunrise?.replace(/\s*\(.*\)/, ''),
            Dhuhr: t.Dhuhr?.replace(/\s*\(.*\)/, ''),
            Asr: t.Asr?.replace(/\s*\(.*\)/, ''),
            Maghrib: t.Maghrib?.replace(/\s*\(.*\)/, ''),
            Isha: t.Isha?.replace(/\s*\(.*\)/, ''),
          });
        }
      })
      .catch(() => {});
  }, []);

  // Live countdown timer
  useEffect(() => {
    if (!prayerTimes) return;
    const prayers = [
      { name: 'Subuh', time: prayerTimes.Fajr },
      { name: 'Terbit', time: prayerTimes.Sunrise },
      { name: 'Dzuhur', time: prayerTimes.Dhuhr },
      { name: 'Ashar', time: prayerTimes.Asr },
      { name: 'Maghrib', time: prayerTimes.Maghrib },
      { name: 'Isya', time: prayerTimes.Isha },
    ];
    const tick = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const wita = new Date(utc + 8 * 60 * 60000);
      const hh = String(wita.getHours()).padStart(2, '0');
      const mm = String(wita.getMinutes()).padStart(2, '0');
      const ss = String(wita.getSeconds()).padStart(2, '0');
      setCurrentWita(`${hh}:${mm}:${ss}`);
      const currentSec = wita.getHours() * 3600 + wita.getMinutes() * 60 + wita.getSeconds();
      const passed: string[] = [];
      let found = false;
      for (const p of prayers) {
        const [ph, pm] = p.time.split(':').map(Number);
        const pSec = ph * 3600 + pm * 60;
        if (pSec <= currentSec) passed.push(p.name);
        if (!found && pSec > currentSec) {
          found = true;
          setNextPrayer(p.name);
          setNextPrayerTime(p.time);
          const diff = pSec - currentSec;
          const dh = String(Math.floor(diff / 3600)).padStart(2, '0');
          const dm = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
          const ds = String(diff % 60).padStart(2, '0');
          setCountdown(`${dh}:${dm}:${ds}`);
        }
      }
      setPassedPrayers(passed);
      if (!found) {
        setNextPrayer('Subuh');
        setNextPrayerTime(prayers[0].time);
        setCountdown('--:--:--');
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const categoryLabel: Record<string, string> = {
    kajian: 'Kajian', pelatihan: 'Pelatihan', aksi_sosial: 'Aksi Sosial', lainnya: 'Lainnya',
  };
  const statusLabel: Record<string, string> = {
    akan_datang: 'Akan Datang', berlangsung: 'Berlangsung', selesai: 'Selesai',
  };
  const statusColor: Record<string, string> = {
    akan_datang: 'bg-yellow-100 text-yellow-800 border border-yellow-200', berlangsung: 'bg-green-100 text-green-800 border border-green-200', selesai: 'bg-gray-100 text-gray-800 border border-gray-200',
  };

  return (
    <div className="overflow-hidden">
      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-red-900 via-red-800 to-black text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="islamic-pattern absolute inset-0"></div>
          {/* Decorative circles */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-left text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                Ikatan Mahasiswa{' '}
                <span className="relative">
                  <span className="text-yellow-400">Muhammadiyah</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 8C50 3 100 2 150 5C200 8 250 4 298 6" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-red-100/90 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Pimpinan Komisariat Fakultas Teknik — Fakultas Teknik Universitas Muhammadiyah Makassar. 
                Membentuk akademisi Islam yang berakhlak mulia dan berkemajuan.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/kegiatan"
                  className="inline-flex items-center px-7 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 btn-shine"
                >
                  Lihat Kegiatan
                  <HiArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/tentang"
                  className="inline-flex items-center px-7 py-3.5 glass text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                >
                  Tentang IMM
                </Link>
              </div>

            </div>

            {/* Right - Logo (appears first on mobile via flex-col-reverse) */}
            <div className="flex justify-center items-center animate-fade-in-right">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 w-[320px] h-[320px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px] rounded-full bg-gradient-to-br from-yellow-400/20 to-red-600/20 blur-2xl animate-pulse-glow -m-10 md:-m-12 lg:-m-14"></div>
                {/* Sun rays decorative */}
                <div className="absolute inset-0 w-[320px] h-[320px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px] -m-10 md:-m-12 lg:-m-14 animate-rotate-slow" style={{ opacity: 0.08 }}>
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute top-1/2 left-1/2 w-1 h-36 md:h-48 lg:h-56 bg-yellow-400 origin-bottom" style={{ transform: `translate(-50%, -100%) rotate(${i * 30}deg)` }}></div>
                  ))}
                </div>
                {/* Main logo */}
                <img 
                  src="/IMG_4163.PNG" 
                  alt="Logo IMM Fakultas Teknik" 
                  className="w-[260px] h-[260px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px] object-contain relative z-10 animate-float drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 28C480 28 600 44 720 52C840 60 960 60 1080 52C1200 44 1320 28 1380 20L1440 12V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V60Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* ====== JADWAL SHOLAT ====== */}
      <section style={{ padding: '80px 0' }} className="bg-gray-50 relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-100/30 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100/20 rounded-full blur-[100px] translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Jadwal Sholat</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Jadwal Sholat Hari Ini</h2>
            <p className="text-gray-500 text-sm">Makassar, Sulawesi Selatan — {prayerDate}</p>
          </div>

          {/* Live clock */}
          {currentWita && (
            <div className="text-center mb-12">
              <div className="inline-block relative">
                {/* Outer glow */}
                <div className="absolute -inset-3 bg-gradient-to-r from-red-600/20 via-yellow-500/20 to-red-600/20 rounded-[28px] blur-xl"></div>
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-[#1a0a0a] via-red-950 to-[#1a0a0a] rounded-3xl px-12 py-8 shadow-2xl border border-red-800/30 overflow-hidden">
                  {/* Islamic pattern */}
                  <div className="absolute inset-0 islamic-pattern opacity-[0.04]"></div>
                  {/* Gold accent lines */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
                  {/* Decorative corner dots */}
                  <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-yellow-500/30"></div>
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-yellow-500/30"></div>
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-yellow-500/30"></div>
                  <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-yellow-500/30"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    {/* Label */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 border border-yellow-500/20 flex items-center justify-center">
                        <HiClock className="text-yellow-400 text-xl" />
                      </div>
                      <span className="text-red-300/50 text-[11px] font-bold uppercase tracking-[0.3em]">Waktu Sekarang</span>
                    </div>
                    {/* Time display */}
                    <div className="flex items-baseline gap-1">
                      {currentWita.split(':').map((unit, idx) => (
                        <div key={idx} className="flex items-baseline">
                          {idx > 0 && <span className="text-yellow-500/40 text-4xl md:text-5xl font-light mx-1 -mt-1">:</span>}
                          <span className="font-mono text-5xl md:text-7xl font-black text-white tracking-tight" style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>{unit}</span>
                        </div>
                      ))}
                    </div>
                    {/* WITA badge */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-yellow-500/40"></div>
                      <span className="text-yellow-400/80 text-xs font-bold tracking-[0.3em]">WITA</span>
                      <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-yellow-500/40"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {prayerTimes ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Subuh', time: prayerTimes.Fajr },
                { name: 'Terbit', time: prayerTimes.Sunrise },
                { name: 'Dzuhur', time: prayerTimes.Dhuhr },
                { name: 'Ashar', time: prayerTimes.Asr },
                { name: 'Maghrib', time: prayerTimes.Maghrib },
                { name: 'Isya', time: prayerTimes.Isha },
              ].map((prayer, i) => (
                <div
                  key={i}
                  className="relative bg-white border-2 border-red-400 rounded-2xl text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ring-2 ring-red-100"
                  style={{ padding: '24px 14px' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 prayer-shimmer-bar"></div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2 text-red-700">{prayer.name}</p>
                  <p className="text-2xl font-extrabold tracking-tight font-mono text-gray-900">{prayer.time}</p>
                  <p className="text-[10px] mt-1 font-semibold text-red-500">WITA</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 text-sm">Memuat jadwal sholat...</p>
            </div>
          )}
        </div>
      </section>

      {/* ====== ABOUT BANNER ====== */}
      <section style={{ padding: '80px 0' }} className="bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-red-50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Tentang Kami</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Pimpinan Komisariat <span className="text-gradient-imm">Fakultas Teknik</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                IMM PK Fakultas Teknik bergerak di lingkungan Fakultas Teknik Universitas Muhammadiyah Makassar. 
                Kami berkomitmen membentuk generasi intelektual muslim yang berkarakter, 
                memiliki semangat amar ma'ruf nahi munkar, dan berkontribusi nyata bagi umat.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['Kajian Intensif', 'Pelatihan Kader', 'Aksi Sosial', 'Pengabdian Masyarakat'].map((item, i) => (
                  <div key={i} className="flex items-center" style={{ gap: '8px' }}>
                    <div className="flex-shrink-0" style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <HiStar className="text-green-600" style={{ width: '12px', height: '12px' }} />
                    </div>
                    <span style={{ fontSize: '14px' }} className="font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/tentang" className="inline-flex items-center text-red-800 font-bold hover:text-red-900 group">
                Selengkapnya tentang IMM
                <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-yellow-200 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                  <img src="/logo%20IMM.png" alt="Logo IMM" className="w-56 h-auto mx-auto mb-4" />
                  <div className="text-center">
                    <h3 className="font-extrabold text-lg text-gray-900">Ikatan Mahasiswa Muhammadiyah</h3>
                    <p className="text-gray-500 text-sm mt-1">فاستبقوا الخيرات</p>
                    <div className="flex justify-center gap-2 mt-4">
                      <span className="w-8 h-1 rounded-full bg-red-700"></span>
                      <span className="w-8 h-1 rounded-full bg-yellow-500"></span>
                      <span className="w-8 h-1 rounded-full bg-black"></span>
                      <span className="w-8 h-1 rounded-full bg-green-600"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== UPCOMING EVENTS ====== */}
      <section style={{ padding: '80px 0' }} className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Agenda</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Kegiatan Terbaru</h2>
            </div>
            <Link to="/kegiatan" className="hidden sm:inline-flex items-center px-5 py-2.5 border-2 border-red-700 text-red-700 rounded-xl font-bold text-sm hover:bg-red-700 hover:text-white transition-all">
              Semua Kegiatan <HiArrowRight className="ml-2" />
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <HiCalendar size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-medium">Belum ada kegiatan terbaru</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 6).map((event) => (
                <Link key={event.id} to={`/kegiatan/${event.id}`} className="group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100">
                  <div className="h-52 bg-gradient-to-br from-red-800 via-red-700 to-red-900 flex items-center justify-center relative overflow-hidden">
                    {event.poster ? (
                      <img src={event.poster} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="text-center text-white">
                        <div className="islamic-pattern absolute inset-0"></div>
                        <HiCalendar size={48} className="mx-auto mb-2 opacity-40 relative" />
                        <span className="text-sm opacity-60 relative">{categoryLabel[event.category]}</span>
                      </div>
                    )}
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${statusColor[event.status]} shadow-sm`}>
                      {statusLabel[event.status]}
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                      {categoryLabel[event.category]}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-3 mb-3 group-hover:text-red-700 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center"><HiCalendar className="mr-2 text-red-400" /> {event.date}</div>
                      <div className="flex items-center"><HiClock className="mr-2 text-yellow-500" /> {event.time}</div>
                      <div className="flex items-center"><HiLocationMarker className="mr-2 text-green-500" /> {event.location}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="sm:hidden text-center mt-8">
            <Link to="/kegiatan" className="inline-flex items-center px-6 py-3 bg-red-700 text-white rounded-xl font-bold text-sm">
              Semua Kegiatan <HiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== LATEST ARTICLES ====== */}
      <section style={{ padding: '80px 0' }} className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Wacana</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Artikel & Kajian</h2>
            </div>
            <Link to="/artikel" className="hidden sm:inline-flex items-center px-5 py-2.5 border-2 border-green-700 text-green-700 rounded-xl font-bold text-sm hover:bg-green-700 hover:text-white transition-all">
              Semua Artikel <HiArrowRight className="ml-2" />
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <HiBookOpen size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-medium">Belum ada artikel</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(0, 3).map(article => (
                <Link key={article.id} to={`/artikel/${article.id}`} className="group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100">
                  <div className="h-44 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                    {article.thumbnail ? (
                      <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="text-center relative">
                        <div className="islamic-pattern absolute inset-0"></div>
                        <HiBookOpen size={48} className="text-white/30 relative" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-green-600/90 px-3 py-1 rounded-full capitalize">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="font-medium">{article.author_name}</span>
                      <span>{new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-red-900 to-black text-white overflow-hidden">
        <div className="islamic-pattern-dark absolute inset-0"></div>
        {/* Decorative */}
        <div className="absolute top-10 left-10 w-40 h-40 border border-yellow-400/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-yellow-400/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <img src="/logo%20IMM.png" alt="IMM" className="w-20 h-auto mx-auto mb-8 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Bergabunglah dengan <span className="text-yellow-400">IMM Fakultas Teknik</span>
          </h2>
          <p className="text-red-100/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Mari bersama membangun generasi intelektual Muslim yang berkemajuan. 
            Jadilah bagian dari gerakan yang mencerahkan, mencerdaskan, dan menggerakkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-extrabold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-xl hover:shadow-yellow-500/25 text-lg btn-shine"
            >
              Daftar Sekarang
              <HiArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/kontak"
              className="inline-flex items-center justify-center px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/20 transition-all text-lg"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
