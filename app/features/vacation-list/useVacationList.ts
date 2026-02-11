import { useEffect, useState, useCallback } from "react";
import { useFetch } from "../../hooks/use-fetch";
import ENDPOINT from "../../constants/endpoint";

interface QueryParamsProps {
    page: number;
    filterType?: string;
    filterValue?: string;
};

export interface ContentProps {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    status: {
        value: "default" | "waiting" | "warning" | "danger" | "success";
        label: string;
    };
}

interface DataProps {
    status?: number;
    body?: {
        content: ContentProps[] | [];
        pagination: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
}

export const useVacationList = () => {
    const { status, data, execute } = useFetch<DataProps>({
        auto: false,
        url: ENDPOINT.VACATIONS,
    });

    const [currentPage, setCurrentPage] = useState(1);

    const content = data?.body?.content ?? [];
    const totalPages = data?.body?.pagination.totalPages ?? 1;

    const header = ["Status", "Nome", "Início", "Fim"];
    
    const handlePageChange = useCallback(
        ({ page, filterType, filterValue }: QueryParamsProps) => {
            execute(ENDPOINT.VACATIONS, {
                params: {
                    page: page.toString(),
                    filterType,
                    filterValue,
                },
            });
        },
        [execute],
    );

    useEffect(() => {
        handlePageChange({ page: currentPage });
    }, [currentPage, handlePageChange]);

    return {
        handlePageChange,
        header,
        content,
        totalPages,
        currentPage,
        setCurrentPage,
        status,
    };
};