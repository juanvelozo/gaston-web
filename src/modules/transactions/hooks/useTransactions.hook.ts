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

  return {
    allTransactions,
    crear,
    editar,
    search,
    borrar,
  };
};
