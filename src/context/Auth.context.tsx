import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import api from '../api/api';
import { IBaseResponse } from '../types/proyect.model';

interface AuthContextType {
  isAuthenticated: boolean | null;
  checkAuthStatus: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Función para verificar el estado de la sesión con el backend
  const checkAuthStatus = useCallback(async () => {
    try {
      // Intentar una solicitud a un endpoint protegido para validar la cookie
      const response = await api.get<
        IBaseResponse<{
          isAuthenticated: boolean;
        }>
      >('/auth/status');
      setIsAuthenticated(response.data.data.isAuthenticated);
    } catch (error) {
      // Si la solicitud falla (ej. 401), significa que la sesión no es válida
      setIsAuthenticated(false);
      localStorage.clear(); // Limpia cualquier residuo de localStorage
    }
  }, []);

  useEffect(() => {
    // Verifica el estado de la sesión al cargar la aplicación
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
