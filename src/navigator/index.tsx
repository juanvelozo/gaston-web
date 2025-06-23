// src/navigator/index.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Auth pages

// Página protegida (ejemplo)
import Dashboard from '../modules/dashboard/pages/Dashboard';
import RegisterScreen from '../modules/auth/pages/Register';
import ForgotPasswordScreen from '../modules/auth/pages/ForgotPassword';
import LoginScreen from '../modules/auth/pages/Login';
import CreateTransationPage from '../modules/transactions/pages/CreateTransaccion';
import TransactionDetailPage from '../modules/transactions/pages/TransactionDetail';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />

          {/* transactions */}
          <Route path="/transactions/:id" element={<TransactionDetailPage />} />
          <Route path="/transactions/create" element={<CreateTransationPage />} />
        </Route>

        {/* Ruta 404 opcional */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
