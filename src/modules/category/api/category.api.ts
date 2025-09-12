import { canister } from '../../../api/api';
import { ICategory, CreateCategoryRequest, UpdateCategoryRequest } from '../model/category.model';
import { Result } from '../../../types/proyect.model';

/**
 * Obtiene todas las categorías del usuario
 */
export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const result = (await canister.getCategories()) as Result<ICategory[]>;

    if ('ok' in result) {
      return result.ok;
    } else {
      throw new Error(`Error al obtener categorías: ${JSON.stringify(result.err)}`);
    }
  } catch (error) {
    console.error('Error en getCategories:', error);
    throw error;
  }
};

/**
 * Crea una nueva categoría
 */
export const createCategory = async (request: CreateCategoryRequest): Promise<ICategory> => {
  try {
    const result = (await canister.createCategory(request)) as Result<ICategory>;

    if ('ok' in result) {
      return result.ok;
    } else {
      throw new Error(`Error al crear categoría: ${JSON.stringify(result.err)}`);
    }
  } catch (error) {
    console.error('Error en createCategory:', error);
    throw error;
  }
};

/**
 * Actualiza una categoría existente
 */
export const updateCategory = async (request: UpdateCategoryRequest): Promise<ICategory> => {
  try {
    const result = (await canister.updateCategory(request)) as Result<ICategory>;

    if ('ok' in result) {
      return result.ok;
    } else {
      throw new Error(`Error al actualizar categoría: ${JSON.stringify(result.err)}`);
    }
  } catch (error) {
    console.error('Error en updateCategory:', error);
    throw error;
  }
};

/**
 * Busca una categoría por ID
 */
export const getCategoryById = async (
  categories: ICategory[],
  id: bigint
): Promise<ICategory | undefined> => {
  return categories.find((category) => category.id === id);
};

/**
 * Filtra categorías por nombre
 */
export const filterCategoriesByName = async (
  categories: ICategory[],
  name: string
): Promise<ICategory[]> => {
  return categories.filter((category) => category.name.toLowerCase().includes(name.toLowerCase()));
};

/**
 * Helper para crear un campo opcional de actualización
 */
export const createOptionalField = <T>(value?: T): [] | [T] => {
  return value !== undefined ? [value] : [];
};
