import { FC, useEffect, useState } from 'react';
import { AsyncButtonProps } from './asyncButton.types';
import { motion } from 'framer-motion';
import './asyncButton.styles.css';

/**
 * Botón que muestra una barra de progreso mientras se ejecuta una función asíncrona
 * que se pasa como parámetro. El botón estará deshabilitado mientras se esté ejecutando
 * la función y se mostrará un texto de "Cargando..." mientras tanto. Si la función
 * se completa con éxito, se mostrará un texto de "Guardado" durante 2 segundos y luego
 * se volverá a habilitar el botón.
 *
 * @param {{ onClick: Function, text: string, onSuccess: Function, loadingText: string, disabled: boolean }} props
 * @prop {Function} onClick Función asíncrona que se ejecutará al hacer click en el botón
 * @prop {string} text Texto que se mostrará en el botón
 * @prop {Function} onSuccess Función que se ejecutará cuando se complete con éxito la función asíncrona
 * @prop {string} loadingText Texto que se mostrará mientras se está ejecutando la función asíncrona
 * @prop {boolean} disabled Si se pasa como true, el botón estará deshabilitado
 */

const MIN_DURATION_MS = 2000;

const AsyncButton: FC<AsyncButtonProps> = ({
  onClick,
  text = 'Guardar',
  onSuccess,
  loadingText = 'Cargando...',
  disabled = false,
}) => {
  /**
   * Estado que indica si se está ejecutando la función asíncrona
   */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Estado que indica el progreso de la función asíncrona, del 0 al 100
   */
  const [progress, setProgress] = useState<number>(0);

  /**
   * Estado que indica si se completó con éxito la función asíncrona
   */
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    /**
     * Intervalo que se encarga de aumentar el progreso cada 100ms
     */
    let interval: NodeJS.Timeout;

    /**
     * Si se está ejecutando la función asíncrona, se inicia el intervalo
     */
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        /**
         * Se aumenta el progreso en 5 puntos cada 100ms
         */
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);
    }

    /**
     * Se cancela el intervalo cuando se sale del componente
     */
    return () => clearInterval(interval);
  }, [loading]);

  /**
   * Función que se ejecuta al hacer click en el botón
   */
  async function handleClick(): Promise<void> {
    /**
     * Se muestra el loading y se inicia el progreso
     */
    setLoading(true);
    setSuccess(false);
    const start = Date.now();

    try {
      /**
       * Se ejecuta la función asíncrona
       */
      await onClick();
    } catch (error) {
      /**
       * Si hay error, se corta sin éxito
       */
      setLoading(false);
      setProgress(0);
      return;
    }

    /**
     * Se calcula el tiempo que falta para completar el progreso
     */
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, MIN_DURATION_MS - elapsed);

    /**
     * Se espera el tiempo que falta para completar el progreso y se muestra el
     * texto de "Guardado" durante 2 segundos
     */
    setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        onSuccess?.();
        setTimeout(() => setSuccess(false), 2000);
      }, 300);
    }, remaining);
  }

  return (
    <button
      className="custom-button !bg-brand-green w-full !text-white"
      onClick={handleClick}
      disabled={loading || success || disabled}
    >
      <span className="button-label">{loading ? loadingText : text}</span>

      {loading && (
        <motion.div
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear', duration: 0.15 }}
        />
      )}
    </button>
  );
};

export default AsyncButton;
