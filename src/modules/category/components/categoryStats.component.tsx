import { ArrowDownRightCircle, ArrowUpRightCircle, PiggyBank } from 'iconoir-react';
import { ICategory } from '../model/category.model';
import { TransactionType } from '../../transactions/model/transactions.model';
import { formatearMonto } from '../../../types/formatearMonto';

const CategoryStats = ({ data }: ICategoryStats): React.JSX.Element => {
  function getTotalByType(type: TransactionType) {
    return data?.transactions
      ?.filter((t) => t.type === type)
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  const ahorros = getTotalByType('SAVING');
  const gastos = getTotalByType('EXPENSE');
  const ingresos = getTotalByType('INCOME');

  return (
    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
      <div className="text-center">
        <div className="flex items-center justify-center mb-1">
          <ArrowDownRightCircle color="red" />
        </div>
        <p className="text-xs text-gray-500">Gastos</p>
        <p className="font-bold text-sm">{formatearMonto(gastos ?? 0)}</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-1">
          <ArrowUpRightCircle color="green" />
        </div>
        <p className="text-xs text-gray-500">Ingresos</p>
        <p className="font-bold text-sm">{formatearMonto(ingresos ?? 0)}</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center mb-1">
          <PiggyBank color="#deb602" />
        </div>
        <p className="text-xs text-gray-500">Ahorros</p>
        <p className="font-bold text-sm">{formatearMonto(ahorros ?? 0)}</p>
      </div>
    </div>
  );
};
interface ICategoryStats {
  data?: ICategory;
}

export default CategoryStats;
