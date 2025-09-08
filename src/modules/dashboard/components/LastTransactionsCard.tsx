import { useTransactions } from '../../transactions/hooks/useTransactions.hook';
import SpotlightCard from '../../../components/animated/SpotlightCard/SpotlightCard.component';
import { Label, Text, Title } from '../../../components/common/Typography/Typography.component';
import { formatearMonto } from '../../../types/formatearMonto';
import ItemList from '../../../components/common/ItemList/ItemList.component';
import { TransactionType } from '../../transactions/model/transactions.model';
import { ReactNode } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'iconoir-react';
import moment from 'moment';
import colors from '../../../styles/colors';
import { Button } from '../../../components/animated/button/Button.component';

const LastTransactions = (): React.JSX.Element => {
  const { lastTransactions, error } = useTransactions();
  return (
    <SpotlightCard
      backgroundColor="white"
      className="border border-brand-black/20 
            col-span-1 sm:col-span-2 md:col-start-3 md:col-span-2 
            row-span-12 md:row-start-1 md:row-end-1 !bg-opacity-20 flex flex-col items-start justify-between 
          "
    >
      <div className='w-full spacey-y-3'>
        <div className="flex items-center justify-between w-full">
          <Title className="text-lg my-0.5 sm:my-0 md:text-4xl">Últimas transacciones</Title>
          <Button iconRight={<ArrowRight />} className="hidden md:block">
            Ver más
          </Button>
        </div>
        <Text className="hidden md:block">Estas son tus últimos movimientos registrados.</Text>
      </div>
      <div className="space-y-1 w-full">
        {lastTransactions.map((transaction) => (
          <ItemList
            key={transaction.id}
            title={transaction.title}
            icon={Values[transaction.type].icon}
            label={moment(transaction?.createdAt).format('DD/MM/YYYY [a las] HH:mm')}
            value={formatearMonto(transaction.amount)}
            className="!bg-transparent !border-0 !px-0 !py-2"
            valueColor={Values[transaction.type].color}
          />
        ))}
      </div>
    </SpotlightCard>
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
