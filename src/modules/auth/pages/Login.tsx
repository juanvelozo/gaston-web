import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Dollar } from 'iconoir-react';
import LoginForm from '../components/session/LoginForm.component';

const LoginScreen = (): React.JSX.Element => {
  return (
    <div className="p-5 space-y-5 flex-1 bg-brand-white h-screen w-full mb-8">
      <div className="flex items-center justify-normal flex-col gap-4">
        <IconButton
          icon={<Dollar className="w-10 h-10" color="#fff" />}
          className="bg-brand-green"
        />
        <h2 className="text-3xl font-bold text-brand-black">¡Hola!</h2>
        <p className="text-sm text-brand-black">Nos alegra verte</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginScreen;
