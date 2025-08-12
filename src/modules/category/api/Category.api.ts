import {
  ICreateCategoryDto,
  ICreateCategoryResponse,
  IDeleteCategoryResponse,
  IGetAllCategoriesResponse,
  IGetCategoryResponse,
  IUpdateCategoryDto,
} from '../model/category.controller';

export async function fetchAllCategories(): Promise<IGetAllCategoriesResponse | undefined> {
  try {
    console.log('Obteniendo la lista de categorias...');
    const response: IGetAllCategoriesResponse | undefined = undefined;

    console.log('Lista de categorias obtenida.');
    return response;
  } catch (error) {
    console.error('Hubo un error al obtener la lista de categorias', error);
    // handleApiError(error);
  }
}

export async function createCategory(
  body: ICreateCategoryDto
): Promise<ICreateCategoryResponse | undefined> {
  try {
    console.log('Creando categoria...');
    const response: ICreateCategoryResponse | undefined = undefined;
    console.log('Categoria creada exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al crear la categoria', error);
    // handleApiError(error);
  }
}

export async function deleteCategory(id: number): Promise<IDeleteCategoryResponse | undefined> {
  try {
    console.log('Eliminando categoria...');
    const response: IDeleteCategoryResponse | undefined = undefined;

    console.log('Categoria eliminada exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al eliminar la categoria', error);
    // handleApiError(error);
  }
}

export async function updateCategory(id: number, body: IUpdateCategoryDto) {
  try {
    console.log('Actualizando categoria...', body);
    const response = null;

    console.log('Categoria actualizada exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al actualizar la categoria', error);
    // handleApiError(error);
  }
}

export async function getCategoryById(id: number): Promise<IGetCategoryResponse | undefined> {
  try {
    console.log('Obteniendo categoria...');
    const response: IGetCategoryResponse | undefined = undefined;
    console.log('Categoria obtenida exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al obtener la categoria', error);
    // handleApiError(error);
  }
}
