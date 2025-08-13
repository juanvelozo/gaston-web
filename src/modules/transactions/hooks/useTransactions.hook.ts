import { useLocation, useNavigate } from 'react-router-dom';

import { ICreateTransactionDto, IUpdateTransactionDto } from '../model/transaction.controller';
import { ITransaction, TransactionType } from '../model/transactions.model';

/**
 * Hook para manejar las transacciones. Acá manejamos la lista, el detalle, la creación, edición y eliminación de transacciones.
 */
export const useTransactions = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let allTransactions = arrayMockTransactions;

  async function crear(transaction: ICreateTransactionDto) {
    // await createTransaction(transaction).then(() => navigate('/', { replace: true }));
  }
  async function editar(id: number, transaction: IUpdateTransactionDto) {
    // await updateTransaction(id, transaction).then(() => navigate('/', { replace: true }));
  }
  async function borrar(id: number) {
    // await deleteTransaction(id).then(async () => {
    //   if (pathname !== '/') {
    //     navigate('/', { replace: true });
    //   }
    //   await fetchAllTransactions();
    // });
  }

  const lastTransactions: ITransaction[] = arrayMockTransactions;
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

const arrayMockTransactions: ITransaction[] = [
  {
    id: 1,
    type: TransactionType.INCOME,
    amount: 1500.5,
    title: 'Salario de Julio',
    description: 'Pago mensual del trabajo',
    createdAt: '2025-07-25T10:00:00Z',
    updatedAt: '2025-07-25T10:00:00Z',
    userId: 1,
    user: null, // Asumimos que el usuario no es necesario para este ejemplo
    categoryId: 1,
    category: {
      id: 1,
      name: 'Salario',
      description: 'Ingresos por sueldo o trabajo',
      color: 'green',
      icon: '💼',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
      userId: 1,
      transactions: [],
    },
  },
  {
    id: 2,
    type: TransactionType.EXPENSE,
    amount: 75.25,
    title: 'Supermercado',
    description: 'Compra de víveres para la semana',
    createdAt: '2025-07-26T12:30:00Z',
    updatedAt: '2025-07-26T12:30:00Z',
    userId: 1,
    user: null,
    categoryId: 2,
    category: {
      id: 2,
      name: 'Comida',
      description: 'Gastos en alimentos y bebidas',
      color: 'coral',
      icon: '🍎',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
      userId: 1,
      transactions: [],
    },
  },
  {
    id: 3,
    type: TransactionType.EXPENSE,
    amount: 50.0,
    title: 'Factura de luz',
    description: 'Pago de la electricidad del hogar',
    createdAt: '2025-07-27T15:00:00Z',
    updatedAt: '2025-07-27T15:00:00Z',
    userId: 1,
    user: null,
    categoryId: 3,
    category: {
      id: 3,
      name: 'Hogar',
      description: 'Gastos de servicios y mantenimiento del hogar',
      color: 'blue',
      icon: '🏠',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
      userId: 1,
      transactions: [],
    },
  },
];
