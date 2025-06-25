import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './asyncButton.styles.css';

interface AsyncButtonProps {
  onClick: () => Promise<void>;
  onSuccess?: () => void;
  disabled?: boolean;
  text?: string;
  loadingText?: string;
}

const MIN_DURATION_MS = 2000;

const AsyncButton = ({
  onClick,
  text = 'Guardar',
  onSuccess,
  loadingText = 'Cargando...',
  disabled = false,
}: AsyncButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [loading]);

  const handleClick = async () => {
    setLoading(true);
    setSuccess(false);
    const start = Date.now();

    try {
      await onClick();
    } catch (error) {
      // Si hay error, cortamos sin éxito
      setLoading(false);
      setProgress(0);
      return;
    }

    const elapsed = Date.now() - start;
    const remaining = Math.max(0, MIN_DURATION_MS - elapsed);

    setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        onSuccess?.();
        setTimeout(() => setSuccess(false), 2000);
      }, 300);
    }, remaining);
  };

  return (
    <button
      className="custom-button"
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
