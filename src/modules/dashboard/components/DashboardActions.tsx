import { ReactNode } from 'react';
import { ArrowDownRight, ArrowDownRightCircle, ArrowUpRight, PlusCircle } from 'iconoir-react';
import { motion } from 'framer-motion';
import { cn } from '../../../libs/utils';
import { useNavigate } from 'react-router-dom';
const TransactionActions = (): React.JSX.Element => {
  const navigate = useNavigate();

  function handleClick(key: Actions) {
    switch (key) {
      case 'CREATE':
        navigate('/transactions/create');
        break;

      default:
        break;
    }
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {Object.values(ITransactionCardValues).map((value) => (
        <motion.div
          className={cn(`flex items-center justify-center gap-2 p-3 rounded-3xl cursor-pointer select-none`, value.className)}
          key={value.title}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleClick(value.type)}
        >
          {value.icon}
          <p className="text-white text-base truncate">{value.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

type Actions = 'CREATE' | 'EXPENSE' | 'INCOME';

export type TypeConfig = {
  [x in Actions]: {
    icon?: ReactNode;
    title: string;
    className?: string;
    type: Actions;
  };
};

const ITransactionCardValues: TypeConfig = {
  CREATE: {
    title: 'Crear transaccion',
    icon: <PlusCircle color="#fff" fontSize={16} />,
    className: 'bg-brand-navy col-span-4',
    type: 'CREATE',
  },
  EXPENSE: {
    title: 'Ver gastos',
    icon: <ArrowDownRight color="#fff" fontSize={16} />,
    className: 'bg-brand-coral col-span-2',
    type: 'EXPENSE',
  },
  INCOME: {
    title: 'Ver ingresos',
    icon: <ArrowUpRight color="#fff" fontSize={16} />,
    className: 'bg-brand-green col-span-2',
    type: 'INCOME',
  },
  // SAVING: { title: 'Ahorro', icon: <PiggyBank color="#fff" fontSize={24} /> },
};

export default TransactionActions;
