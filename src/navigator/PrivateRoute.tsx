// src/navigator/PrivateRoute.tsx
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  return token ? (
    <header>
      {/* {canGoBack && <button onClick={() => goBack(1)}>Atrás</button>} */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/transactions')}>Transacciones</button>
        <button onClick={() => navigate('/category')}>Categorías</button>
      </div>
      <Outlet />
    </header>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
