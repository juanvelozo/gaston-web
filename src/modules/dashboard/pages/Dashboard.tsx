import { Link } from 'react-router-dom';
import { useTransactions } from '../../transactions/hooks/useTransactions.hook';
import { useSummary } from '../hooks/useSummary.hook';
import { useEffect } from 'react';
import ResumeCard from '../components/ResumeCard';
import LastTransactions from '../components/LastTransactionsCard';
import ButtonExamples from '../../../components/animated/button/Button.demo';

const DashboardPages = (): React.JSX.Element => {
  const { data: summary, refetch } = useSummary();
  const {
    allTransactions: { data },
  } = useTransactions();

  useEffect(() => {
    async function reloadSummary() {
      await refetch();
    }

    reloadSummary();
  }, [data, refetch]);

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">Resumen</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ResumeCard data={summary?.data} />
        </div>
        <Link to="/transactions/create">Crear transacción</Link>
        <LastTransactions />
      </div>
      <ButtonExamples />
    </div>
  );
};

export default DashboardPages;
