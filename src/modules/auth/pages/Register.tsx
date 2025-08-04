import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Dollar } from 'iconoir-react';
import RegisterForm from '../components/session/RegisterForm.component';

const RegisterScreen = (): React.JSX.Element => {
  return (
    <div className="p-5 space-y-5 bg-brand-white h-screen w-full">
      <div className="flex items-center justify-normal flex-col gap-4">
        <IconButton
          icon={<Dollar className="w-10 h-10" color="#fff" />}
          className="bg-brand-green"
        />
        <h2 className="text-3xl font-bold text-brand-black">¡Empecemos juntos!</h2>
        <p className="text-sm text-brand-black text-center w-4/5">
          Creá tu cuenta y empecemos a organizar juntos tus finanzas
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterScreen;
