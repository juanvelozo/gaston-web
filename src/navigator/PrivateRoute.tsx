// src/navigator/PrivateRoute.tsx
import { Navigate, Outlet, useNavigationType } from 'react-router-dom';
import { useGoBack } from '../hooks/useGoBack';

const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');
  const navigationType = useNavigationType();
  const { goBack } = useGoBack();

  // PUSH y REPLACE indican que hay una navegación previa posible
  const canGoBack = navigationType === 'PUSH' || navigationType === 'REPLACE';

  return token ? (
    <header>
      {canGoBack && <button onClick={() => goBack(1)}>Atrás</button>}
      <Outlet />
    </header>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
