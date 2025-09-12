/**
 * Interfaz genérica para los modelos de respuesta de la API
 */
export interface IBaseResponse<T> {
  status: number;
  data: T;
}

export interface ICustomError {
  message: string[];
  error: string;
  statusCode: number;
}

/**
 * Tipos de error de la API del canister
 */
export type ApiError =
  | { NotFound: null }
  | { Unauthorized: null }
  | { InternalError: string }
  | { BadRequest: string };

/**
 * Tipo genérico para resultados de la API del canister
 */
export type Result<T> = { ok: T } | { err: ApiError };
