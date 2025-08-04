import { FC, PropsWithChildren } from 'react';
import { cn } from '../../../libs/utils';

export const Title: FC<ITypographyProps> = ({ children, className }) => {
  return <h1 className={cn('font-sora text-4xl font-bold', className)}>{children}</h1>;
};

export const Subtitle: FC<ITypographyProps> = ({ children, className }) => {
  return <h2 className={cn('font-sora text-2xl font-medium', className)}>{children}</h2>;
};

export const Text: FC<ITypographyProps> = ({ children, className }) => {
  return <p className={cn('font-work-sans text-base font-normal', className)}>{children}</p>;
};

export const NumberText: FC<ITypographyProps> = ({ children, className }) => {
  return (
    <span className={cn('font-space-mono text-3xl font-semibold', className)}>{children}</span>
  );
};

export const Label: FC<ITypographyProps> = ({ children, className }) => {
  return (
    <span className={cn('font-work-sans text-sm font-medium uppercase tracking-wide', className)}>
      {children}
    </span>
  );
};

interface ITypographyProps extends PropsWithChildren {
  className?: string;
}
