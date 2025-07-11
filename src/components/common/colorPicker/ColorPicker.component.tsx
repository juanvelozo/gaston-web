import { useState } from 'react';
import { themeColors } from '../../../styles/colors';
import { motion } from 'framer-motion';

const ColorPicker = ({ onPickColor }: IColorPicker): React.JSX.Element => {
  const [hex, setHex] = useState<string>();

  function handlePick(color: string) {
    setHex(color);
    onPickColor?.(color);
  }

  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-4">
      {Object.values(themeColors).map((color) => {
        const isActive = hex === color;
        return (
          <div key={color} className="relative flex items-center justify-center  w-24 h-24">
            {isActive && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 
                left-0 right-0 top-0 bottom-0 rounded-3xl z-0 w-24 h-24"
                initial={false}
                animate={{
                  backgroundColor: color + '50',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  duration: 0.3,
                }}
              />
            )}
            <div
              className={`relative w-20 h-20 rounded-3xl cursor-pointer bg-[${color}] flex items-center justify-center`}
              onClick={() => handlePick(color)}
              style={{ backgroundColor: color }}
            >
              {isActive && (
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',

                    type: 'spring',
                    stiffness: 500,
                  }}
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
interface IColorPicker {
  onPickColor?: (color: string) => void;
}

export default ColorPicker;
