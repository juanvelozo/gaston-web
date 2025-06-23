import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../auth/hooks/useLogout.hook';
import { useTransactions } from '../../transactions/hooks/useTransactions.hook';
import { useSummary } from '../hooks/useSummary.hook';
import { useEffect } from 'react';
import { formatearMonto } from '../../../types/formatearMonto';

const DashboardPages = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { data: summary, refetch } = useSummary();
  const {
    allTransactions: { data },
    borrar,
  } = useTransactions();
  const { cerrarSesion } = useLogout();

  useEffect(() => {
    async function reloadSummary() {
      await refetch();
    }

    reloadSummary();
  }, [data, refetch]);

  return (
    <div>
      <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
      <div>
        <h2>Resumen</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <h2>Gastos</h2>
            <h4>{formatearMonto(summary?.data.expense!)}</h4>
          </div>
          <div>
            <h2>Ingresos</h2>
            <h4>{formatearMonto(summary?.data.income!)}</h4>
          </div>
          <div>
            <h2>Ahorros</h2>
            <h4>{formatearMonto(summary?.data.saving!)}</h4>
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
