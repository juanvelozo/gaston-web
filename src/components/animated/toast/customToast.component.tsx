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
          title: 'font-extrabold text-lg toast-title text-shadow-lg',
          description: 'text-lg font-light toast-description text-shadow-lg',
          icon: '!mr-8 !ml-1',
          warning: '!text-black',
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
