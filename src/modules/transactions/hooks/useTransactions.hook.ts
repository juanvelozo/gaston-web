import { useEndpoint } from "../../../hooks/useEndpoint";
import { createTransaction, deleteTransaction, fetchAllTransactions, getTransactionById, updateTransaction } from "../api/transactions.api";

export const useTransactions = () => {
  const allTransactions = useEndpoint({ endpoint: fetchAllTransactions, immediate: true });
  const create = useEndpoint({ endpoint: createTransaction });

  const update = useEndpoint({ endpoint: updateTransaction });

  const search = useEndpoint({ endpoint: getTransactionById });

  const eliminate = useEndpoint({ endpoint: deleteTransaction });

  return {
    allTransactions,
    create,
    update,
    search,
    eliminate,
  };
};
