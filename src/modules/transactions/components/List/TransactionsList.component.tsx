import { useArrayAgrupadoPorFecha } from '../../../../hooks/useArrayAgrupadoPorFecha';
import { ITransaction } from '../../model/transactions.model';
import TransactionCard from '../transactionCard/transactionCard.component';

interface Props {
  data: ITransaction[];
}

const GroupedTransactionList = ({ data }: Props) => {
  const grouped = useArrayAgrupadoPorFecha(data, { relativeToToday: false });

  return (
    <div className="flex flex-col gap-6">
      {grouped.map((group) => (
        <div key={group.label}>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{group.label}</h3>
          <div className="flex flex-col gap-4">
            {group.list.map((transaction) => (
              <TransactionCard key={transaction.id} data={transaction} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupedTransactionList;
