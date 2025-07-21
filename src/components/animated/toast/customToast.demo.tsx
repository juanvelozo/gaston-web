import { toast } from 'sonner';
import { Button } from '../button/Button.component';

const TostaditaDemo = ({}: ITostaditaDemo): React.JSX.Element => {
  return (
    <div className="flex gap-4 items-center flex-wrap">
      <Button
        onClick={() => {
          toast.info('TostaditaDemo', { description: '¡Bienvenidx!' });
        }}
        className="bg-brand-blue"
      >
        Demo info
      </Button>
      <Button
        onClick={() => {
          toast.warning('TostaditaDemo', { description: '¡Bienvenidx!' });
        }}
        className="bg-brand-yellow"
      >
        Demo warning
      </Button>
      <Button
        onClick={() => {
          toast.error('TostaditaDemo', { description: '¡Bienvenidx!' });
        }}
        className="bg-brand-coral"
      >
        Demo error
      </Button>
      <Button
        onClick={() => {
          toast.success('TostaditaDemo', { description: '¡Bienvenidx!' });
        }}
        className="bg-brand-green"
      >
        Demo success
      </Button>
    </div>
  );
};
interface ITostaditaDemo {}

export default TostaditaDemo;
