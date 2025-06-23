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
  const fetchAll = useEndpoint({ endpoint: fetchAllCategories, immediate: true });
  const create = useEndpoint({ endpoint: createCategory });
  const update = useEndpoint({ endpoint: updateCategory });
  const eliminate = useEndpoint({ endpoint: deleteCategory });
  const search = useEndpoint({ endpoint: getCategoryById });

  async function crear(arg: ICreateCategoryDto) {
    await create.call(arg).then(() => fetchAll.refetch());
  }
  async function editar(id: number, arg: IUpdateCategoryDto) {
    await update.call(id, arg).then(() => fetchAll.refetch());
  }
  async function borrar(id: number) {
    await eliminate.call(id).then(() => fetchAll.refetch());
  }

  return { fetchAll, crear, editar, borrar, search };
};
