import { useState, useEffect, useCallback } from 'react';

/**
 * Tipo que representa una función asíncrona para llamadas a endpoints
 * @template T - Tipo del valor de retorno esperado
 * @template P - Tipo de los parámetros que acepta la función (como array)
 */
type EndpointFunction<T, P extends any[]> = (...args: P) => Promise<T>;

/**
 * Opciones de configuración para el hook useEndpoint
 * @template T - Tipo del dato esperado en la respuesta
 * @template P - Tipo de los parámetros que acepta el endpoint
 */
type UseEndpointOptions<T, P extends any[]> = {
  /**
   * Función que realiza la llamada al endpoint (API call)
   * @example async (userId: string) => fetch(`/api/users/${userId}`).then(res => res.json())
   */
  endpoint: EndpointFunction<T, P>;

  /**
   * Si es true, ejecuta la llamada al endpoint inmediatamente al montar el componente
   * @default false
   */
  immediate?: boolean;

  /**
   * Argumentos para pasar al endpoint cuando immediate es true
   * @default []
   */
  immediateArgs?: P;

  /**
   * Valor inicial para los datos antes de la primera carga
   * @default null
   */
  initialData?: T | null;
};

/**
 * Objeto retornado por el hook useEndpoint
 * @template T - Tipo del dato de respuesta
 * @template P - Tipo de los parámetros del endpoint
 */
type UseEndpointResult<T, P extends any[]> = {
  /** Datos devueltos por el endpoint (o initialData si está definido) */
  data: T | null;

  /** Indica si la llamada inicial está en progreso */
  loading: boolean;

  /** Error ocurrido durante la llamada (null si no hay error) */
  error: Error | null;

  /** Indica si se está realizando una recarga de datos */
  refetching: boolean;

  /**
   * Función para ejecutar manualmente la llamada al endpoint
   * @param args - Argumentos para pasar al endpoint
   */
  call: (...args: P) => Promise<void>;

  /**
   * Función para recargar los datos (similar a call pero marca refetching)
   * @param args - Argumentos para pasar al endpoint
   */
  refetch: (...args: P) => Promise<void>;

  /**
   * Función para actualizar manualmente los datos (útil para optimistic updates)
   * @param newData - Nuevos datos a establecer
   */
  setData: (newData: T | null) => void;
};

/**
 * Hook personalizado para manejar llamadas a endpoints API con estados de carga, error y datos
 * @template T - Tipo del dato esperado en la respuesta
 * @template P - Tipo de los parámetros que acepta el endpoint
 * @param options - Configuración del hook
 * @returns {UseEndpointResult<T, P>} Objeto con estados y funciones de control
 *
 * @example
 * // Ejemplo básico con ejecución inmediata
 * const { data: user, loading, error, refetch } = useEndpoint({
 *   endpoint: (userId) => fetchUser(userId),
 *   immediate: true,
 *   immediateArgs: ['user123'] as [string],
 *   initialData: { name: 'Cargando...' },
 * });
 *
 * @example
 * // Ejemplo con ejecución manual y optimistic update
 * const { data: posts, call: fetchPosts, setData } = useEndpoint({
 *   endpoint: (category) => getPostsByCategory(category),
 * });
 *
 * const handleCategoryChange = (category) => {
 *   setData([]); // Limpiar datos mientras se carga
 *   fetchPosts(category);
 * };
 */
export function useEndpoint<T, P extends any[]>(
  options: UseEndpointOptions<T, P>
): UseEndpointResult<T, P> {
  // Desestructuración de opciones con valores por defecto
  const {
    endpoint,
    immediate = false,
    immediateArgs = [] as unknown as P,
    initialData = null,
  } = options;

  // Estados del hook
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [refetching, setRefetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Función para ejecutar la llamada al endpoint (marca loading)
   * Se memoiza para mantener referencia estable entre renders
   */
  const call = useCallback(
    async (...args: P) => {
      try {
        setLoading(true);
        setError(null);
        const result = await endpoint(...args);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  /**
   * Función para recargar datos (similar a call pero marca refetching)
   * Útil para distinguir entre carga inicial y recargas posteriores
   */
  const refetch = useCallback(
    async (...args: P) => {
      try {
        setRefetching(true);
        setError(null);
        const result = await endpoint(...args);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setRefetching(false);
      }
    },
    [endpoint]
  );

  // Efecto para ejecución inmediata al montar el componente
  useEffect(() => {
    if (immediate) {
      call(...immediateArgs);
    }
    // El array de dependencias está vacío porque solo debe ejecutarse al montar
  }, []);

  // Retorna todos los estados y funciones de control
  return {
    data,
    loading,
    error,
    refetching,
    call,
    refetch,
    setData, // Expone la función setData para actualizaciones manuales
  };
}
