import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile.hook';

const ProfilePage = (): React.JSX.Element => {
  const {
    profile: { data },
  } = useProfile();
  const navigate = useNavigate();

  return (
    <div>
      <span>Profile</span>
      {data?.data.profileImage && (
        <img
          src={data?.data.profileImage}
          alt={`profile photo ${data?.data.fullName}`}
          width={100}
          height={100}
        />
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => navigate('/profile/edit')}>Editar</button>
      <button onClick={() => navigate('/profile/change-password')}>Cambiar contraseña</button>
    </div>
  );
};

export default ProfilePage;
