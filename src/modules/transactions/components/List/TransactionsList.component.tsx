import { useArrayAgrupadoPorFecha } from '../../../../hooks/useArrayAgrupadoPorFecha';
import { ITransaction } from '../../model/transactions.model';
import TransactionCard from '../transactionCard/transactionCard.component';

interface Props {
  data: ITransaction[];
}

const GroupedTransactionList = ({ data }: Props) => {
  // Convertir bigint a string para el hook
  const dataWithStringDates = data.map((transaction) => {
    // Motoko Time.now() devuelve nanosegundos, JavaScript Date espera milisegundos
    const timestamp = Number(transaction.createdAt) / 1_000_000;

    // Verificar que el timestamp sea válido
    if (isNaN(timestamp) || timestamp <= 0) {
      return {
        ...transaction,
        createdAt: new Date().toISOString(), // Usar fecha actual como fallback
      };
    }

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return {
        ...transaction,
        createdAt: new Date().toISOString(), // Usar fecha actual como fallback
      };
    }

    return {
      ...transaction,
      createdAt: date.toISOString(),
    };
  });

  const grouped = useArrayAgrupadoPorFecha(dataWithStringDates, { relativeToToday: false });

  return (
    <div className="flex flex-col gap-6">
      {grouped.map((group) => (
        <div key={group.label}>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{group.label}</h3>
          <div className="flex flex-col gap-4">
            {group.list.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                data={{
                  ...transaction,
                  createdAt: BigInt(new Date(transaction.createdAt).getTime()),
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupedTransactionList;
