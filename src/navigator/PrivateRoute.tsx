import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar/Navbar.component';
import Wrapper from './Wrapper';

const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');

  return token ? (
    <Wrapper>
      <header className="relative">
        <main className="pb-24 overflow-x-hidden">
          <Outlet />
        </main>

        <Navbar />
      </header>
    </Wrapper>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
