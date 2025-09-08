import React from 'react';
import SpotlightCard from '../../../components/animated/SpotlightCard/SpotlightCard.component';
import CurvedLoop from '../../../components/animated/CurvedLoop/CurvedLoop.component';
import OdometerText from '../../../components/animated/odometer/Odometer.component';
import { formatearMonto } from '../../../types/formatearMonto';
import { useAuth } from '../../auth/hooks/useAuth.hook';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { ArrowDownRight, ArrowRight, ArrowUpRight, PasteClipboard } from 'iconoir-react';
import { toast } from 'sonner';
import colors from '../../../styles/colors';
import { Button } from '../../../components/animated/button/Button.component';
import ItemList from '../../../components/common/ItemList/ItemList.component';
import { Label, Text, Title } from '../../../components/common/Typography/Typography.component';

const MainCard = () => {
  const { principal } = useAuth();

  const handleCopyPrincipal = () => {
    if (principal) {
      navigator.clipboard.writeText(principal.toString()).then(() => {
        toast.success('¡Copiado!', {
          description: 'Tu principal ya está disponible en tu portapapeles.',
        });
      });
    }
  };

  return (
    <SpotlightCard
      backgroundColor="white"
      className="border border-brand-black/20 
            col-span-1 sm:col-span-2 md:col-span-2 
            row-span-9 sm:row-span-1 md:row-span-2 flex flex-col justify-between items-start
          "
      spotlightColor={`rgba(${1}, ${1}, ${1}, ${0.2})`}
    >
      <div className="hidden md:block">
        <Title>¡Hola!</Title>
        <br />
        <Text>
          Este es tu panel principal. En él, tendrás acceso a distintos atajos, información general
          de tus tokens, gastos e ingresos.
        </Text>
      </div>
      <div className="flex flex-col items-start md:items-center gap-4">
        <div className="space-y-3">
          <Label>Balance total:</Label>
          <OdometerText
            text={formatearMonto(1000212)}
            className="text-2xl md:text-5xl font-bold text-brand-black"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between md:justify-start gap-4 w-full">
          <div className="flex items-center gap-2">
            <OdometerText
              text={formatearMonto(10002)}
              className="text-base md:text-lg text-brand-coral font-semibold"
            />
            <ArrowDownRight color={colors.coral} strokeWidth={2} />
          </div>
          <div className="flex items-center gap-2">
            <OdometerText
              text={formatearMonto(4032)}
              className="text-base md:text-lg text-brand-green font-semibold"
            />
            <ArrowUpRight color={colors.green} strokeWidth={2} />
          </div>
        </div>
      </div>
      <div className="w-full space-y-4 hidden md:block">
        <div className="flex items-center justify-between w-full">
          <Label className="text-xl">Tus tokens (8):</Label>
          <Button className="text-sm" iconRight={<ArrowRight />}>
            Ver todos
          </Button>
        </div>
        <div className="space-y-3">
          <ItemList title="BTC" value={'00.32000'} />
          <ItemList title="ICP" value={'00.32000'} />
          <ItemList title="USDT" value={'00.32000'} />
        </div>
      </div>
      <Button
        iconRight={<PasteClipboard color="#000" />}
        onClick={handleCopyPrincipal}
        variant="terciary"
        className="w-full font-space-mono hidden md:block"
      >
        Tu principal: {principal}
      </Button>
    </SpotlightCard>
  );
};

export default MainCard;
