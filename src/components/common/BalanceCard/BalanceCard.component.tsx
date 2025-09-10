import React from 'react';
import ResponsiveCard from '../ResponsiveCard/ResponsiveCard.component';
import OdometerText from '../../animated/odometer/Odometer.component';
import { formatearMonto } from '../../../types/formatearMonto';
import { Label, Text, Title } from '../Typography/Typography.component';
import { ArrowDownRight, ArrowUpRight } from 'iconoir-react';
import colors from '../../../styles/colors';
import { cn } from '../../../libs/utils';

interface BalanceCardProps {
  totalBalance: number;
  expenses: number;
  income: number;
  className?: string;
  showDetails?: boolean;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  totalBalance,
  expenses,
  income,
  className,
  showDetails = true,
}) => {
  return (
    <ResponsiveCard
      backgroundColor="white"
      className={cn(
        'flex flex-col justify-between',
        'col-span-1 sm:col-span-2 md:col-span-2',
        'row-span-1 md:row-span-1',
        className
      )}
    >
      {/* Header - Solo visible en desktop */}
      <div className="hidden md:block mb-3">
        <Title className="text-brand-black font-sora">¡Hola!</Title>
        <Text className="text-brand-black/70 mt-1">
          Este es tu panel principal. En él, tendrás acceso a distintos atajos, información general
          de tus tokens, gastos e ingresos.
        </Text>
      </div>

      {/* Balance Principal */}
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="text-center md:text-left">
          <Label className="text-sm md:text-base text-brand-black/70">Balance total</Label>
          <OdometerText
            text={formatearMonto(totalBalance)}
            className="text-2xl md:text-4xl lg:text-6xl font-bold text-brand-black font-sora"
          />
        </div>

        {/* Gastos e Ingresos */}
        {showDetails && (
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 w-full">
            <div className="flex items-center gap-2">
              <OdometerText
                text={formatearMonto(expenses)}
                className="text-sm md:text-base lg:text-2xl text-brand-coral font-semibold font-sora"
              />
              <ArrowDownRight color={colors.coral} strokeWidth={2} width={14} height={14} />
            </div>
            <div className="flex items-center gap-2">
              <OdometerText
                text={formatearMonto(income)}
                className="text-sm md:text-base lg:text-2xl text-brand-green font-semibold font-sora"
              />
              <ArrowUpRight color={colors.green} strokeWidth={2} width={14} height={14} />
            </div>
          </div>
        )}
      </div>
    </ResponsiveCard>
  );
};

export default BalanceCard;
