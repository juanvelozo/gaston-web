import { useTransactions } from '../hooks/useTransactions.hook';
import TransactionCard from '../components/transactionCard/transactionCard.component';
import SectionHeader from '../../../components/common/sectionHeader/sectionHeader.component';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Plus } from 'iconoir-react';
import colors from '../../../styles/colors';

export const TransactionsPage = (): React.JSX.Element => {
  const {
    allTransactions: { data },
  } = useTransactions();

  return (
    <div className="bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow-sm rounded-2xl space-y-2">
      <SectionHeader
        title="Transacciones"
        bgColor={colors.green}
        right={<IconButton icon={<Plus />} />}
      />
      <div className="flex flex-col gap-4 p-4">
        {data?.data.map((transaction) => (
          <TransactionCard key={transaction.id} data={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
