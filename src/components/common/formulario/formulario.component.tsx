import { FormHTMLAttributes } from 'react';
import { Button } from '../../animated/button/Button.component';
import { cn } from '../../../libs/utils';
import { IButtonProps } from '../../animated/button/Button.types';

interface FormularioProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  idleText?: string;
  loadingText?: string;
  disabled?: boolean;
  loading?: boolean;
  buttonProps?: IButtonProps;
}

export default function Formulario({
  children,
  idleText = 'Enviar',
  loadingText = 'Cargando...',
  disabled,
  loading,
  buttonProps,
  ...props
}: FormularioProps) {
  return (
    <form {...props} className={cn('space-y-3', props.className)}>
      {children}
      <Button
        type="submit"
        disabled={loading || disabled}
        className={cn('w-full', buttonProps?.className)}
        {...buttonProps}
      >
        {loading ? loadingText : idleText}
      </Button>
    </form>
  );
}
