import { ArrowDownRight, ArrowUpRight, CoinsSwap } from 'iconoir-react';
import CurvedLoop from '../../../components/animated/CurvedLoop/CurvedLoop.component';
import OdometerText from '../../../components/animated/odometer/Odometer.component';
import SpotlightCard from '../../../components/animated/SpotlightCard/SpotlightCard.component';
import { Text, Title } from '../../../components/common/Typography/Typography.component';
import { formatearMonto } from '../../../types/formatearMonto';
import LastTransactions from '../components/LastTransactionsCard';
import MainCard from '../components/mainCard.component';

const DashboardPages = (): React.JSX.Element => {
  return (
    <div className="bg-brand-white space-y-2 !w-full">
      <div
        className="
          grid gap-5 p-4 h-screen w-full
          grid-cols-1 grid-rows-none
          sm:grid-cols-2 sm:auto-rows-min
          md:grid-cols-4 md:grid-rows-[1fr_1fr_0.5fr]
        "
      >
        <div className="inline-block w-full md:hidden mt-10">
          <Title>¡Hola!</Title>
          <br />
          <Text>
            Este es tu panel principal. En él, tendrás acceso a distintos atajos, información
            general de tus tokens, gastos e ingresos.
          </Text>
        </div>

        <MainCard />

        <LastTransactions />
        <SpotlightCard
          backgroundColor="green"
          className="
            col-span-1 sm:col-span-1 md:col-start-3 md:col-span-1 
            row-span-1 md:row-start-2 md:row-end-3
          "
        >
          <h2 className="text-lg font-bold text-brand-white">
            Esta va a ser la card de Ver gastos, el icono{' '}
            <ArrowUpRight /> grande arriba a la derecha y abajo un gráfico que representa el envío
            de tokens (algo así como estadísticas de cuanto estuviste ganando o recibiendo.), estos gráficos en
            responsive no se ven. Tiene que ser todo monocromático en color blanco.{' '}
          </h2>
        </SpotlightCard>

        <SpotlightCard
          backgroundColor="coral"
          className="
            col-span-1 sm:col-span-1 md:col-start-4 md:col-span-1 
            row-span-1 md:row-start-2 md:row-end-3
          "
        >
          <h2 className="text-lg font-bold text-brand-white">
            Esta va a ser la card de Ver ingresos, el icono{' '}
            <ArrowDownRight /> grande arriba a la derecha y abajo un gráfico que representa el envío
            de tokens (algo así como estadísticas de cuanto estuviste perdiendo o gastando.), estos gráficos en
            responsive no se ven. Tiene que ser todo monocromático en color blanco.
          </h2>
        </SpotlightCard>

        <SpotlightCard
          backgroundColor="skyBlue"
          className="
            col-span-1 sm:col-span-1 md:col-span-1 
            row-span-1 md:row-start-3 md:row-end-4
          "
        >
          <h2 className="text-lg font-bold text-brand-white">Esta card puede ser para varias acciones, capaz para ir a las opciones de seguridad o para ver tu wallet. Fijate porfa que queda mejor.</h2>
        </SpotlightCard>

        <SpotlightCard
          backgroundColor="burntOrange"
          className="
            col-span-1 sm:col-span-1 md:col-start-2 md:col-span-2 
            row-span-1 md:row-start-3 md:row-end-4
          "
        >
          <h2 className="text-lg font-bold text-brand-white">Esta es la card de "Comprar y vender" Tiene que tener el ícono de <CoinsSwap/> a la derecha (ocupar todo el alto). Acá vamos a convertir las cripto de una currency a otras. En NFID se llama Swap, así que busca sinónimos de esta palabra para mejorar el UX Writing</h2>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default DashboardPages;
