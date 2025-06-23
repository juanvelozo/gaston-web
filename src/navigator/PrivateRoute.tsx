// src/navigator/PrivateRoute.tsx
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useLogout } from '../modules/auth/hooks/useLogout.hook';

const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const { cerrarSesion } = useLogout();

  return token ? (
    <header>
      {/* {canGoBack && <button onClick={() => goBack(1)}>Atrás</button>} */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/transactions')}>Transacciones</button>
        <button onClick={() => navigate('/categories')}>Categorías</button>
        <button onClick={() => navigate('/profile')}>Perfil</button>
        <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
      </div>
      <Outlet />
    </header>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
