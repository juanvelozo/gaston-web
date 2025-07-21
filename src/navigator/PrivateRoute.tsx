import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar/Navbar.component';
import Wrapper from './Wrapper';
import { useAuth } from '../hooks/useAuth.hook';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const shouldShowNavbar =
    !location.pathname.includes('/create') || !location.pathname.includes('/edit');

  if (isAuthenticated === null) {
    return <div>Cargando sesión...</div>; // o un spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Wrapper>
      <div className="relative h-screen flex flex-col flex-1 overflow-x-hidden">
        <main>
          <Outlet />
        </main>
        {shouldShowNavbar && <Navbar />}
      </div>
    </Wrapper>
  );
};

export default PrivateRoute;
