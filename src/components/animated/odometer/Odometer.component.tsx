import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../libs/utils';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,$-';

function AnimatedLetter({ target, letterHeight }: { target: string; letterHeight: number }) {
  return (
    <motion.div
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        height: letterHeight,
        width: '1ch',
        verticalAlign: 'bottom',
        userSelect: 'none',
      }}
    >
      <motion.div
        animate={{ y: -letters.indexOf(target) * letterHeight }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, bounce: 2, duration: 0.5 }}
      >
        {letters.split('').map((l) => (
          <div
            key={l}
            style={{
              height: letterHeight,
              lineHeight: `${letterHeight}px`,
              textAlign: 'center',
              fontFamily: 'monospace',
            }}
            className="drop-shadow-lg"
          >
            {l}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function OdometerText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [letterHeight, setLetterHeight] = useState(30); // valor por defecto

  useEffect(() => {
    if (ref.current) {
      const computed = window.getComputedStyle(ref.current);
      const fontSize = parseFloat(computed.fontSize || '30');
      setLetterHeight(fontSize);
    }
  }, []);

  const chars = text.toUpperCase().split('');

  return (
    <div ref={ref} className={cn('text-3xl flex items-center text-white font-mono', className)}>
      {chars.map((char, i) => (
        <AnimatedLetter key={i} target={char} letterHeight={letterHeight} />
      ))}
    </div>
  );
}
