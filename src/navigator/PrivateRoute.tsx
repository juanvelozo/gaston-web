import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar/Navbar.component';
import Wrapper from './Wrapper';
import { useAuth } from '../modules/auth/hooks/useAuth.hook';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const shouldShowNavbar =
    !location.pathname.includes('/create') || !location.pathname.includes('/edit');

  if (isAuthenticated === null) {
    return <div>Cargando sesión...</div>; // o un spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/init" replace />;
  }

  return (
    <Wrapper>
      <div className="min-h-screen w-full overflow-x-hidden">
        <div className="relative md:static md:w-full h-screen flex flex-col md:flex-row-reverse flex-1 md:justify-between overflow-x-hidden">
          <main className="md:w-full">
            <Outlet />
          </main>
          {shouldShowNavbar && <Navbar />}
        </div>
      </div>
    </Wrapper>
  );
};

export default PrivateRoute;
