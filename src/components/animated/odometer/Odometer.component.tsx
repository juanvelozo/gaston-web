import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
// Asegúrate de que la ruta a tu utilidad `cn` sea correcta
import { cn } from '../../../libs/utils';

// Cadena de letras y números, incluyendo el espacio al final
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,$- ';

function AnimatedLetter({
  target,
  letterHeight,
  shouldAnimate,
}: {
  target: string;
  letterHeight: number;
  shouldAnimate: boolean;
}) {
  // Manejo especial para el espacio: no se anima, solo ocupa su lugar
  if (target === ' ') {
    return (
      <div
        style={{
          display: 'inline-block',
          height: letterHeight,
          width: '1ch', // Un ancho para el espacio
          lineHeight: `${letterHeight}px`,
          verticalAlign: 'bottom',
          userSelect: 'none',
          textAlign: 'center', // Opcional, para centrar si hay contenido
        }}
      >
        &nbsp; {/* Carácter de espacio no rompible */}
      </div>
    );
  }

  // Obtenemos el índice del carácter target en nuestra cadena 'letters'
  const targetIndex = letters.indexOf(target);

  // Si el carácter target no se encuentra en nuestra cadena 'letters',
  // lo mostramos directamente sin animación para evitar errores.
  if (targetIndex === -1) {
    console.warn(
      `Character "${target}" not found in 'letters' string. It will be displayed directly.`
    );
    return (
      <div
        style={{
          display: 'inline-block',
          height: letterHeight,
          width: '1ch',
          lineHeight: `${letterHeight}px`,
          verticalAlign: 'bottom',
          userSelect: 'none',
          textAlign: 'center',
          fontFamily: 'monospace',
        }}
      >
        {target}
      </div>
    );
  }

  return (
    <motion.div
      style={{
        display: 'inline-block',
        overflow: 'hidden', // Importante para ocultar las letras que no se están mostrando
        height: letterHeight,
        width: '1ch', // 1ch es el ancho de un carácter
        verticalAlign: 'bottom',
        userSelect: 'none',
      }}
    >
      <motion.div
        // Condición para la animación:
        // Si shouldAnimate es true, se anima a la posición del target.
        // Si shouldAnimate es false, se establece la posición del target instantáneamente.
        // Esto asegura que la letra correcta siempre se muestre.
        animate={
          shouldAnimate ? { y: -targetIndex * letterHeight } : { y: -targetIndex * letterHeight }
        }
        transition={{
          type: 'tween',
          ease: 'easeOut',
          duration: 0.75, // Duración de la animación
          // 'bounce' ha sido eliminado para asegurar que la animación llegue al valor exacto
        }}
        // 'willChange' para optimización de rendimiento en la animación
        style={{ willChange: 'transform' }}
      >
        {/* Mapea todas las letras para crear la "rueda" del odómetro */}
        {letters.split('').map((l) => (
          <div
            key={l} // Key única para cada letra en la rueda
            style={{
              height: letterHeight,
              lineHeight: `${letterHeight}px`, // Centra la letra verticalmente
              textAlign: 'center',
              fontFamily: 'monospace', // Fuente monoespacio para alineación uniforme
            }}
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
  // Almacena el texto anterior para determinar si una letra debe animarse
  const previousTextRef = useRef<string[]>([]);

  // Estado para la altura de las letras, inicializado con un valor por defecto
  const [letterHeight, setLetterHeight] = useState(30);

  // Efecto para calcular la altura de las letras basándose en el tamaño de fuente del contenedor
  useEffect(() => {
    if (ref.current) {
      const computed = window.getComputedStyle(ref.current);
      // Parsea el tamaño de fuente, si no es válido usa el valor por defecto
      const fontSizePx = computed.fontSize ? parseFloat(computed.fontSize) : 30;
      setLetterHeight(fontSizePx);
      // Opcional: Descomenta para depurar la altura calculada
      // console.log('Calculated Letter Height:', fontSizePx);
    }
  }, []); // El array de dependencias vacío asegura que se ejecute una sola vez al montar

  // Divide el texto actual en caracteres individuales y los convierte a mayúsculas
  const chars = text.toUpperCase().split('');

  // Efecto para actualizar el previousTextRef cuando el 'text' prop cambia
  useEffect(() => {
    previousTextRef.current = chars;
  }, [text]); // Se ejecuta cada vez que el prop 'text' cambia

  // Si letterHeight aún no se ha calculado (por ejemplo, en el primer render),
  // puedes renderizar un estado de carga o null.
  if (!letterHeight) {
    return (
      <div ref={ref} className={cn('text-3xl flex items-center text-white font-mono', className)}>
        Cargando odómetro...
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('text-3xl flex items-center text-white font-mono', className)}>
      {chars.map((char, i) => {
        // Obtiene el carácter anterior en la misma posición
        const previousChar = previousTextRef.current[i];
        // Determina si la letra debe animarse: si es diferente al carácter anterior
        // (o si es una letra nueva/no existía antes en esa posición)
        const shouldAnimate = previousChar !== char;

        return (
          <AnimatedLetter
            key={i} // Usamos el índice como key. Para listas con cambios de orden complejos, se preferiría una key más robusta.
            // Pero para un odómetro donde los cambios son secuenciales, 'i' suele ser suficiente.
            target={char}
            letterHeight={letterHeight}
            shouldAnimate={shouldAnimate}
          />
        );
      })}
    </div>
  );
}
