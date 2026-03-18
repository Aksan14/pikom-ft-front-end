import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import ManageEvents from './pages/admin/ManageEvents';
import ManageArticles from './pages/admin/ManageArticles';
import ManageMembers from './pages/admin/ManageMembers';
import ManageMedia from './pages/admin/ManageMedia';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/kegiatan" element={<Events />} />
            <Route path="/kegiatan/:id" element={<EventDetail />} />
            <Route path="/artikel" element={<Articles />} />
            <Route path="/artikel/:id" element={<ArticleDetail />} />
            <Route path="/kontak" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/kegiatan" element={<ManageEvents />} />
            <Route path="/admin/artikel" element={<ManageArticles />} />
            <Route path="/admin/anggota" element={<ManageMembers />} />
            <Route path="/admin/media" element={<ManageMedia />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
