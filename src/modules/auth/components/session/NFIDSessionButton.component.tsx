import React from 'react';
import { Button } from '../../../../components/animated/button/Button.component';
import { Internet } from 'iconoir-react';
import { useAuth } from '../../hooks/useAuth.hook';

export const NFIDButton: React.FC = () => {
  const { iniciarSesion: handleLogin, cargando } = useAuth();

  return (
    <Button
      variant="secondary"
      onClick={handleLogin}
      iconLeft={<Internet />}
      disabled={cargando}
      loading={cargando}
    >
      Iniciar sesión con NFID
    </Button>
  );
};
