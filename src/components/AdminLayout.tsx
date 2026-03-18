import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const { isAuthenticated, isPengurus } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isPengurus) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-6 ml-0 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
