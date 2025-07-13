import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile.hook';
import { toast } from 'sonner';
import SectionHeader from '../../../components/common/sectionHeader/sectionHeader.component';
import colors from '../../../styles/colors';
import SectionBody from '../../../components/common/sectionBody/sectionBody.component';
import PerfilSections from '../components/ProfileSections.component';
import { useLogout } from '../../auth/hooks/useLogout.hook';
import { Button } from '../../../components/animated/button/Button.component';
import { LogOut } from 'iconoir-react';

const ProfilePage = (): React.JSX.Element => {
  const {
    profile: { data },
  } = useProfile();

  const { cerrarSesion } = useLogout();

  return (
    <div className="flex-1 h-screen">
      <SectionHeader title="Perfil" bgColor={colors.blue} />
      <span>Profile</span>
      {data?.data.profileImage && (
        <img
          src={data?.data.profileImage}
          alt={`profile photo ${data?.data.fullName}`}
          width={100}
          height={100}
        />
      )}
      <SectionBody>
        <PerfilSections />
        <Button
          iconLeft={<LogOut color="red" />}
          onClick={cerrarSesion}
          className="my-4 w-full border-red-500 text-red-500"
          variant="secondary"
        >
          Cerrar sesión
        </Button>
      </SectionBody>
    </div>
  );
};

export default ProfilePage;
