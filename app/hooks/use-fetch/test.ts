/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetch } from ".";

describe("useFetch", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should start with initial status", () => {
        const { result } = renderHook(() => useFetch());

        expect(result.current.status).toBe("initial");
        expect(result.current.data).toBeNull();
    });

    it("should fetch data successfully", async () => {
        const mockResponse = { name: "João" };

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        } as unknown);

        const { result } = renderHook(() => useFetch<typeof mockResponse>());

        await act(async () => {
            const data = await result.current.execute("/api/test");
            expect(data).toEqual(mockResponse);
        });

        expect(fetch).toHaveBeenCalledWith(
            "/api/test",
            expect.objectContaining({}),
        );

        expect(result.current.status).toBe("success");
        expect(result.current.data).toEqual(mockResponse);
    });

    it("should throw error and set status error when response is not ok", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 500,
        } as unknown);

        const { result } = renderHook(() => useFetch());

        await act(async () => {
            await expect(result.current.execute("/api/test")).rejects.toThrow(
                "Request failed: 500",
            );
        });

        expect(result.current.status).toBe("error");
    });

    it("should throw error and set status error when fetch rejects", async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

        const { result } = renderHook(() => useFetch());

        await act(async () => {
            await expect(result.current.execute("/api/test")).rejects.toThrow(
                "Network error",
            );
        });

        expect(result.current.status).toBe("error");
    });

    it("should set loading before finishing request", async () => {
        let resolvePromise!: Function;

        global.fetch = jest.fn().mockReturnValue(
            new Promise((resolve) => {
                resolvePromise = () =>
                    resolve({
                        ok: true,
                        json: async () => ({ ok: true }),
                    });
            }) as unknown,
        );

        const { result } = renderHook(() => useFetch());

        act(() => {
            result.current.execute("/api/test");
        });

        expect(result.current.status).toBe("loading");

        await act(async () => {
            resolvePromise();
        });

        await waitFor(() => {
            expect(result.current.status).toBe("success");
        });
    });

    it("should send POST with body", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({}),
        } as unknown);

        const { result } = renderHook(() => useFetch());

        await act(async () => {
            await result.current.execute("/api/test", {
                method: "POST",
                body: JSON.stringify({ a: 1 }),
            });
        });

        expect(fetch).toHaveBeenCalledWith(
            "/api/test",
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify({ a: 1 }),
            }),
        );
    });

    it("should fail if url doesnt exist", async () => {
        const { result } = renderHook(() => useFetch());

        await expect(
            result.current.execute("", {
                method: "POST",
                body: JSON.stringify({ a: 1 }),
            }),
        ).rejects.toThrow("URL is required");
    });

    it("should fetch data automatically", async () => {
        const mockResponse = { name: "João" };

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        } as unknown);

        await act(async () => {
            renderHook(() =>
                useFetch<typeof mockResponse>({ auto: true, url: "/api/test" }),
            );
        });

        expect(fetch).toHaveBeenCalledWith(
            "/api/test",
            expect.objectContaining({}),
        );
    });
});
