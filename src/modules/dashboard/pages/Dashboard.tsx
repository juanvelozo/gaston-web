import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../../transactions/hooks/useTransactions.hook';
import { useSummary } from '../hooks/useSummary.hook';
import { useEffect } from 'react';
import ResumeCard from '../components/ResumeCard';
import LastTransactions from '../components/LastTransactionsCard';
import TransactionActions from '../components/DashboardActions';
import { Button } from '../../../components/animated/button/Button.component';

const DashboardPages = (): React.JSX.Element => {
  const { data: summary, loading: loadingSummary, refetch } = useSummary();
  const {
    allTransactions: { data, loading: loadingTransactions },
  } = useTransactions();
  const navigate = useNavigate();

  useEffect(() => {
    async function reloadSummary() {
      await refetch();
    }

    reloadSummary();
  }, [data, refetch]);

  return (
    <div className="bg-white p-4 mt-8 mb-16 space-y-2">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Hola</h1>
        <p>Mirá un resumen del estado actual de tus finanzas en un solo vistazo</p>
        <div className="space-y-10">
          <ResumeCard data={summary?.data} loading={loadingSummary} />
          <TransactionActions />
          <LastTransactions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPages;
