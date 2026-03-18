import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import type { Article } from '../types';
import { HiArrowLeft, HiUser, HiCalendar } from 'react-icons/hi';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/articles/${id}`).then(res => {
      if (res.data.success) setArticle(res.data.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!article) return <div className="text-center py-20 text-gray-500">Artikel tidak ditemukan</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-10">
        <Link to="/artikel" className="inline-flex items-center text-green-700 hover:text-green-800 mb-8 font-medium text-sm group">
          <HiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Artikel
        </Link>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {article.thumbnail ? (
            <img src={article.thumbnail} alt={article.title} className="w-full h-72 object-cover" />
          ) : (
            <div className="h-48 bg-gradient-to-br from-green-700 to-green-900 relative">
              <div className="islamic-pattern absolute inset-0"></div>
            </div>
          )}

          <div className="p-8 md:p-10">
            <span className="text-sm font-bold text-green-700 bg-green-50 px-4 py-1.5 rounded-full capitalize">
              {article.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">{article.title}</h1>

            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-10 pb-8 border-b border-gray-100">
              <span className="flex items-center"><div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2"><HiUser className="text-green-700" size={14} /></div>{article.author_name}</span>
              <span className="flex items-center"><div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2"><HiCalendar className="text-green-700" size={14} /></div>{new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
