import { useEffect, useState } from 'react';
import { useProfile } from '../hooks/useProfile.hook';
import { IUpdateProfileDto } from '../model/profile.controller';
import AsyncButton from '../../../components/common/asyncButton/asyncButton.component';

const EditProfilePage = (): React.JSX.Element => {
  const {
    editar,

    profile: { data, loading: loadingPerfil },
    onSuccess,
  } = useProfile();

  const [formData, setFormData] = useState<IUpdateProfileDto>({
    fullName: '',
    profile_photo: '',
  });

  useEffect(() => {
    setFormData({
      fullName: data?.data.fullName || '',
      profile_photo: data?.data.profileImage || '',
    });
  }, [data]);

  if (loadingPerfil) return <span>Cargando...</span>;
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
            defaultValue={data?.data.fullName || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
          />
        </label>
        <br />
        <label>
          Imagen de perfil:
          {formData.profile_photo && (
            <img
              src={
                typeof formData.profile_photo === 'string'
                  ? formData.profile_photo
                  : URL.createObjectURL(formData.profile_photo as File)
              }
              alt="Profile"
              width={100}
              height={100}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFormData((prev) => ({ ...prev, profile_photo: file }));
              }
            }}
          />
        </label>
        <br />
        <AsyncButton
          onClick={() => editar(formData)}
          onSuccess={onSuccess}
          text="Guardar"
          loadingText="Guardando..."
        />
      </form>
    </div>
  );
};

export default EditProfilePage;
