import { useLocation, useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../../hooks/useEndpoint';
import {
  createTransaction,
  deleteTransaction,
  fetchAllTransactions,
  getTransactionById,
  updateTransaction,
} from '../api/transactions.api';
import { ICreateTransactionDto, IUpdateTransactionDto } from '../model/transaction.controller';

export const useTransactions = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const allTransactions = useEndpoint({
    endpoint: fetchAllTransactions,
    immediate: pathname === '/transactions' || pathname === '/',
  });
  const create = useEndpoint({ endpoint: createTransaction });
  const update = useEndpoint({ endpoint: updateTransaction });
  const search = useEndpoint({ endpoint: getTransactionById });
  const eliminate = useEndpoint({ endpoint: deleteTransaction });

  async function crear(transaction: ICreateTransactionDto) {
    await create.call(transaction).then(() => navigate('/', { replace: true }));
  }
  async function editar(id: number, transaction: IUpdateTransactionDto) {
    await update.call(id, transaction).then(() => navigate('/', { replace: true }));
  }
  async function borrar(id: number) {
    await eliminate.call(id).then(async () => {
      if (pathname !== '/') {
        navigate('/', { replace: true });
      }
      await allTransactions.refetch();
    });
  }

  const lastTransactions = allTransactions.data?.data.slice(0, 3);
  const submitting = create.loading || update.loading;
  const cargando = search.loading || allTransactions.loading;
  const eliminando = eliminate.loading;
  const error =
    allTransactions.error || create.error || update.error || eliminate.error || search.error;

  return {
    allTransactions,
    lastTransactions,
    crear,
    editar,
    search,
    borrar,
    error,
    submitting,
    cargando,
    eliminando,
  };
};
