import { useNavigate } from 'react-router-dom';
import { formatearMonto } from '../../../../types/formatearMonto';
import { ITransaction, TransactionType } from '../../model/transactions.model';
import { ReactNode } from 'react';
import { ArrowDownRightCircle, ArrowUpRightCircle, PiggyBank } from 'iconoir-react';

const TransactionCard = ({ data }: ITransactionCard): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <div
      key={data.id}
      className="flex items-center gap-4 p-4 rounded-2xl bg-gray-400 hover:bg-slate-400 shadow-md w-full justify-between cursor-pointer"
      onClick={() => navigate(`/transactions/${data.id}`)}
    >
      <div className="flex items-center justify-center gap-3">
        <span>{ITransactionCardValues[data.type].icon}</span>
        <p>{data.title}</p>
      </div>
      <p> {formatearMonto(data.amount)}</p>
    </div>
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
  EXPENSE: { title: 'Gasto', icon: <ArrowDownRightCircle color="red" /> },
  INCOME: { title: 'Ingreso', icon: <ArrowUpRightCircle color="green" /> },
  SAVING: { title: 'Ahorro', icon: <PiggyBank color="yellow" /> },
};

export default TransactionCard;
