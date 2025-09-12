import { useTransactions } from '../../transactions/hooks/useTransactions.hook';
import ResponsiveCard from '../../../components/common/ResponsiveCard/ResponsiveCard.component';
import { Label, Text, Title } from '../../../components/common/Typography/Typography.component';
import { formatearMonto } from '../../../types/formatearMonto';
import ItemList from '../../../components/common/ItemList/ItemList.component';
import { TransactionType } from '../../transactions/model/transactions.model';
import { ITransactionCardValues } from '../../transactions/components/transactionCard/transactionCard.component';
import { ReactNode } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'iconoir-react';
import moment from 'moment';
import colors from '../../../styles/colors';
import { Button } from '../../../components/animated/button/Button.component';

const LastTransactions = (): React.JSX.Element => {
  const { transactions, error } = useTransactions();
  return (
    <ResponsiveCard
      backgroundColor="white"
      className="
        col-span-1 sm:col-span-2 md:col-start-3 md:col-span-2 
        row-span-1 md:row-start-1 md:row-end-2 
        flex flex-col items-start justify-between
      "
    >
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between w-full">
          <Title className="text-brand-black font-sora">Últimas transacciones</Title>
          <Button iconRight={<ArrowRight />} className="hidden md:block text-xs">
            Ver más
          </Button>
        </div>
        <Text className="hidden md:block text-xs text-brand-black/70 font-work-sans">
          Estas son tus últimos movimientos registrados.
        </Text>
      </div>

      <div className="space-y-1 w-full">
        {transactions.slice(0, 5).map((transaction) => (
          <ItemList
            key={transaction.id}
            title={transaction.title}
            icon={ITransactionCardValues[transaction.type].icon}
            label={moment(Number(transaction?.createdAt) / 1_000_000).format(
              'DD/MM/YYYY [a las] HH:mm'
            )}
            value={formatearMonto(Number(transaction.amount))}
            className="!bg-transparent !border-0 !px-0 !py-1"
            valueColor={ITransactionCardValues[transaction.type].color}
          />
        ))}
      </div>

      {/* Botón para mobile */}
      <Button
        className="text-xs md:hidden w-full mt-2"
        iconRight={<ArrowRight />}
        variant="terciary"
      >
        Ver todas las transacciones
      </Button>
    </ResponsiveCard>
  );
};

export default LastTransactions;

export type ResumeCardConfig = {
  [x in TransactionType]: {
    icon?: ReactNode;
    color?: string;
  };
};

export const Values: ResumeCardConfig = {
  [TransactionType.EXPENSE]: {
    icon: <ArrowDownRight color="red" strokeWidth={2.5} />,
    color: colors.coral,
  },
  [TransactionType.INCOME]: {
    icon: <ArrowUpRight color="green" strokeWidth={2.5} />,
    color: colors.green,
  },
};
