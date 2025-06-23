import { useState } from 'react';
import { useProfile } from '../hooks/useProfile.hook';
import { IUpdateProfileDto } from '../model/profile.controller';

const EditProfilePage = (): React.JSX.Element => {
  const {
    editar,
    profile: { data },
  } = useProfile();

  const [formData, setFormData] = useState<IUpdateProfileDto>({
    fullName: data?.data.fullName,
    profile_photo: data?.data.profileImage,
  });

  return (
    <div>
      <span>EditProfile</span>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          editar(formData);
        }}
      >
        <label>
          Nombre completo:
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
          />
        </label>
        <br />
        <label>
          Imagen de perfil:
          <input
            type="text"
            value={formData.profile_photo}
            onChange={(e) => setFormData((prev) => ({ ...prev, profile_photo: e.target.value }))}
          />
        </label>
        <br />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
