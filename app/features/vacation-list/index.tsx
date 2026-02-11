"use client";

import Table from "../../components/table";
import Card from "../../components/card";
import Title from "../../components/title";
import Loading from "../../components/loading";
import Fallback from "../../components/fallback";
import Pagination from "../../components/pagination";
import Filter from "../../components/filter";
import { useVacationList } from "./useVacationList";

const filterOptions = [
    { value: "status", label: "Status" },
    { value: "name", label: "Nome" },
    { value: "start", label: "Data de início" },
    { value: "end", label: "Data de término" }
];

export default function VacationList() {
    const {
        handlePageChange,
        header,
        content,
        totalPages,
        currentPage,
        setCurrentPage,
        status
    } = useVacationList();
    return (
        <section>
            <Title type="h3" className="mt-[30px] mb-[16px]">
                Lista
            </Title>
            <Card>
                <Filter
                    action={handlePageChange}
                    options={filterOptions}
                />
                {status === "loading" && <Loading />}
                {status === "error" && <Fallback />}
                {status === "success" && (
                    <>
                        <Table header={header} content={content} />
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </Card>
        </section>
    );
}
