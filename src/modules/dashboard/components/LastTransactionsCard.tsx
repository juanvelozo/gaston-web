import TransactionCard from '../../transactions/components/transactionCard/transactionCard.component';
import { useTransactions } from '../../transactions/hooks/useTransactions.hook';
import ErrorCard from '../../../components/common/ErrorCard/ErrorCard.component';

const LastTransactions = (): React.JSX.Element => {
  const { lastTransactions, error } = useTransactions();
  return (
    <div className=" flex flex-col gap-2 w-full">
      <h2 className="text-3xl font-bold">Últimas transacciones</h2>
      <p>Revisá tu actividad financiera más reciente</p>
      {error && <ErrorCard title="Ocurrio un error" errors={error.response?.data.message} />}
      {lastTransactions?.map((transaction) => (
        <TransactionCard key={transaction.id} data={transaction} />
      ))}
    </div>
  );
};

export default LastTransactions;
