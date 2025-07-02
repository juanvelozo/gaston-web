import TransactionCard from '../../transactions/components/transactionCard/transactionCard.component';
import { useTransactions } from '../../transactions/hooks/useTransactions.hook';

const LastTransactions = (): React.JSX.Element => {
  const { lastTransactions } = useTransactions();
  return (
    <div className="bg-slate-300 flex flex-col gap-2 p-4 rounded-3xl shadow-md w-full">
      <h2 className="text-2xl">Últimas transacciones</h2>
      {lastTransactions?.map((transaction) => (
        <TransactionCard key={transaction.id} data={transaction} />
      ))}
    </div>
  );
};

export default LastTransactions;
