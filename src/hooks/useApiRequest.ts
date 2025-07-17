import { useState, useCallback } from "react";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../services/api";
/**
 * Custom hook para realizar solicitudes HTTP usando Axios.
 * Maneja estado local para la respuesta, carga y errores.
 *
 * @template T - Tipo de dato esperado en la respuesta.
 *
 * @returns {{
 *   data: T | null,
 *   isLoading: boolean,
 *   error: Error | null,
 *   request: (config: AxiosRequestConfig) => Promise<AxiosResponse<T> | null>
 * }}
 *
 * @example
 * const { data, isLoading, error, request } = useApiRequest<User[]>();
 *
 * useEffect(() => {
 *   request({ url: "/users", method: "GET" });
 * }, []);
 *
 * @remarks
 * Este hook encapsula lógica común para llamadas API con manejo de estado.
 * Puedes usarlo en cualquier componente React para evitar repetir lógica de fetch.
 */

export function useApiRequest<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const request = useCallback(
    async (config: AxiosRequestConfig): Promise<AxiosResponse<T> | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.request<T>(config);
        setData(response.data);
        return response;
      } catch (err) {
        setError(err as Error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { data, isLoading, error, request };
}
