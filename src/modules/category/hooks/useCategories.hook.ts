import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  ICategory,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  UseCategoriesState,
  UseCategoriesActions,
} from '../model/category.model';
import { getCategories, createCategory, updateCategory } from '../api/category.api';
import { useAuth } from '../../auth/hooks/useAuth.hook';

export const useCategories = (): UseCategoriesState & UseCategoriesActions => {
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
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
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener categorías';
      setError(errorMessage);
      toast.error('Error al cargar categorías', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const create = useCallback(
    async (data: CreateCategoryRequest): Promise<ICategory | null> => {
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
        const newCategory = await createCategory(data);
        setCategories((prev) => [newCategory, ...prev]);
        toast.success('Categoría creada', {
          description: `Se creó la categoría "${newCategory.name}"`,
        });
        return newCategory;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al crear categoría';
        setError(errorMessage);
        toast.error('Error al crear categoría', {
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
    async (data: UpdateCategoryRequest): Promise<ICategory | null> => {
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
        const updatedCategory = await updateCategory(data);
        setCategories((prev) =>
          prev.map((category) => (category.id === data.id ? updatedCategory : category))
        );
        toast.success('Categoría actualizada', {
          description: `Se actualizó la categoría "${updatedCategory.name}"`,
        });
        return updatedCategory;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al actualizar categoría';
        setError(errorMessage);
        toast.error('Error al actualizar categoría', {
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
    categories,
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
