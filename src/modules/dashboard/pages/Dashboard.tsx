import { Link } from "react-router-dom";
import { useLogout } from "../../auth/hooks/useLogout.hook";
import { useTransactions } from "../../transactions/hooks/useTransactions.hook";
import { useSummary } from "../hooks/useSummary.hook";

const DashboardPages = (): React.JSX.Element => {
  const { data: summary } = useSummary();
  const {
    allTransactions: { data },
  } = useTransactions();
  const { cerrarSesion } = useLogout();

  return (
    <div>
      <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
      <div>
        <h2>Resumen</h2>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <h2>Gastos</h2>
            <h4>{summary?.data.expense}</h4>
          </div>
          <div>
            <h2>Ingresos</h2>
            <h4>{summary?.data.income}</h4>
          </div>
          <div>
            <h2>Ahorros</h2>
            <h4>{summary?.data.saving}</h4>
          </div>
        </div>
        <div>
          <h2>Transacciones ({data?.data.length})</h2>
          <Link to="/transactions/create">Crear transacción</Link>
          <div style={{ marginTop: "1rem" }}>
            {data?.data.map((transaction) => (
              <div key={transaction.id}>
                <span>{transaction.type === "EXPENSE" ? "- " : "+ "}</span>
                {transaction.title} - {transaction.amount}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPages;
