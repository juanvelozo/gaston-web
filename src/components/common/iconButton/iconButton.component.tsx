import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../libs/utils';

type IconButtonProps = {
  icon: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ icon, className = '', ...props }: IconButtonProps) => {
  return (
    <button
      className={cn(
        'bg-white/20 hover:bg-white/30 text-white p-2 rounded-2xl transition-all duration-200 active:scale-95 ',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
