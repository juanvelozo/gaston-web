import { useLogout } from "../../auth/hooks/useLogout.hook";
import { useSummary } from "../hooks/useSummary.hook";

const DashboardPages = (): React.JSX.Element => {
  const { data: summary } = useSummary();
  const { cerrarSesion } = useLogout();

  return (
    <div>
      <span>{JSON.stringify(summary)}</span>
      <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
    </div>
  );
};

export default DashboardPages;
