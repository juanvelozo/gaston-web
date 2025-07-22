import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin.hook';
import { ILoginRequest } from '../model/auth.model';
import { Link } from 'react-router-dom';
import Input from '../../../components/common/input/input.component';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Dollar, Eye, EyeClosed, Lock, Mail } from 'iconoir-react';
import Formulario from '../../../components/common/formulario/formulario.component';

const LoginScreen = (): React.JSX.Element => {
  const { signIn, loading } = useLogin();

  const [formData, setFormData] = useState<ILoginRequest>({
    email: '',
    password: '',
  });
  const [showPin, setShowPin] = useState<boolean>(false);
  const [recordarUsuario, setRecordarUsuario] = useState<boolean>(true);
  const [hayUsuarioRecordado, setHayUsuarioRecordado] = useState<boolean>(false);

  const emailGuardado = localStorage.getItem('email');

  function checkUsuarioRecordado(): void {
    if (emailGuardado) {
      setHayUsuarioRecordado(Boolean(emailGuardado));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    if (hayUsuarioRecordado) {
      await signIn({
        email: emailGuardado!,
        password: formData.password,
      });
    } else {
      await signIn(formData).then(() => {
        if (recordarUsuario) {
          localStorage.setItem('email', formData.email);
        }
      });
    }
  }

  useEffect(() => {
    checkUsuarioRecordado();
  }, []);

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
        {hayUsuarioRecordado ? (
          <Formulario loading={loading} onSubmit={handleSubmit} idleText="Entrar a mi cuenta">
            <Input
              placeholder="Tu PIN"
              type={showPin ? 'text' : 'password'}
              name="pin"
              value={formData.password}
              autoFocus
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
          </Formulario>
        ) : (
          <Formulario
            loading={loading}
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
              required
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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

            <div className="flex items-center justify-between my-3 gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-brand-green"
                  checked={recordarUsuario}
                  onChange={(e) => setRecordarUsuario(e.target.checked)}
                />
                <div onClick={() => setRecordarUsuario((prev) => !prev)}>
                  <span className="text-right text-brand-green text-sm font-bold cursor-pointer">
                    Recordar usuario
                  </span>
                </div>
              </div>
              <Link to="/recover-password">
                <span className="text-right text-brand-green text-sm font-bold">
                  ¿Olvidaste tu contraseña?
                </span>
              </Link>
            </div>
          </Formulario>
        )}
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
          {hayUsuarioRecordado ? (
            <div
              onClick={() => {
                setHayUsuarioRecordado(false);
              }}
            >
              <span className=" text-brand-green font-bold cursor-pointer">
                Iniciar sesión con otra cuenta
              </span>
            </div>
          ) : (
            <span className="text-center">
              ¿Primera vez por acá?{' '}
              <Link to="/register" className=" text-brand-green font-bold">
                Creá tu cuenta
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
