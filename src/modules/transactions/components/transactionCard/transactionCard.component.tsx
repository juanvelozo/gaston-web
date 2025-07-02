import { useNavigate } from 'react-router-dom';
import { formatearMonto } from '../../../../types/formatearMonto';
import { ITransaction, TransactionType } from '../../model/transactions.model';
import { ReactNode } from 'react';
import { ArrowDownRightCircle, ArrowUpRightCircle, PiggyBank } from 'iconoir-react';
import { motion } from 'framer-motion';
const TransactionCard = ({ data }: ITransactionCard): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <motion.div
      key={data.id}
      className="flex items-center gap-4 p-4 rounded-2xl bg-brand-green hover:bg-opacity-90 w-full justify-between cursor-pointer"
      onClick={() => navigate(`/transactions/${data.id}`)}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-center gap-3">
        <span>{ITransactionCardValues[data.type].icon}</span>
        <p className="text-white">{data.title}</p>
      </div>
      <p className="text-white"> {formatearMonto(data.amount)}</p>
    </motion.div>
  );
};
interface ITransactionCard {
  data: ITransaction;
}

export type TypeConfig = {
  [x in TransactionType]: {
    icon?: ReactNode;
    title: string;
  };
};

const ITransactionCardValues: TypeConfig = {
  EXPENSE: { title: 'Gasto', icon: <ArrowDownRightCircle color="white" /> },
  INCOME: { title: 'Ingreso', icon: <ArrowUpRightCircle color="white" /> },
  SAVING: { title: 'Ahorro', icon: <PiggyBank color="white" /> },
};

export default TransactionCard;
