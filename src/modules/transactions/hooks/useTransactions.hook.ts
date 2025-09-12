import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  ITransaction,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  UseTransactionsState,
  UseTransactionsActions,
} from '../model/transactions.model';
import { getTransactions, createTransaction, updateTransaction } from '../api/transactions.api';
import { useAuth } from '../../auth/hooks/useAuth.hook';

export const useTransactions = (): UseTransactionsState & UseTransactionsActions => {
  const { isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetch = useCallback(async () => {
    if (!isAuthenticated) {
      const errorMessage = 'Usuario no autenticado';
      setError(errorMessage);
      toast.error('Error de autenticación', {
        description: errorMessage,
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener transacciones';
      setError(errorMessage);
      toast.error('Error al cargar transacciones', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const create = useCallback(
    async (data: CreateTransactionRequest): Promise<ITransaction | null> => {
      if (!isAuthenticated) {
        const errorMessage = 'Usuario no autenticado';
        setError(errorMessage);
        toast.error('Error de autenticación', {
          description: errorMessage,
        });
        return null;
      }

      setSubmitting(true);
      setError(null);

      try {
        const newTransaction = await createTransaction(data);
        setTransactions((prev) => [newTransaction, ...prev]);
        toast.success('Transacción creada', {
          description: `Se creó la transacción "${newTransaction.title}"`,
        });
        return newTransaction;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al crear transacción';
        setError(errorMessage);
        toast.error('Error al crear transacción', {
          description: errorMessage,
        });
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [isAuthenticated]
  );

  const update = useCallback(
    async (data: UpdateTransactionRequest): Promise<ITransaction | null> => {
      if (!isAuthenticated) {
        const errorMessage = 'Usuario no autenticado';
        setError(errorMessage);
        toast.error('Error de autenticación', {
          description: errorMessage,
        });
        return null;
      }

      setSubmitting(true);
      setError(null);

      try {
        const updatedTransaction = await updateTransaction(data);
        setTransactions((prev) =>
          prev.map((transaction) => (transaction.id === data.id ? updatedTransaction : transaction))
        );
        toast.success('Transacción actualizada', {
          description: `Se actualizó la transacción "${updatedTransaction.title}"`,
        });
        return updatedTransaction;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al actualizar transacción';
        setError(errorMessage);
        toast.error('Error al actualizar transacción', {
          description: errorMessage,
        });
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [isAuthenticated]
  );

  return {
    // Estado
    transactions,
    loading,
    submitting,
    error,

    // Acciones
    fetch,
    create,
    update,
    clearError,
  };
};
