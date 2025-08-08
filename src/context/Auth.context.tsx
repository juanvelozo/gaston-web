import { AuthClient } from '@dfinity/auth-client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean | null;
  principal: string | null;
  checkAuthStatus: () => void;
  iniciarSesion(): Promise<void>;
  cerrarSesion(): Promise<void>;
  limpiarSesionNFID(): void;
  cargando: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [principal, setPrincipal] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function checkAuthStatus() {
    const storedPrincipal = localStorage.getItem('principal');
    setPrincipal(storedPrincipal);
    setIsAuthenticated(!!storedPrincipal);
  }

  async function handleLogout() {
    try {
      const authClient = await AuthClient.create();
      await authClient.logout({ returnTo: window.location.origin });
      localStorage.removeItem('principal');
      limpiarSesionNFID();
      checkAuthStatus();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    try {
      setLoading(true);
      const authClient = await AuthClient.create();

      if (await authClient.isAuthenticated()) {
        checkAuthStatus();
        return;
      }

      await authClient.login({
        identityProvider: 'https://nfid.one/authenticate?w',
        windowOpenerFeatures:
          'toolbar=0,location=0,menubar=0,width=500,height=600,left=100,top=100',

        onSuccess: () => {
          const p = authClient.getIdentity().getPrincipal().toText();
          localStorage.setItem('principal', p);
          checkAuthStatus();
        },
        onError: (err) => {
          console.error('Error en login:', err);
        },
      });
    } catch (error) {
      console.error('Error autenticando con NFID:', error);
    } finally {
      setLoading(false);
    }
  }

  // 👇 función para cerrar sesión en NFID (abre popup para limpiar cookie)
  function limpiarSesionNFID() {
    window.open('https://nfid.one/authenticate?logout=true', '_blank');
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        principal,
        checkAuthStatus,
        iniciarSesion: handleLogin,
        cerrarSesion: handleLogout,
        limpiarSesionNFID,
        cargando: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
