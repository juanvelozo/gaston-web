import { useState } from "react";
import { useLogin } from "../hooks/useLogin.hook";
import { ILoginRequest } from "../model/auth.model";

const LoginScreen = (): React.JSX.Element => {
  const { signIn } = useLogin();

  const [formData, setFormData] = useState<ILoginRequest>({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    signIn(formData);
  }

  return (
    <div>
      <span>LoginScreen</span>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </label>
        <br />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginScreen;
