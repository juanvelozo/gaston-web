import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Wrapper que se encarga de resetear el scroll al principio de la página cada
 * vez que se cambia de ruta.
 *
 * Utiliza el hook `useLayoutEffect` para lograrlo. Este hook se ejecuta justo
 * después de que se haya renderizado el componente y se haya aplicado el layout.
 * En este caso, se utiliza para resetear el scroll al principio de la página
 * cada vez que se cambia de ruta.
 */
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  // Utilizamos el hook `useLocation` para obtener la ruta actual
  const location = useLocation();

  // Utilizamos el hook `useLayoutEffect` para resetear el scroll al principio
  // de la página cada vez que se cambia de ruta
  useLayoutEffect(() => {
    // Reseteamos el scroll al principio de la página
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  // Finalmente, renderizamos los hijos que se le pasan al componente
  return <>{children}</>;
};

// Exportamos el componente como default
export default Wrapper;
