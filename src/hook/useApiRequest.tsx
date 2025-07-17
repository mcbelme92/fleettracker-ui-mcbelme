import { useState, useCallback } from "react";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../service/api";

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
