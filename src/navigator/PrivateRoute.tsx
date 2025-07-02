import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar/Navbar.component';

const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');

  return token ? (
    <header className="relative">
      <main className="pb-24 overflow-x-hidden">
        <Outlet />
      </main>

      <Navbar />
    </header>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
