import { Toaster } from 'sonner';
import { CheckCircle, InfoCircle, WarningTriangleSolid, XmarkCircle } from 'iconoir-react';

const Tostadita = (): React.JSX.Element => {
  return (
    <Toaster
      position="top-center"
      richColors={false}
      toastOptions={{
        classNames: {
          toast: 'toast-base',
          title: 'toast-title',
          description: 'toast-description',
          icon: '!mr-8 !ml-1',
        },
        duration: 4000,
      }}
      icons={{
        success: <CheckCircle className="w-10 h-10 text-green-200" />,
        error: <XmarkCircle className="w-10 h-10 text-white" />,
        warning: <WarningTriangleSolid className="w-10 h-10 text-yellow-300" />,
        info: <InfoCircle className="w-10 h-10 text-teal-200" />,
      }}
    />
  );
};

export default Tostadita;
