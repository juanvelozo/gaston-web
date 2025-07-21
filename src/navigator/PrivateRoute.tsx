import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar/Navbar.component';
import Wrapper from './Wrapper';
import { useAuth } from '../hooks/useAuth.hook';
import { useEffect } from 'react';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Si alguna ruta empieza con una de las anteriores, lo ocultamos
  const shouldShowNavbar =
    !location.pathname.includes('/create') || !location.pathname.includes('/edit');

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [location.pathname]);

  return isAuthenticated ? (
    <Wrapper>
      <div className="relative h-screen flex flex-col flex-1 overflow-x-hidden">
        <main>
          <Outlet />
        </main>
        {shouldShowNavbar && <Navbar />}
      </div>
    </Wrapper>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
