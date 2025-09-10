import {
  CoinsSwap,
  SendDiagonal,
  Download,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownLeft,
} from 'iconoir-react';
import ActionCard from '../../../components/common/ActionCard/ActionCard.component';
import { Text, Title } from '../../../components/common/Typography/Typography.component';
import LastTransactions from '../components/LastTransactionsCard';
import MainCard from '../components/mainCard.component';
import { openReceiveModal } from '../../../components/common/ReceiveModal/ReceiveModal.component';

const DashboardPages = (): React.JSX.Element => {
  return (
    <div className="bg-brand-white space-y-2 !w-full">
      <div
        className="
          grid gap-4 md:gap-5 p-4 h-screen w-full
          grid-cols-1 grid-rows-none
          sm:grid-cols-2 sm:auto-rows-min
          md:grid-cols-4 md:grid-rows-[1fr_1fr_1fr]
        "
      >
        {/* Header para mobile */}
        <div className="inline-block w-full md:hidden mt-10 col-span-1 sm:col-span-2">
          <Title className="text-brand-black font-sora">¡Hola!</Title>
          <br />
          <Text className="text-brand-black/70 font-work-sans">
            Este es tu panel principal. En él, tendrás acceso a distintos atajos, información
            general de tus tokens, gastos e ingresos.
          </Text>
        </div>

        {/* Main Cards */}
        <MainCard />
        <LastTransactions />

        {/* Action Cards - Reordenadas para llenar espacios */}
        <ActionCard
          title="Enviar"
          description="Transferir fondos a otros usuarios"
          icon={<ArrowUpRight color="white" width={42} height={42} />}
          backgroundColor="green"
          showChart={true}
          chartType="send"
          className="col-span-1 sm:col-span-1 md:col-start-3 md:col-span-1 row-span-1 md:row-start-2 md:row-end-3 "
        />

        <ActionCard
          title="Recibir"
          description="Obtener pagos de otros usuarios"
          icon={<ArrowDownLeft color="white" width={42} height={42} />}
          backgroundColor="coral"
          showChart={true}
          chartType="receive"
          onClick={openReceiveModal}
          className="col-span-1 sm:col-span-1 md:col-start-4 md:col-span-1 row-span-1 md:row-start-2 md:row-end-3 "
        />

        <ActionCard
          title="Mi Billetera"
          description="Gestionar tokens y configuraciones"
          icon={<Wallet color="white" width={42} height={42} />}
          backgroundColor="skyBlue"
          className="
            col-span-1 sm:col-span-1 md:col-start-1 md:col-span-1 
            row-span-1 md:row-start-3 md:row-end-4 !h-32
          "
        />

        <ActionCard
          title="Intercambiar"
          description="Convertir entre diferentes criptomonedas"
          icon={<CoinsSwap color="white" width={42} height={42} />}
          backgroundColor="burntOrange"
          className="
            col-span-1 sm:col-span-1 md:col-start-2 md:col-span-1 
            row-span-1 md:row-start-3 md:row-end-4 !h-32
          "
        />
      </div>
    </div>
  );
};

export default DashboardPages;
