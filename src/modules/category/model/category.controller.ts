import { Colors } from '../../../styles/colors';
import { IBaseResponse } from '../../../types/proyect.model';
import { ICategory } from './category.model';

/**
 * Get all categories
 */
export type IGetAllCategoriesResponse = IBaseResponse<GetAllCategoryData>;

export type GetAllCategoryData = ICategory[];

/**
 * Create category
 */
export interface ICreateCategoryDto {
  name: string;
  description?: string;
  color?: keyof Colors;
  icon: string;
}

export type ICreateCategoryData = ICategory;

export type ICreateCategoryResponse = IBaseResponse<ICreateCategoryData>;

/**
 * Update category
 */
export interface IUpdateCategoryDto extends Partial<ICreateCategoryDto> {}

/**
 * Delete category
 */
export type IDeleteCategoryResponse = IBaseResponse<null>;

/**
 * Get category by id
 */
export type IGetCategoryResponse = IBaseResponse<ICategory>;
