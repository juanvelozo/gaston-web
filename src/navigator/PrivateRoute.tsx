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
      <div className="relative h-screen flex flex-col flex-1 overflow-hidden">
        <main className="pb-24 ">
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
