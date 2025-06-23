import { useParams } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions.hook';
import { useEffect } from 'react';
import { formatearMonto } from '../../../types/formatearMonto';

const TransactionDetailPage = (): React.JSX.Element => {
  const { id } = useParams();
  const { search } = useTransactions();

  async function fetchTransaction() {
    await search.call(Number(id));
  }

  useEffect(() => {
    fetchTransaction();
  }, []);

  if (search.loading) return <span>Loading</span>;
  return (
    <div>
      <span>TransactionDetail {id}</span>
      <h2>{search.data?.data.title}</h2>
      <h3>{formatearMonto(search.data?.data.amount!)}</h3>
      <pre>{JSON.stringify(search.data?.data, null, 2)}</pre>
    </div>
  );
};

export default TransactionDetailPage;
