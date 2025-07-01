import { Link, useNavigate } from 'react-router-dom';
import { useTransactions } from '../../transactions/hooks/useTransactions.hook';
import { useSummary } from '../hooks/useSummary.hook';
import { useEffect } from 'react';
import { formatearMonto } from '../../../types/formatearMonto';
import AnimatedOdometer from '../../../components/animated/odometer/Odometer.component';

const DashboardPages = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { data: summary, refetch } = useSummary();
  const {
    allTransactions: { data },
    borrar,
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
        <h2>Resumen</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <h2>Gastos</h2>
            <AnimatedOdometer text={formatearMonto(summary?.data.expense!)} />
          </div>
          <div>
            <h2>Ingresos</h2>
            <AnimatedOdometer text={formatearMonto(summary?.data.income!)} />
          </div>
          <div>
            <h2>Ahorros</h2>
            <AnimatedOdometer text={formatearMonto(summary?.data.saving!)} />
          </div>
        </div>
        <div>
          <h2>Últimas transacciones</h2>
          <Link to="/transactions/create">Crear transacción</Link>
          <div style={{ marginTop: '1rem' }}>
            {data?.data.slice(0, 3).map((transaction) => (
              <div key={transaction.id} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <span>{transaction.type === 'EXPENSE' ? '- ' : '+ '}</span>
                <p>{transaction.title}</p>
                <p> {formatearMonto(transaction.amount)}</p>
                <button onClick={() => navigate(`/transactions/${transaction.id}`)}>
                  Detalle de la transacción
                </button>
                <button onClick={() => borrar(transaction.id)}>Eliminar</button>
              </div>
            ))}
          </div>
          <Link to="/transactions">Ver todas</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPages;
