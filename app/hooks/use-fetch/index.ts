import { useCallback, useState } from "react";

type Status = "initial" | "loading" | "success" | "error";

interface RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit | null;
}

export function useFetch<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("initial");

  const execute = useCallback(
    async (url: string, options?: RequestInit) => {

      try {
        setStatus("loading");
        const response = await fetch(url, {
          ...options,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const result = await response.json();

        setData(result);
        setStatus("success");

        return result as T;
      } catch (err) {
        setStatus("error");
        throw err;
      }
    },
    [],
  );

  return {
    data,
    status,
    execute,
  };
};