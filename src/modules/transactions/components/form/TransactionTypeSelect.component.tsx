import { useEffect, useState } from 'react';
import { TransactionType } from '../../model/transactions.model';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/animated/button/Button.component';
import { ITransactionCardValues } from '../transactionCard/transactionCard.component';
import { ArrowDownRightCircle, PiggyBank } from 'iconoir-react';

export const TRANSACTION_TYPE = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  // SAVING: 'SAVING',
} as const;

const TransactionTypeSelect = ({ onChange, value }: ITransactionTypeSelect): React.JSX.Element => {
  const [selected, setSelected] = useState<TransactionType>(TRANSACTION_TYPE.INCOME);

  function handleChange(value: TransactionType) {
    onChange && onChange(value);
  }

  useEffect(() => {
    if (value) {
      handleChange(value);
      setSelected(value);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-4">
      {Object.values(TRANSACTION_TYPE).map((key) => {
        const isActive = selected === key;
        return (
          <div key={key} className="relative w-full flex items-center justify-center">
            {isActive && (
              <motion.div
                layoutId="activeTypeTransaction"
                className="absolute inset-0 rounded-3xl z-0 border"
                initial={false}
                animate={{
                  backgroundColor: ITransactionButtonValues[key].color,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  duration: 0.3,
                }}
              />
            )}
            <button
              onClick={() => {
                setSelected(key);
                handleChange(key);
              }}
              type="button"
              className={`relative z-10 flex flex-col items-center
              w-full  border cursor-pointer justify-center p-3 
             rounded-3xl ${isActive ? 'text-white border-none' : 'text-gray-500'} transition-colors duration-200 focus:ring-0 focus:outline-none`}
            >
              {ITransactionButtonValues[key].icon(isActive)}
              <span className="mt-2 font-medium">{ITransactionCardValues[key].title}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
interface ITransactionTypeSelect {
  onChange?: (arg: TransactionType) => void;
  value?: TransactionType;
}

export type TypeConfig = {
  [x in TransactionType]: {
    color: string;
    icon: (isSelected: boolean) => React.ReactNode;
  };
};

export const ITransactionButtonValues: TypeConfig = {
  EXPENSE: {
    color: '#FE5F55',
    icon: (isSelected) => <ArrowDownRightCircle color={isSelected ? '#fff' : '#FE5F55'} />,
  },
  INCOME: {
    color: '#3A7D44',
    icon: (isSelected) => <ArrowDownRightCircle color={isSelected ? '#fff' : '#3A7D44'} />,
  },
  // SAVING: {
  //   color: '#F2AF29',
  //   icon: (isSelected) => <PiggyBank color={isSelected ? '#fff' : '#F2AF29'} />,
  // },
};

export default TransactionTypeSelect;
