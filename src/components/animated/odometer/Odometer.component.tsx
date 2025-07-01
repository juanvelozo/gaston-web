import { motion } from 'framer-motion';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function AnimatedLetter({ target }: { target: string }) {
  // Animamos un scroll vertical simulando que la letra sube hasta target
  // Para simplificar, generamos un scroll con todas las letras y solo mostramos la que coincida.

  return (
    <motion.div
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        height: 30,
        width: 20,
        verticalAlign: 'bottom',
      }}
    >
      <motion.div
        animate={{ y: -letters.indexOf(target) * 30 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, bounce: 2, duration: 0.5 }}
      >
        {letters.split('').map((l) => (
          <div key={l} style={{ height: 30, lineHeight: '30px', textAlign: 'center' }}>
            {l}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function OdometerText({ text }: { text: string }) {
  return (
    <div className="text-3xl flex items-center">
      {text
        .toUpperCase()
        .split('')
        .map((char, i) => (
          <AnimatedLetter key={i} target={char} />
        ))}
    </div>
  );
}
