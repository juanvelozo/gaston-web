import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button/Button.component';

/**
 * Generic reusable ChipSelect component
 *
 * @template T - The type of the selectable keys (e.g. string union)
 */
export interface ChipSelectProps<T extends string> {
  /**
   * Options to display, as an object where keys are the values, and values include label and icon.
   * Example:
   * {
   *   LOGIN: { label: "Login", icon: (active) => <LoginIcon color={active ? "#333" : "#fff"} /> },
   *   REGISTER: { label: "Register", icon: ... }
   * }
   */
  options: Record<T, { label: string; icon: (isSelected: boolean) => React.ReactNode }>;
  /** Called when selection changes, returns the selected key */
  onChange?: (selected: T) => void;
  /** Optionally control selected value externally */
  value?: T;
  /** Optionally set an initial value for uncontrolled usage */
  defaultValue?: T;
  /** Extra class names for container */
  className?: string;
}

export function ButtonGroup<T extends string>({
  options,
  onChange,
  value,
  defaultValue,
  className = '',
}: ChipSelectProps<T>) {
  const isControlled = value !== undefined;
  const [internalSelected, setInternalSelected] = useState<T | undefined>(defaultValue);

  const selected = isControlled ? value : internalSelected;

  function handleChange(val: T) {
    if (!isControlled) setInternalSelected(val);
    onChange?.(val);
  }

  return (
    <div
      className={`flex items-center gap-4 p-3 bg-brand-green shadow-sm rounded-full ${className}`}
    >
      {Object.entries(options).map(([key, value]) => {
        const typedKey = key as T;
        const isActive = selected === typedKey;
        const { label, icon } = value as {
          label: string;
          icon: (isSelected: boolean) => React.ReactNode;
        };

        return (
          <div key={key} className="relative w-full flex items-center justify-center">
            {isActive && (
              <motion.div
                layoutId="activeTypeTransaction"
                className="absolute inset-0 rounded-3xl z-0 will-change-transform"
                initial={false}
                animate={{
                  backgroundColor: '#fff',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 40,
                  duration: 0.3,
                }}
              />
            )}
            <Button
              variant="terciary"
              className={`relative z-10 flex flex-col items-center
                w-full cursor-pointer justify-center p-3 
                rounded-3xl font-bold ${isActive ? 'text-brand-green' : 'text-white '} transition-colors duration-200 focus:ring-0 focus:outline-none bg-transparent hover:bg-transparent`}
              onClick={() => handleChange(typedKey)}
              iconLeft={icon(isActive)}
            >
              {label}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
