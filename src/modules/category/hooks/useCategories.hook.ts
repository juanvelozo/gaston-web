import { useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../../hooks/useEndpoint';
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
  const fetchAll = useEndpoint({ endpoint: fetchAllCategories, immediate: true });
  const create = useEndpoint({ endpoint: createCategory });
  const update = useEndpoint({ endpoint: updateCategory });
  const eliminate = useEndpoint({ endpoint: deleteCategory });
  const search = useEndpoint({ endpoint: getCategoryById });

  async function crear(arg: ICreateCategoryDto) {
    await create.call(arg).then(() => {
      navigate('/categories', { replace: true });
    });
  }
  async function editar(id: number, arg: IUpdateCategoryDto) {
    await update.call(id, arg);
  }
  async function borrar(id: number) {
    await eliminate.call(id).then(() => fetchAll.refetch());
  }

  const categoriasPopulares = fetchAll.data?.data
    .map((categoria) => ({
      ...categoria,
      cantidadTransacciones: categoria.transactions.length,
    }))
    .filter((c) => c.cantidadTransacciones > 0)
    .sort((a, b) => b.cantidadTransacciones - a.cantidadTransacciones);

  return { fetchAll, crear, editar, borrar, search, categoriasPopulares };
};
