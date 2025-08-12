import { useLocation, useNavigate } from 'react-router-dom';
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
  let allTransactions: never[] = [];

  async function crear(transaction: ICreateTransactionDto) {
    await createTransaction(transaction).then(() => navigate('/', { replace: true }));
  }
  async function editar(id: number, transaction: IUpdateTransactionDto) {
    await updateTransaction(id, transaction).then(() => navigate('/', { replace: true }));
  }
  async function borrar(id: number) {
    await deleteTransaction(id).then(async () => {
      if (pathname !== '/') {
        navigate('/', { replace: true });
      }
      await fetchAllTransactions();
    });
  }

  const lastTransactions: never[] = [];
  const submitting = false;
  const cargando = false;
  const eliminando = false;
  const error = false;

  return {
    allTransactions,
    lastTransactions,
    crear,
    editar,
    borrar,
    error,
    submitting,
    cargando,
    eliminando,
  };
};
