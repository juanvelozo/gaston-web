import { useState } from 'react';
import { useRegister } from '../hooks/useRegister.hook';
import { IRegisterRequest } from '../model/auth.model';
import { Link } from 'react-router-dom';

const RegisterScreen = (): React.JSX.Element => {
  const { signUp } = useRegister();

  const [formData, setFormData] = useState<IRegisterRequest>({
    email: '',
    password: '',
    fullName: '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    signUp(formData);
  }

  return (
    <div>
      <span>LoginScreen</span>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </label>
        <br />
        <label>
          Nombre completo:
          <input
            type="text"
            name="fullname"
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Registrarse</button>
      </form>

      <br />
      <Link to="/login">Iniciar sesión</Link>
    </div>
  );
};

export default RegisterScreen;
