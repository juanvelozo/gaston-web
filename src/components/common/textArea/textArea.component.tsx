import { TextareaHTMLAttributes, ReactNode, useId, useState } from 'react';
import clsx from 'clsx';

type Variant = 'solid' | 'transparent';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  variant?: Variant;
}

const Textarea = ({
  label,
  iconLeft,
  iconRight,
  variant = 'solid',
  className,
  ...props
}: Props) => {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const showFloating = focused || !!props.value;

  const baseStyles =
    'w-full px-4 py-2 rounded-xl backdrop-blur transition relative appearance-none outline-none resize-none min-h-[5rem]';
  const variants = {
    solid:
      'bg-slate-100 hover:bg-slate-200 border-b focus:bg-slate-200 border-slate-200 text-black',
    transparent: 'bg-white/10 text-black border-white/20',
  };

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            ' text-sm transition-all z-10',
            showFloating ? 'text-xs -top-1 text-gray-600 dark:text-gray-300' : 'text-gray-400'
          )}
        >
          {label}
        </label>
      )}

      <div className="flex items-start gap-2 relative">
        {iconLeft && <span className="pl-2 pt-2">{iconLeft}</span>}
        <textarea
          id={id}
          {...props}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={clsx(
            baseStyles,
            variants[variant],
            iconLeft && 'pl-10',
            iconRight && 'pr-10',
            className
          )}
        />
        {iconRight && <span className="pr-2 absolute right-2 top-2">{iconRight}</span>}
      </div>
    </div>
  );
};

export default Textarea;
