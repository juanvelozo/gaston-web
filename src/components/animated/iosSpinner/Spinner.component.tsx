import { motion, Variants } from 'framer-motion';

export function IOSSpinner({ size = 40, color = 'text-white' }: { size?: number; color?: string }) {
  const dots = Array.from({ length: 12 });
  const radius = size / 2;
  const dotWidth = size * 0.12; // más chico que antes para que parezca más sutil
  const dotHeight = size * 0.28;

  const spinnerVariants: Variants = {
    animate: (i: number) => ({
      opacity: [0.2, 1, 0.2],
      transition: {
        repeat: Infinity,
        duration: 1.2,
        ease: 'linear',
        delay: i * (1.2 / dots.length), // escalonado según el índice
      },
    }),
  };

  return (
    <div className={`relative ${color}`} style={{ width: size, height: size }}>
      {dots.map((_, i) => {
        const angle = (i * 360) / dots.length;

        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-current"
            style={{
              width: `${dotWidth}px`,
              height: `${dotHeight}px`,
              top: `${radius - dotHeight / 2}px`,
              left: `${radius - dotWidth / 2}px`,
              transform: `rotate(${angle}deg) translateY(-${radius - dotHeight / 2}px)`,
              transformOrigin: 'center',
            }}
            variants={spinnerVariants}
            animate="animate"
            custom={i}
          />
        );
      })}
    </div>
  );
}
