import { useState } from 'react';
import { IUpdatePasswordDto } from '../model/profile.controller';
import { useProfile } from '../hooks/useProfile.hook';

const ProfileChangePasswordPage = (): React.JSX.Element => {
  const [formData, setFormData] = useState<IUpdatePasswordDto>({
    currentPassword: '',
    newPassword: '',
  });

  const { cambiarContraseña, errorAlCambiarContraseña } = useProfile();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        cambiarContraseña(formData);
      }}
    >
      {errorAlCambiarContraseña && <p>{errorAlCambiarContraseña}</p>}
      <label>
        Current Password:
        <input
          type="password"
          value={formData.currentPassword}
          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
        />
      </label>
      <br />
      <label>
        New Password:
        <input
          type="password"
          value={formData.newPassword}
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ProfileChangePasswordPage;
