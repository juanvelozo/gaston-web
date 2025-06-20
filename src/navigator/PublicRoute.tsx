// src/navigator/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("access_token");

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
