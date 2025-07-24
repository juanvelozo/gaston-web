import { useState } from 'react';
import colors, { Colors, themeColors } from '../../../styles/colors';
import { motion } from 'framer-motion';

const ColorPicker = ({ onPickColor }: IColorPicker): React.JSX.Element => {
  const colorsArray = Object.keys(themeColors);

  const [hex, setHex] = useState<string>(colorsArray[0]);

  function handlePick(color: keyof Colors) {
    setHex(color);
    onPickColor?.(color);
  }

  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-3">
      {colorsArray.map((color) => {
        const isActive = hex === color;
        return (
          <div
            key={color}
            className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24"
          >
            {isActive && (
              <motion.div
                layoutId="pickedColor"
                className="absolute inset-0 
                left-0 right-0 top-0 bottom-0 rounded-3xl z-0 w-20 h-20 sm:w-24 sm:h-24"
                initial={false}
                animate={{
                  backgroundColor: colors[color as keyof Colors] + '50',
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
              className={`relative w-16 sm:w-20 h-16 sm:h-20 rounded-3xl cursor-pointer bg-[${color}] flex items-center justify-center`}
              onClick={() => handlePick(color as keyof Colors)}
              style={{ backgroundColor: colors[color as keyof Colors] }}
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
  onPickColor?: (color: keyof Colors) => void;
}

export default ColorPicker;
