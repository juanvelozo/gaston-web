import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { cn } from '../../../libs/utils';

type ButtonVariant = 'primary' | 'secondary' | 'terciary';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center px-4 py-2 rounded-2xl text-sm font-medium transition-colors focus:outline-none  disabled:opacity-50 disabled:pointer-events-none';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white hover:bg-zinc-800 focus:ring-black',
  secondary: 'bg-white text-black border border-black hover:bg-zinc-100 focus:ring-zinc-400',
  terciary: 'bg-transparent text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-300',
};
const loadingStyles: Record<ButtonVariant, string> = {
  primary: 'border-white/40 border-t-white',
  secondary: 'border-black/30 border-t-black',
  terciary: 'border-zinc-500/30 border-t-zinc-500',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', loading, iconLeft, iconRight, children, className, disabled, ...props },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.05 }}
        className={cn(baseStyles, variantStyles[variant], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span
            className={cn('h-4 w-4 rounded-full animate-spin border-2', loadingStyles[variant])}
          />
        ) : (
          <div className="flex gap-2 items-center text-ellipsis truncate w-min-0">
            {iconLeft && <span>{iconLeft}</span>}
            {children}
            {iconRight && <span>{iconRight}</span>}
          </div>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
