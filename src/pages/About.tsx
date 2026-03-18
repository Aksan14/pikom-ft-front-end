import { HiAcademicCap, HiHeart, HiGlobe, HiStar } from 'react-icons/hi';

export default function About() {
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-black text-white py-24 overflow-hidden">
        <div className="islamic-pattern absolute inset-0"></div>
        <div className="absolute top-10 right-10 w-60 h-60 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block px-4 py-1.5 glass text-xs font-bold rounded-full uppercase tracking-wider mb-6">Mengenal Kami</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            Tentang <span className="text-yellow-400">IMM</span>
          </h1>
          <p className="text-red-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Ikatan Mahasiswa Muhammadiyah — Gerakan mahasiswa Islam yang mengedepankan 
            intelektualitas, humanitas, dan religiositas
          </p>
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-12 h-1 rounded-full bg-red-500"></span>
            <span className="w-12 h-1 rounded-full bg-yellow-500"></span>
            <span className="w-12 h-1 rounded-full bg-green-500"></span>
          </div>
        </div>
      </section>

      {/* Sejarah with Logo */}
      <section style={{ padding: '80px 0' }} className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3">
              <span className="inline-block px-4 py-1.5 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Sejarah</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">Sejarah Singkat IMM</h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed space-y-5">
                <p>
                  Ikatan Mahasiswa Muhammadiyah (IMM) didirikan pada tanggal <strong className="text-red-800">14 Maret 1964</strong> di Yogyakarta. 
                  IMM merupakan organisasi otonom (ortom) Muhammadiyah yang bergerak di kalangan mahasiswa perguruan tinggi.
                </p>
                <p>
                  Lahirnya IMM dilatarbelakangi oleh kebutuhan akan adanya wadah perjuangan mahasiswa Islam yang bercorak 
                  Muhammadiyah untuk menghadapi tantangan zaman. IMM hadir sebagai gerakan mahasiswa Islam yang mengedepankan 
                  intelektualitas, humanitas, dan religiositas.
                </p>
                <p>
                  Sepanjang perjalanannya, IMM telah melahirkan banyak kader-kader terbaik bangsa yang berkiprah di berbagai 
                  bidang, mulai dari akademisi, birokrat, pengusaha, hingga tokoh-tokoh masyarakat yang berpengaruh.
                </p>
              </div>

              {/* Timeline markers */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  { year: '1964', event: 'Didirikan di Yogyakarta' },
                  { year: '2024', event: '60 Tahun Perjalanan' },
                  { year: 'Kini', event: 'Tersebar di Seluruh Indonesia' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <div className="text-2xl font-extrabold text-red-800">{item.year}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 flex justify-center">
              <div className="sticky top-24">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-red-100 via-yellow-50 to-green-100 rounded-3xl transform rotate-2"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <img src="/logo%20IMM.png" alt="Logo IMM" className="w-48 mx-auto mb-6" />
                    <div className="text-center">
                      <h3 className="font-extrabold text-gray-900">Lambang IMM</h3>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        Melambangkan semangat perjuangan, keilmuan, dan ke-Islaman yang menjadi identitas kader IMM
                      </p>
                      <p className="text-lg mt-3 text-green-700 font-arabic">فاستبقوا الخيرات</p>
                      <p className="text-xs text-gray-400 mt-1">Fastabiqul Khairat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section style={{ padding: '80px 0' }} className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Kepengurusan</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Struktur Organisasi</h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-3">Susunan kepengurusan IMM Pimpinan Komisariat Fakultas Teknik periode 2025/2026</p>
          </div>

          {/* Org Chart */}
          <div className="flex flex-col items-center">

            {/* === PIMPINAN INTI === */}
            {/* Ketua Umum */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-gray-200 w-72 relative">
              <div className="absolute -top-1 left-0 right-0 h-1 bg-gray-800 rounded-t-2xl"></div>
              <div className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300 shadow-sm overflow-hidden bg-gray-100">
                <img src="/dummy-person.jpg" alt="Ketua Umum" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="flex items-center justify-center w-full h-full text-2xl font-extrabold text-gray-400">KU</span>'; }} />
              </div>
              <h3 className="font-extrabold text-gray-900 text-lg leading-tight">Nama Ketua Umum</h3>
              <p className="text-gray-500 text-xs mt-1.5 font-semibold uppercase tracking-[0.15em]">Ketua Umum</p>
            </div>

            {/* Connector */}
            <div className="w-px h-12 bg-gray-300"></div>

            {/* Sekretaris & Bendahara */}
            <div className="relative w-full max-w-2xl">
              <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-px bg-gray-300"></div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                {[
                  { name: 'Nama Sekretaris Umum', role: 'Sekretaris Umum', photo: '/dummy-person.jpg' },
                  { name: 'Nama Bendahara Umum', role: 'Bendahara Umum', photo: '/dummy-person.jpg' },
                ].map((person, i) => (
                  <div key={i} className="flex flex-col items-center mt-6">
                    <div className="hidden md:block w-px h-6 bg-gray-300 -mt-6"></div>
                    <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200 w-60">
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-200 shadow-sm overflow-hidden bg-gray-100">
                        <img src={person.photo} alt={person.role} className="w-full h-full object-cover" onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = 'none'; el.parentElement!.innerHTML = `<span class="flex items-center justify-center w-full h-full text-lg font-extrabold text-gray-400">${person.name.split(' ').map(w => w[0]).join('').slice(0,2)}</span>`; }} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm leading-tight">{person.name}</h4>
                      <p className="text-gray-500 text-[11px] mt-1.5 font-semibold uppercase tracking-[0.12em]">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connector */}
            <div className="w-px h-12 bg-gray-300"></div>

            {/* === BIDANG-BIDANG === */}
            <div className="w-full">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                  <span className="text-gray-600 text-xs font-bold uppercase tracking-[0.15em]">Kepala Bidang & Anggota</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { bidang: 'Bidang Perkaderan', kabid: { name: 'Nama Kabid Perkaderan', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid Perkaderan', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                  { bidang: 'Bidang Organisasi', kabid: { name: 'Nama Kabid Organisasi', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid Organisasi', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                  { bidang: 'Bidang Hikmah, Politik & Kebijakan Publik', kabid: { name: 'Nama Kabid Hikmah', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid Hikmah', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                  { bidang: 'Bidang Seni, Budaya & Olahraga', kabid: { name: 'Nama Kabid SBO', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid SBO', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                  { bidang: 'Bidang Immawati (Keputrian)', kabid: { name: 'Nama Kabid Immawati', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid Immawati', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                  { bidang: 'Bidang Ekonomi & Kewirausahaan', kabid: { name: 'Nama Kabid Ekowir', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid Ekowir', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                  { bidang: 'Bidang Tabligh & Keislaman', kabid: { name: 'Nama Kabid Tabligh', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid Tabligh', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                  { bidang: 'Bidang Sosial & Pemberdayaan Masyarakat', kabid: { name: 'Nama Kabid SPM', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid SPM', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                  { bidang: 'Bidang Riset & Pengembangan Keilmuan', kabid: { name: 'Nama Kabid Keilmuan', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid Keilmuan', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                  { bidang: 'Bidang Media & Komunikasi', kabid: { name: 'Nama Kabid MK', photo: '/dummy-person.jpg' }, sekbid: { name: 'Nama Sekbid MK', photo: '/dummy-person.jpg' }, anggota: [{ name: 'Nama Anggota 1', photo: '/dummy-person.jpg' }, { name: 'Nama Anggota 2', photo: '/dummy-person.jpg' }] },
                ].map((bid, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Bidang Header */}
                    <div className="bg-gray-800 px-5 py-3">
                      <h4 className="text-white font-bold text-sm tracking-wide">{bid.bidang}</h4>
                    </div>

                    <div className="p-5">
                      {/* Kabid */}
                      <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-100">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-sm flex-shrink-0">
                          <img src={bid.kabid.photo} alt={bid.kabid.name} className="w-full h-full object-cover" onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = 'none'; el.parentElement!.innerHTML = `<span class="flex items-center justify-center w-full h-full text-xs font-bold text-gray-400">${bid.kabid.name.split(' ').slice(-1)[0]?.slice(0,2).toUpperCase()}</span>`; }} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">{bid.kabid.name}</p>
                          <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.12em] mt-0.5">Kepala Bidang</p>
                        </div>
                      </div>

                      {/* Sekretaris Bidang */}
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                        <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-50 border border-gray-200 flex-shrink-0">
                          <img src={bid.sekbid.photo} alt={bid.sekbid.name} className="w-full h-full object-cover" onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = 'none'; el.parentElement!.innerHTML = `<span class="flex items-center justify-center w-full h-full text-[10px] font-bold text-gray-400">${bid.sekbid.name.split(' ').slice(-1)[0]?.slice(0,2).toUpperCase()}</span>`; }} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">{bid.sekbid.name}</p>
                          <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider mt-0.5">Sekretaris Bidang</p>
                        </div>
                      </div>

                      {/* Anggota */}
                      <div className="space-y-3">
                        {bid.anggota.map((ang, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-50 border border-gray-200 flex-shrink-0">
                              <img src={ang.photo} alt={ang.name} className="w-full h-full object-cover" onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = 'none'; el.parentElement!.innerHTML = `<span class="flex items-center justify-center w-full h-full text-[10px] font-bold text-gray-400">${ang.name.split(' ').slice(-1)[0]?.slice(0,2).toUpperCase()}</span>`; }} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-800 text-sm truncate">{ang.name}</p>
                              <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Anggota</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lembaga Fakultas Teknik */}
      <section style={{ padding: '80px 0' }} className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Organisasi</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Lembaga Fakultas Teknik</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Organisasi kemahasiswaan yang bernaung di bawah Fakultas Teknik Universitas Muhammadiyah Makassar</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: 'BEM Fakultas Teknik', full: 'Badan Eksekutif Mahasiswa Fakultas Teknik', logo: '/logo%20BEM-FT.png' },
              { name: 'HME', full: 'Himpunan Mahasiswa Elektro', logo: '/HME-FT.png' },
              { name: 'HMA', full: 'Himpunan Mahasiswa Arsitektur', logo: '/LOGO%20HMA-FT.png' },
              { name: 'HMIF', full: 'Himpunan Mahasiswa Informatika', logo: '/logo%20HMIF-FT.png' },
              { name: 'HMPWK', full: 'Himpunan Mahasiswa Perencanaan Wilayah dan Kota', logo: '/LOGO%20HMPWK%20FT%20UNISMUH.png' },
              { name: 'HMS', full: 'Himpunan Mahasiswa Sipil', logo: '/logo%20HMS-FT.png' },
            ].map((org, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 card-hover text-center">
                <div className="w-24 h-24 mx-auto mb-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img src={org.logo} alt={org.name} className="w-20 h-20 object-contain" />
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-1">{org.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{org.full}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai-nilai */}
      <section style={{ padding: '80px 0' }} className="bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden">
        <div className="islamic-pattern-dark absolute inset-0"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 glass text-xs font-bold rounded-full uppercase tracking-wider mb-4">Karakter</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Nilai-Nilai IMM</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Prinsip yang menjadi pegangan setiap kader dalam bergerak</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HiGlobe, title: "Amar Ma'ruf", desc: 'Mengajak kepada kebaikan dan kebajikan', color: 'from-red-600 to-red-700' },
              { icon: HiHeart, title: 'Nahi Munkar', desc: 'Mencegah segala bentuk kemunkaran', color: 'from-yellow-500 to-yellow-600' },
              { icon: HiAcademicCap, title: 'Tajdid', desc: 'Pembaharuan pemikiran Islam yang progresif', color: 'from-green-600 to-green-700' },
              { icon: HiStar, title: 'Dakwah', desc: 'Menyebarkan kebaikan dan kebenaran', color: 'from-blue-600 to-blue-700' },
            ].map((item, i) => (
              <div key={i} className="group glass-dark rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 card-hover">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon size={28} className="text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PK Fakultas Teknik specific */}
      <section style={{ padding: '80px 0' }} className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-yellow-200 rounded-full w-80 h-80 -m-4 blur-xl opacity-30"></div>
                <img src="/IMG_4163.PNG" alt="Logo IMM Fakultas Teknik" className="w-72 h-72 object-contain relative z-10 animate-float" />
              </div>
            </div>
            <div>
              <span className="inline-block px-4 py-1.5 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Komisariat</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                PK <span className="text-gradient-imm">Fakultas Teknik</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Pimpinan Komisariat Fakultas Teknik merupakan unit IMM yang bergerak di lingkungan 
                Fakultas Teknik Universitas Muhammadiyah Makassar. Kami berkomitmen untuk 
                membina dan mengembangkan potensi mahasiswa teknik menjadi kader yang 
                berkualitas dan berdaya saing tinggi.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Lokasi', value: 'Fakultas Teknik Unismuh' },
                  { label: 'Universitas', value: 'Unismuh Makassar' },
                  { label: 'Status', value: 'Aktif' },
                  { label: 'Fokus', value: 'Pembinaan Kader' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">{item.label}</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
