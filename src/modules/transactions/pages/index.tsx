import { useTransactions } from '../hooks/useTransactions.hook';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Plus } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/input/input.component';
import GroupedTransactionList from '../components/List/TransactionsList.component';
import Section from '../../../components/animated/section/Section.component';
import ErrorCard from '../../../components/common/ErrorCard/ErrorCard.component';
import { useEffect, useTransition } from 'react';

export const TransactionsPage = (): React.JSX.Element => {
  const { transactions, loading, error, fetch } = useTransactions();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  // Usar useEffect para cargar transacciones al montar el componente
  useEffect(() => {
    startTransition(() => {
      fetch();
    });
  }, [fetch]);

  const handleRefresh = () => {
    startTransition(() => {
      fetch();
    });
  };

  return (
    <div className="flex-1 min-h-screen overflow-x-hidden overflow-y-scroll">
      <Section
        title="Transacciones"
        bgColor="green"
        loading={loading || isPending}
        right={<IconButton icon={<Plus />} onClick={() => navigate('/transactions/create')} />}
        tall
      >
        {error ? (
          <ErrorCard title="No se pudo obtener las transacciones" errors={[error]} />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="sticky top-0 z-10 pt-3">
              <Input placeholder="Buscar transacciones..." />
            </div>
            <GroupedTransactionList data={transactions} />
          </div>
        )}
      </Section>
    </div>
  );
};

export default TransactionsPage;
