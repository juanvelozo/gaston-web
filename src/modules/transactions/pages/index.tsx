import { useTransactions } from '../hooks/useTransactions.hook';
import TransactionCard from '../components/transactionCard/transactionCard.component';
import SectionHeader from '../../../components/common/sectionHeader/sectionHeader.component';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Plus } from 'iconoir-react';
import colors from '../../../styles/colors';
import { useNavigate } from 'react-router-dom';
import SectionBody from '../../../components/common/sectionBody/sectionBody.component';
import Input from '../../../components/common/input/input.component';
import GroupedTransactionList from '../components/List/TransactionsList.component';
import Section from '../../../components/animated/section/Section.component';

export const TransactionsPage = (): React.JSX.Element => {
  const {
    allTransactions: { data, loading },
  } = useTransactions();
  const navigate = useNavigate();

  return (
    <div className="flex-1 h-screen overflow-x-hidden">
      <Section
        title="Transacciones"
        bgColor={colors.green}
        right={<IconButton icon={<Plus />} onClick={() => navigate('/transactions/create')} />}
        tall
      >
        <div className="flex flex-col gap-4 ">
          <div className="sticky top-0 z-10 pt-3">
            <Input placeholder="Buscar" disabled={loading} />
          </div>
          {loading ? <span>Cargando...</span> : <GroupedTransactionList data={data?.data || []} />}
        </div>
      </Section>
    </div>
  );
};

export default TransactionsPage;
