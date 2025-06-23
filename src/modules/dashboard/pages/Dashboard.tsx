import { useLogout } from "../../auth/hooks/useLogout.hook";
import { useSummary } from "../hooks/useSummary.hook";

const DashboardPages = (): React.JSX.Element => {
  const { data: summary } = useSummary();
  const { cerrarSesion } = useLogout();

  return (
    <div>
      <h2>Gastos</h2>
      <h4>{summary?.data.expense}</h4>
      <h2>Ingresos</h2>
      <h4>{summary?.data.income}</h4>
      <h2>Ahorros</h2>
      <h4>{summary?.data.saving}</h4>
      <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
    </div>
  );
};

export default DashboardPages;
