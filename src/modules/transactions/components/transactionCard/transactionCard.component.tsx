import { useNavigate } from 'react-router-dom';
import { formatearMonto } from '../../../../types/formatearMonto';
import { ITransaction, TransactionType } from '../../model/transactions.model';
import { ReactNode } from 'react';
import { ArrowDownRightCircle, ArrowUpRightCircle } from 'iconoir-react';
import ItemList from '../../../../components/common/ItemList/ItemList.component';
const TransactionCard = ({ data }: ITransactionCard): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <ItemList
      onClick={() => navigate(`/transactions/${data.id}`)}
      icon={ITransactionCardValues[data.type].icon}
      title={data.title}
      index={data.id}
      label={data?.category?.name ?? 'Sin categoría'}
      value={formatearMonto(data.amount)}
      valueColor={ITransactionCardValues[data.type].color}
      iconBgColor={ITransactionCardValues[data.type].color + '40'}
    />
  );
};
interface ITransactionCard {
  data: ITransaction;
}

export type TypeConfig = {
  [x in TransactionType]: {
    icon?: ReactNode;
    title: string;
    color?: string;
  };
};

export const ITransactionCardValues: TypeConfig = {
  EXPENSE: { title: 'Gasto', icon: <ArrowDownRightCircle color="#FE5F55" />, color: '#FE5F55' },
  INCOME: { title: 'Ingreso', icon: <ArrowUpRightCircle color="#3A7D44" />, color: '#3A7D44' },
  // SAVING: { title: 'Ahorro', icon: <PiggyBank color="#F2AF29" />, color: '#F2AF29' },
};

export default TransactionCard;
