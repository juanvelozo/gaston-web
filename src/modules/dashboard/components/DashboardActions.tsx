import { ReactNode } from 'react';
import { TransactionType } from '../../transactions/model/transactions.model';
import { ArrowDownRightCircle, ArrowUpRightCircle, PiggyBank } from 'iconoir-react';
import { motion } from 'framer-motion';
const TransactionActions = (): React.JSX.Element => {
  return (
    <div className="flex gap-4 justify-between">
      {Object.values(ITransactionCardValues).map((value) => (
        <motion.div
          className={`flex flex-col items-center justify-center w-1/3 gap-4 bg-brand-green hover:bg-opacity-90 p-4 rounded-3xl`}
          key={value.title}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.05 }}
        >
          {value.icon}
          <p className="text-white">Ver {value.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

export type TypeConfig = {
  [x in TransactionType]: {
    icon?: ReactNode;
    title: string;
  };
};

const ITransactionCardValues: TypeConfig = {
  EXPENSE: { title: 'Gasto', icon: <ArrowDownRightCircle color="#fff" fontSize={24} /> },
  INCOME: { title: 'Ingreso', icon: <ArrowUpRightCircle color="#fff" fontSize={24} /> },
  SAVING: { title: 'Ahorro', icon: <PiggyBank color="#fff" fontSize={24} /> },
};

export default TransactionActions;
