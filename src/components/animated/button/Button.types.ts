import { HTMLMotionProps } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'terciary';

export interface IButtonProps extends HTMLMotionProps<'button'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}
