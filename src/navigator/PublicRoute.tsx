import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.hook';
import { useEffect } from 'react';

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [location.pathname]);

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
