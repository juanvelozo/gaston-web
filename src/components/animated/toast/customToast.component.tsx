// components/ui/Tostadita.tsx
import { toast, Toaster } from 'sonner';
import colors from '../../../styles/colors';
import { CheckCircle, InfoCircle, WarningTriangleSolid, XmarkCircle } from 'iconoir-react';

const Tostadita = (): React.JSX.Element => {
  return (
    <Toaster
      position="top-center"
      richColors={false}
      toastOptions={{
        classNames: {
          toast: 'toast-base',
          title: 'font-semibold text-lg',
          description: 'text-sm',
          icon: '!mr-3',
        },
        duration: 4000,
      }}
      icons={{
        success: <CheckCircle className="w-6 h-6 text-green-500" />,
        error: <XmarkCircle className="w-6 h-6 text-red-500" />,
        warning: <WarningTriangleSolid className="w-6 h-6 text-yellow-400" />,
        info: <InfoCircle className="w-6 h-6 text-teal-400" />,
      }}
    />
  );
};

export default Tostadita;
