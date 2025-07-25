import { useState } from 'react';
import { useRegister } from '../hooks/useRegister.hook';
import { IRegisterRequest } from '../model/auth.model';
import { Link } from 'react-router-dom';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Dollar, Eye, EyeClosed, Lock, Mail } from 'iconoir-react';
import Input from '../../../components/common/input/input.component';
import Formulario from '../../../components/common/formulario/formulario.component';

const RegisterScreen = (): React.JSX.Element => {
  const { signUp, loading } = useRegister();

  const [formData, setFormData] = useState<IRegisterRequest>({
    email: '',
    password: '',
    fullName: '',
  });
  const [showPin, setShowPin] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    signUp(formData);
  }

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
      <div className="p-5 shadow-lg border rounded-3xl space-y-5 bg-white 90o00km,,,,,,,,,,,,,,,tgf">
        <Formulario
          onSubmit={handleSubmit}
          disabled={!formData.email || !formData.password}
          idleText="Crear mi cuenta"
          loading={loading}
        >
          <Input
            placeholder="Tu nombre completo"
            type="text"
            name="fullName"
            iconLeft={<Lock />}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <Input
            placeholder="Tu correo"
            type="email"
            name="email"
            iconLeft={<Mail />}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            placeholder="Tu PIN"
            type={showPin ? 'text' : 'password'}
            name="pin"
            value={formData.password}
            iconLeft={<Lock />}
            onChange={(e) => {
              if (/^\d{0,6}$/.test(e.target.value)) {
                setFormData({ ...formData, password: e.target.value });
              }
            }}
            inputMode="numeric"
            iconRight={
              <div onClick={() => setShowPin((prev) => !prev)}>
                {showPin ? <EyeClosed fontSize={16} /> : <Eye fontSize={16} />}
              </div>
            }
            pattern="[0-9]{0,6}"
            maxLength={6}
            required
          />
          <span className=" text-gray-600 text-sm ">Mínimo 6 caracteres</span>
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
            ¿Ya tenes una cuenta?{' '}
            <Link to="/login" className=" text-brand-green font-bold">
              Inicia sesión acá
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
