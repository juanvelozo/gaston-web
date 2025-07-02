import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions.hook';
import { formatearMonto } from '../../../types/formatearMonto';
import TransactionCard from '../components/transactionCard/transactionCard.component';

export const TransactionsPage = (): React.JSX.Element => {
  const {
    allTransactions: { data },
  } = useTransactions();

  return (
    <div>
      <h2>Transactions</h2>
      <Link to="/transactions/create">Agregar</Link>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data?.data.map((transaction) => (
          <TransactionCard key={transaction.id} data={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
