import { FormHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../../animated/button/Button.component';
import { cn } from '../../../libs/utils';

interface SubmitButtonProps {
  idleText?: string;
  loadingText?: string;
  disabled?: boolean;
}

const SubmitButton = ({
  idleText = 'Enviar',
  loadingText = 'Enviando...',
  disabled = false,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || disabled} className="w-full rounded-2xl">
      {pending ? loadingText : idleText}
    </Button>
  );
};

interface FormularioProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  idleText?: string;
  loadingText?: string;
  disabled?: boolean;
}

export default function Formulario({
  children,
  idleText,
  loadingText,
  disabled,
  ...props
}: FormularioProps) {
  return (
    <form {...props} className={cn('space-y-3', props.className)}>
      {children}
      <SubmitButton idleText={idleText} loadingText={loadingText} disabled={disabled} />
    </form>
  );
}
