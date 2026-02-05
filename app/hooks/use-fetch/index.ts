"use client";

import { useCallback, useEffect, useState } from "react";

type Status = "initial" | "loading" | "success" | "error";

interface RequestInit {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: BodyInit | null;
}

interface UseFetchOptions {
    auto?: boolean;
    url?: string;
    options?: RequestInit;
}

export function useFetch<T = unknown>({
    auto = false,
    url,
    options,
}: UseFetchOptions = {}) {
    const [data, setData] = useState<T | null>(null);
    const [status, setStatus] = useState<Status>("initial");

    const execute = useCallback(
        async (requestUrl?: string, requestOptions?: RequestInit) => {
            const finalUrl = requestUrl ?? url;

            if (!finalUrl) {
                throw new Error("URL is required");
            }

            try {
                setStatus("loading");

                const response = await fetch(finalUrl, {
                    ...options,
                    ...requestOptions,
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
        [url, options],
    );

    useEffect(() => {
        if (auto && url) {
            execute();
        }
    }, [auto, url, execute]);

    return {
        data,
        status,
        execute,
    };
}
