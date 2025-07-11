import { useTransactions } from '../hooks/useTransactions.hook';
import TransactionCard from '../components/transactionCard/transactionCard.component';
import SectionHeader from '../../../components/common/sectionHeader/sectionHeader.component';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Plus } from 'iconoir-react';
import colors from '../../../styles/colors';
import { useNavigate } from 'react-router-dom';
import SectionBody from '../../../components/common/sectionBody/sectionBody.component';
import Input from '../../../components/common/input/input.component';

export const TransactionsPage = (): React.JSX.Element => {
  const {
    allTransactions: { data },
  } = useTransactions();
  const navigate = useNavigate();

  return (
    <div className="flex-1 h-screen">
      <SectionHeader
        title="Transacciones"
        bgColor={colors.green}
        right={<IconButton icon={<Plus />} onClick={() => navigate('/transactions/create')} />}
      />
      <SectionBody tall>
        <div className="flex flex-col gap-4">
          <div className="sticky top-0 z-10">
            <Input placeholder="Buscar" />
          </div>
          <div className="flex flex-col gap-4">
            {data?.data.map((transaction) => (
              <TransactionCard key={transaction.id} data={transaction} />
            ))}
          </div>
        </div>
      </SectionBody>
    </div>
  );
};

export default TransactionsPage;
