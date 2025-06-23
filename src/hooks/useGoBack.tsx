// src/hooks/useBack.ts
import { useNavigate } from 'react-router-dom';

/**
 * Hook para ir hacia atrás en el historial de navegación.
 * @returns {goBack} - Función que acepta un número de pasos para retroceder (por defecto 1).
 */
export const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = (steps: number = 1) => {
    navigate(-steps);
  };

  return { goBack };
};
