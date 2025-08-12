import { useNavigate } from 'react-router-dom';
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
  getCategoryById,
  updateCategory,
} from '../api/Category.api';
import { ICreateCategoryDto, IUpdateCategoryDto } from '../model/category.controller';

export const useCategories = () => {
  const navigate = useNavigate();

  let fetchAll;
  async function crear(arg: ICreateCategoryDto) {
    await createCategory(arg).then(() => {
      navigate('/categories', { replace: true });
    });
  }
  async function editar(id: number, arg: IUpdateCategoryDto) {
    await updateCategory(id, arg);
  }
  async function borrar(id: number) {
    await deleteCategory(id);
  }

  const categoriasPopulares: never[] = [];
  const error = false;

  const loading = false;

  return { fetchAll, crear, editar, borrar, categoriasPopulares, error, loading };
};
