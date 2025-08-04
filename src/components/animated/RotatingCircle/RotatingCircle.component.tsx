import { useAnimationFrame, motion } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';

interface RotatingCircleProps {
  icons: string[];
  centerLogo?: string;
}

export default function RotatingCircle({ icons, centerLogo }: RotatingCircleProps) {
  const radius = 120;
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🔄 Animación suave y lenta
  useAnimationFrame(() => {
    setRotation((prev) => prev + 0.003); // más chico = más lento
  });

  const sizes = useMemo(() => {
    return icons.map(() => 32 + Math.random() * 32);
  }, [icons]);

  const containerSize = radius * 2 + 80;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto"
      style={{ width: containerSize, height: containerSize }}
    >
      {centerLogo && (
        <img
          src={centerLogo}
          alt="Center Logo"
          className="absolute left-1/2 top-1/2 w-24 h-24 object-contain bg-brand-white/60 p-3 rounded-full shadow-sm"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      )}

      <motion.div className="absolute inset-0" style={{ rotate: `${rotation}rad` }}>
        {icons.map((src, i) => {
          const angle = (i / icons.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const size = sizes[i] + 20;

          return (
            <motion.img
              key={i}
              src={src}
              className="absolute object-contain bg-brand-white/60 p-3 rounded-full shadow-sm"
              whileHover={{ scale: 1.2 }}
              style={{
                left: `calc(50% + ${x}px - ${size / 2}px)`,
                top: `calc(50% + ${y}px - ${size / 2}px)`,
                width: `${size}px`,
                height: `${size}px`,
                rotate: `${-rotation}rad`,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
