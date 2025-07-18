import { useState } from 'react';
import { useLogin } from '../hooks/useLogin.hook';
import { ILoginRequest } from '../model/auth.model';
import { Link } from 'react-router-dom';
import Input from '../../../components/common/input/input.component';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Dollar, Lock, Mail } from 'iconoir-react';
import Formulario from '../../../components/common/formulario/formulario.component';
import { Button } from '../../../components/animated/button/Button.component';
import { GoogleIcon } from '../../../assets/svg/googleicon';
import { AppleIcon } from '../../../assets/svg/appleicon';

const LoginScreen = (): React.JSX.Element => {
  const { signIn, loading } = useLogin();

  const [formData, setFormData] = useState<ILoginRequest>({
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    await signIn(formData);
  }

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
      <div className="p-5 shadow-lg border rounded-3xl space-y-5 bg-white">
        <Formulario
          loading={!loading}
          onSubmit={handleSubmit}
          disabled={!formData.email || !formData.password}
          idleText="Entrar a mi cuenta"
        >
          <Input
            placeholder="Tu correo"
            type="email"
            name="email"
            iconLeft={<Mail />}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            placeholder="Tu contraseña"
            type="password"
            name="password"
            iconLeft={<Lock />}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <div className="flex items-center justify-end">
            <Link to="/recover-password">
              <span className="text-right text-brand-green text-sm font-bold my-3">
                ¿Olvidaste tu contraseña?
              </span>
            </Link>
          </div>
        </Formulario>
        {/* <div className="flex items-center justify-between gap-2">
          <div className="h-0.5 w-full  bg-gray-400" />
          <span className="truncate w-full">o seguí con</span>
          <div className="h-0.5 w-full  bg-gray-400" />
        </div>
        <Button
          variant="secondary"
          className="w-full rounded-2xl"
          iconLeft={<GoogleIcon className="w-5 h-5" />}
        >
          Continuar con Google
        </Button>
        <Button
          variant="secondary"
          className="w-full rounded-2xl"
          iconLeft={<AppleIcon className="w-5 h-5" />}
        >
          Continuar con Apple
        </Button> */}

        <div className="flex items-center justify-center py-2">
          <span className="text-center">
            ¿Primera vez por acá?{' '}
            <Link to="/register" className=" text-brand-green font-bold">
              Creá tu cuenta
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
