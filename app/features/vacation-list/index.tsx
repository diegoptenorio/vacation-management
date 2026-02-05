"use client";

import Table from "../../components/table";
import Card from "../../components/card";
import Title from "../../components/title";
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
    };
}

export default function VacationList() {
    const { data } = useFetch<DataProps>({
        auto: true,
        url: ENDPOINT.VACATIONS,
    });

    const content = data?.body?.content ?? [];

    const header = ["Status", "Nome", "Início", "Fim", ""];

    return (
        <section>
            <Title type="h3" className="mt-[30px] mb-[16px]">
                Lista
            </Title>
            <Card>
                <Table header={header} content={content} />
            </Card>
        </section>
    );
}
