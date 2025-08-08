import { ReactNode } from 'react';
import { SessionActions } from '../components/onboarding/SessionButtons.component';
import LoginForm from '../components/session/LoginForm.component';
import RegisterForm from '../components/session/RegisterForm.component';
import { Button } from '../../../components/animated/button/Button.component';
import RotatingText from '../../../components/animated/RotatingText/RotatingText.component';
import CurvedLoop from '../../../components/animated/CurvedLoop/CurvedLoop.component';
import { Text, Title } from '../../../components/common/Typography/Typography.component';
import BitcoinLogo from '../../../assets/png/bitcoin-logo.png';
import ICPLogo from '../../../assets/png/icp-logo.png';
import USDTLogo from '../../../assets/png/tether-usdt-logo.png';
import ETHLogo from '../../../assets/png/ethereum-logo.png';
import MoneyLogo from '../../../assets/png/money-logo.png';
import GastonLogo from '../../../assets/png/Gaston-Logo.png';
import RotatingCircle from '../../../components/animated/RotatingCircle/RotatingCircle.component';
import { useNavigate } from 'react-router-dom';
import { NFIDButton } from '../components/session/NFIDSessionButton.component';
const Onboarding = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex min-h-screen overflow-hidden">
      <div className="w-full h-screen md:w-1/2 bg-brand-green/90 flex flex-col justify-around md:justify-between gap-4 md:gap-20 overflow-y-auto md:overflow-y-hidden overflow-x-hidden">
        <div className="mt-6">
          <CurvedLoop
            marqueeText="ARS USD BTC ICP USDT ETH SOL ADA"
            speed={1}
            curveAmount={100}
            interactive={false}
          />
        </div>
        <div className="hidden md:flex justify-center items-center h-[300px] flex-shrink-0">
          <RotatingCircle
            icons={[BitcoinLogo, ICPLogo, USDTLogo, ETHLogo, MoneyLogo]}
            centerLogo={GastonLogo}
          />
        </div>
        <div className="space-y-6 p-5 md:p-10">
          <div className="h-[70px] md:h-auto">
            <RotatingText
              texts={[
                'Mové tu dinero',
                'Compra, vendé y holdea tus criptomonedas',
                'Paga tus cuentas',
                'Recargá tus tarjetas',
                'Gestiona tus finanzas',
                'Paga en comercios físicos y online',
                'Tu plata, en todos lados, todo el tiempo',
                'Mantené tu dinero seguro y accesible',
              ]}
              className="text-xl sm:text-3xl md:text-4xl font-bold text-left text-brand-white "
              mainClassName=" overflow-hidden "
            />
          </div>
          <Title className="text-white">
            Gastón es la billetera que te ayuda a llevar tus finanzas
          </Title>
          <Text className="text-white">
            Con Gastón vas a poder operar en cripto y en tu moneda local, ver un reporte detallado
            de tus gastos e ingresos, categorizarlas y además gestionar tus servicios. ¿Sos muy
            gastón? ¡Gastón es para vos!
          </Text>
        </div>

        <div className="md:hidden w-full flex flex-col gap-4 p-5">
          <Button
            onClick={() => navigate(SessionValues['LOGIN'].route)}
            className="bg-brand-white text-brand-black hover:bg-white/90 border-none"
          >
            Iniciar sesión
          </Button>
          <Button
            onClick={() => navigate(SessionValues['REGISTER'].route)}
            variant="secondary"
            className="bg-transparent border-brand-white text-brand-white hover:bg-transparent"
          >
            Quiero registrarme
          </Button>
        </div>
      </div>
      <div className="w-1/2 hidden md:flex flex-col justify-between gap-10 p-4">
        <NFIDButton />
        {/* <SessionButtons onChange={setCurrentPath} />
        <div>
          <div className="p-5 space-y-5">
            <h2 className="text-6xl font-bold text-brand-black">¡Hola!</h2>

            <p className="text-xl text-brand-black">Nos alegra verte</p>
          </div>
          {SessionValues[currentPath].component}
        </div>
        <span className="text-center my-4">
          Al usar la plataforma aceptas los términos y condiciones de uso.
        </span> */}
      </div>
    </div>
  );
};

type SessionSelector = {
  [x in SessionActions]: {
    component: ReactNode;
    route: string;
  };
};

const SessionValues: SessionSelector = {
  LOGIN: {
    component: <LoginForm />,
    route: '/login',
  },
  REGISTER: {
    component: <RegisterForm />,
    route: '/register',
  },
};

export default Onboarding;
