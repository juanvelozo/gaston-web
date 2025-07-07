import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar/Navbar.component';
import Wrapper from './Wrapper';

const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');
  const location = useLocation();

  // Si alguna ruta empieza con una de las anteriores, lo ocultamos
  const shouldShowNavbar = !location.pathname.includes('/create');

  return token ? (
    <Wrapper>
      <header className="relative">
        <main className="pb-24 overflow-x-hidden">
          <Outlet />
        </main>
        {shouldShowNavbar && <Navbar />}
      </header>
    </Wrapper>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
