/**
 * Interfaz genérica para los modelos de respuesta de la API
 */
export interface IBaseResponse<T> {
  status: number;
  data: T;
}

export interface ICustomError {
  message: string | string[];
  error: string;
  statusCode: number;
}
