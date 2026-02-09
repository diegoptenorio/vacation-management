"use client";

import { useCallback, useEffect, useState } from "react";

type Status = "initial" | "loading" | "success" | "error";

interface RequestInit {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: BodyInit | null;
    params?: Record<string, string | number | boolean | undefined>;
}

interface UseFetchOptions {
    auto?: boolean;
    url?: string;
    options?: RequestInit;
}

function buildUrlWithQuery(
    baseUrl: string,
    queryParams?: Record<string, string | number | boolean | undefined>,
): string {
    if (!queryParams || Object.keys(queryParams).length === 0) {
        return baseUrl;
    }

    const queryString = new URLSearchParams(
        Object.entries(queryParams)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)]),
    ).toString();

    return `${baseUrl}?${queryString}`;
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
            const finalUrl = requestUrl ?? url ?? "";
            const mountedUrl = buildUrlWithQuery(finalUrl, requestOptions?.params);

            if (!mountedUrl) {
                throw new Error("URL is required");
            }

            try {
                setStatus("loading");

                const response = await fetch(mountedUrl, {
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
