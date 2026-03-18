import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-black text-white py-24 overflow-hidden">
        <div className="islamic-pattern absolute inset-0"></div>
        <div className="absolute top-10 right-10 w-60 h-60 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block px-4 py-1.5 glass text-xs font-bold rounded-full uppercase tracking-wider mb-6">Hubungi</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            Kontak <span className="text-yellow-400">Kami</span>
          </h1>
          <p className="text-red-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Hubungi kami untuk informasi lebih lanjut tentang IMM Fakultas Teknik
          </p>
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-12 h-1 rounded-full bg-red-500"></span>
            <span className="w-12 h-1 rounded-full bg-yellow-500"></span>
            <span className="w-12 h-1 rounded-full bg-green-500"></span>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }} className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Informasi Kontak</h2>
              <div className="space-y-5">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 card-hover">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <HiLocationMarker size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Alamat Sekretariat</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Fakultas Teknik<br />Universitas Muhammadiyah Makassar<br />Jl. Sultan Alauddin No.259, Makassar</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 card-hover">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <FaWhatsapp size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                      <p className="text-gray-500 text-sm">0812-3456-7890</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 card-hover">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <HiMail size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-500 text-sm">imm.Fakultas Teknik@unismuh.ac.id</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 card-hover">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <FaInstagram size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Instagram</h3>
                      <p className="text-gray-500 text-sm">@imm_Fakultas Teknik</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Jam Operasional</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 font-medium">Senin - Jumat</span>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">08:00 - 16:00 WIB</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600 font-medium">Sabtu</span>
                    <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">08:00 - 12:00 WIB</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Minggu & Hari Libur</span>
                    <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Tutup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Kirim Pesan</h2>
                <p className="text-gray-400 text-sm mb-8">Kami akan merespon pesan Anda secepatnya</p>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                      <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50" placeholder="Masukkan nama" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50" placeholder="Masukkan email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subjek</label>
                    <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50" placeholder="Subjek pesan" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                    <textarea rows={6} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50 resize-none" placeholder="Tulis pesan Anda..." />
                  </div>
                  <button type="button" className="w-full py-4 bg-gradient-to-r from-red-700 to-red-800 text-white font-bold rounded-xl hover:from-red-800 hover:to-red-900 transition-all shadow-lg hover:shadow-xl btn-shine">
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
