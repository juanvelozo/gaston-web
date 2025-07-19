import { useTransactions } from '../hooks/useTransactions.hook';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Plus } from 'iconoir-react';
import colors from '../../../styles/colors';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/input/input.component';
import GroupedTransactionList from '../components/List/TransactionsList.component';
import Section from '../../../components/animated/section/Section.component';
import ErrorCard from '../../../components/common/ErrorCard/ErrorCard.component';

export const TransactionsPage = (): React.JSX.Element => {
  const {
    allTransactions: { data, loading, error },
  } = useTransactions();
  const navigate = useNavigate();

  return (
    <div className="flex-1 h-screen overflow-x-hidden overflow-y-scroll">
      <Section
        title="Transacciones"
        bgColor="green"
        loading={loading}
        right={<IconButton icon={<Plus />} onClick={() => navigate('/transactions/create')} />}
        tall
      >
        {error ? (
          <ErrorCard
            title="No se pudo obtener las transacciones"
            errors={error.response?.data.message}
          />
        ) : (
          <div className="flex flex-col gap-4 ">
            <div className="sticky top-0 z-10 pt-3">
              <Input placeholder="Buscar" />
            </div>
            <GroupedTransactionList data={data?.data || []} />
          </div>
        )}
      </Section>
    </div>
  );
};

export default TransactionsPage;
