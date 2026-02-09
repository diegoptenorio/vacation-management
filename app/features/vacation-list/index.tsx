"use client";

import { useCallback, useEffect, useState } from "react";
import Table from "../../components/table";
import Card from "../../components/card";
import Title from "../../components/title";
import Loading from "../../components/loading";
import Fallback from "../../components/fallback";
import Pagination from "../../components/pagination";
import { useFetch } from "../../hooks/use-fetch";
import ENDPOINT from "../../constants/endpoint";

interface ContentProps {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    status: "default" | "waiting" | "warning" | "danger" | "success";
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

export default function VacationList() {
    const { status, data, execute } = useFetch<DataProps>({
        auto: true,
        url: ENDPOINT.VACATIONS,
    });

    const [currentPage, setCurrentPage] = useState(1);

    const content = data?.body?.content ?? [];
    const totalPages = data?.body?.pagination.totalPages ?? 1;

    const header = ["Status", "Nome", "Início", "Fim", ""];
    
    const handlePageChange = useCallback((page: number) => {
        execute(
            ENDPOINT.VACATIONS,
            {
                params: {
                    page: page.toString(),
                },
            },
        ); 
    }, [execute]);

    useEffect(() => {
        handlePageChange(currentPage);
    }, [currentPage, handlePageChange]);

    return (
        <section>
            {status === "loading" && <Loading />}
            {status === "error" && <Fallback />}
            {status === "success" && (
                <>
                    <Title type="h3" className="mt-[30px] mb-[16px]">
                        Lista
                    </Title>
                    <Card>
                        <Table header={header} content={content} />
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </Card>
                </>
            )}
        </section>
    );
}
