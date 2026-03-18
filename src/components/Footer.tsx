import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="h-1.5 bg-gradient-to-r from-red-800 via-yellow-500 to-green-600"></div>
      
      {/* Islamic pattern bg */}
      <div className="islamic-pattern-dark absolute inset-0"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-4 mb-6">
              <img src="/IMG_4163.PNG" alt="Logo IMM" className="w-14 h-14 object-contain" />
              <div>
                <h3 className="text-white font-extrabold text-lg">IMM Fakultas Teknik</h3>
                <p className="text-gray-500 text-xs font-medium tracking-wide">PK Fakultas Teknik UNISMUH MAKASSAR</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Ikatan Mahasiswa Muhammadiyah (IMM) adalah organisasi otonom Muhammadiyah 
              yang bergerak di kalangan mahasiswa. Membentuk akademisi Islam 
              yang berakhlak mulia dan berkemajuan.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3">
              {[
                { icon: FaInstagram, href: '#', color: 'hover:bg-pink-600' },
                { icon: FaWhatsapp, href: '#', color: 'hover:bg-green-600' },
                { icon: FaYoutube, href: '#', color: 'hover:bg-red-600' },
              ].map((social, i) => (
                <a key={i} href={social.href} className={`w-10 h-10 bg-gray-800 ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110`}>
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider flex items-center">
              <span className="w-8 h-0.5 bg-yellow-500 mr-3"></span>
              Menu
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Beranda' },
                { to: '/tentang', label: 'Tentang IMM' },
                { to: '/kegiatan', label: 'Kegiatan' },
                { to: '/artikel', label: 'Artikel' },
                { to: '/kontak', label: 'Kontak' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-yellow-400 text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider flex items-center">
              <span className="w-8 h-0.5 bg-yellow-500 mr-3"></span>
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-900/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HiLocationMarker className="text-red-400" size={14} />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">Fakultas Teknik, Unismuh Makassar<br />Jl. Sultan Alauddin No.259, Makassar</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiPhone className="text-green-400" size={14} />
                </div>
                <span className="text-gray-400 text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiMail className="text-yellow-400" size={14} />
                </div>
                <span className="text-gray-400 text-sm">imm.Fakultas Teknik@unismuh.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} IMM PK Fakultas Teknik Fakultas Teknik Unismuh Makassar
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-700"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-black border border-gray-700"></span>
                <span className="w-3 h-3 rounded-full bg-green-600"></span>
              </div>
              <p className="text-gray-600 text-sm font-arabic">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
