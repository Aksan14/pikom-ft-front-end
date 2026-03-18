import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import type { Article } from '../types';
import { HiBookOpen, HiFilter, HiUser } from 'react-icons/hi';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 9;

  useEffect(() => {
    fetchArticles();
  }, [category, page]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (category) params.append('category', category);
      const res = await api.get(`/articles?${params}`);
      if (res.data.success) {
        setArticles(res.data.data || []);
        setTotal(res.data.total);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-black text-white py-24 overflow-hidden">
        <div className="islamic-pattern absolute inset-0"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-green-400/5 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block px-4 py-1.5 glass text-xs font-bold rounded-full uppercase tracking-wider mb-6">Tulisan</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            Artikel & <span className="text-yellow-400">Kajian</span>
          </h1>
          <p className="text-green-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Bacaan Islami untuk memperluas wawasan dan meningkatkan keimanan
          </p>
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-12 h-1 rounded-full bg-red-500"></span>
            <span className="w-12 h-1 rounded-full bg-yellow-500"></span>
            <span className="w-12 h-1 rounded-full bg-green-500"></span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky z-10 shadow-sm" style={{ top: '68px' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center" style={{ gap: '12px', flexWrap: 'wrap' }}>
            <div className="flex items-center text-green-800" style={{ gap: '6px' }}>
              <HiFilter size={16} />
              <span style={{ fontSize: '13px' }} className="font-semibold">Filter:</span>
            </div>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="border border-gray-200 bg-gray-50 font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500"
              style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '13px' }}
            >
              <option value="">Semua Kategori</option>
              <option value="aqidah">Aqidah</option>
              <option value="akhlak">Akhlak</option>
              <option value="ilmu">Ilmu</option>
              <option value="sosial">Sosial</option>
              <option value="umum">Umum</option>
            </select>
            <span className="text-gray-400 font-medium" style={{ marginLeft: 'auto', fontSize: '13px' }}>{total} artikel ditemukan</span>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <LoadingSpinner />
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiBookOpen size={36} className="text-green-300" />
              </div>
              <p className="text-gray-400 text-lg font-medium">Belum ada artikel</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map(article => (
                  <Link key={article.id} to={`/artikel/${article.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group">
                    <div className="h-48 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center overflow-hidden">
                      {article.thumbnail ? (
                        <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <HiBookOpen size={48} className="text-white/20" />
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full capitalize">
                        {article.category}
                      </span>
                      <h3 className="text-lg font-extrabold text-gray-900 mt-4 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{article.excerpt}</p>
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center"><HiUser className="mr-1.5" size={14} />{article.author_name}</span>
                        <span>{new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        page === i + 1 ? 'bg-gradient-to-br from-green-700 to-green-800 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
