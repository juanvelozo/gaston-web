import { useSummary } from '../hooks/useSummary.hook';
import { useEffect } from 'react';
import ResumeCard from '../components/ResumeCard';
import LastTransactions from '../components/LastTransactionsCard';
import TransactionActions from '../components/DashboardActions';

const DashboardPages = (): React.JSX.Element => {
  const { data: summary, loading: loadingSummary, refetch, error: errorSummary } = useSummary();

  useEffect(() => {
    async function reloadSummary() {
      await refetch();
    }
    reloadSummary();
  }, []);

  return (
    <div className="bg-white p-4 mt-8 mb-16 space-y-2">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Hola</h1>
        <p>Mirá un resumen del estado actual de tus finanzas en un solo vistazo</p>
        <div className="space-y-10">
          <ResumeCard
            data={summary?.data}
            loading={loadingSummary}
            errors={errorSummary?.response?.data.message}
          />
          <TransactionActions />
          <LastTransactions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPages;
