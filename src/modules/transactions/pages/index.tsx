import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions.hook';
import { formatearMonto } from '../../../types/formatearMonto';

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
          <Link to={`/transactions/${transaction.id}`} key={transaction.id}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
              <h4>{transaction.title}</h4>
              <h4>{formatearMonto(transaction.amount)}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
