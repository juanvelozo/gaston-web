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
      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100  w-full justify-between cursor-pointer"
      onClick={() => navigate(`/transactions/${data.id}`)}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-center gap-3">
        <span>{ITransactionCardValues[data.type].icon}</span>
        <div>
          <p className=" text-lg">{data.title}</p>
          <p className="text-gray-600 text-sm">{data.category.name}</p>
        </div>
      </div>
      <p className="text-xl"> {formatearMonto(data.amount)}</p>
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
  EXPENSE: { title: 'Gasto', icon: <ArrowDownRightCircle color="#FE5F55" /> },
  INCOME: { title: 'Ingreso', icon: <ArrowUpRightCircle color="#3A7D44" /> },
  SAVING: { title: 'Ahorro', icon: <PiggyBank color="#F2AF29" /> },
};

export default TransactionCard;
