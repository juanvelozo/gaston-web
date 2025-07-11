import { Link, useNavigate } from 'react-router-dom';
import { useTransactions } from '../../transactions/hooks/useTransactions.hook';
import { useSummary } from '../hooks/useSummary.hook';
import { useEffect } from 'react';
import ResumeCard from '../components/ResumeCard';
import LastTransactions from '../components/LastTransactionsCard';
import TransactionActions from '../components/DashboardActions';
import { Button } from '../../../components/animated/button/Button.component';

const DashboardPages = (): React.JSX.Element => {
  const { data: summary, refetch } = useSummary();
  const {
    allTransactions: { data },
  } = useTransactions();
  const navigate = useNavigate();

  useEffect(() => {
    async function reloadSummary() {
      await refetch();
    }

    reloadSummary();
  }, [data, refetch]);

  return (
    <div className="bg-white p-4 space-y-2">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Resumen</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ResumeCard data={summary?.data} />
        </div>
        <TransactionActions />
        <Button onClick={() => navigate('/transactions/create')} variant="secondary">
          Crear transacción
        </Button>
        <LastTransactions />
      </div>
    </div>
  );
};

export default DashboardPages;
