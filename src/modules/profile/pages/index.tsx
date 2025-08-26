import PerfilSections from '../components/ProfileSections.component';
import { Button } from '../../../components/animated/button/Button.component';
import { LogOut } from 'iconoir-react';
import Section from '../../../components/animated/section/Section.component';
import { useAuth } from '../../auth/hooks/useAuth.hook';

const ProfilePage = (): React.JSX.Element => {
  // const {
  //   profile: { data, loading },
  // } = useProfile();
  const { cerrarSesion: handleLogout } = useAuth();

  return (
    <div className="flex-1 min-h-screen overflow-y-scroll">
      <Section
        title="Perfil"
        bgColor="blue"
        // loading={loading}
        // bottom={
        //   <div className="flex flex-col items-center justify-center gap-3">
        //     <Avatar src={data?.data.profileImage} />
        //     <h2 className="text-3xl text-brand-white">{data?.data.fullName}</h2>
        //     <span className="text-sm text-gray-300 ">{data?.data.email}</span>
        //   </div>
        // }
      >
        <PerfilSections />
        <Button
          iconLeft={<LogOut color="red" />}
          onClick={handleLogout}
          className="my-4 w-full border-red-500 text-red-500"
          variant="secondary"
        >
          Cerrar sesión
        </Button>
      </Section>
    </div>
  );
};

export default ProfilePage;
