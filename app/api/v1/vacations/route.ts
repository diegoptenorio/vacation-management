import { NextResponse } from "next/server";

interface filterMockProps {
    data: typeof mock;
    type: string;
    value: string;
};

const mock = [
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Jamesson Bond",
        status: {
            value: "default",
            label: "Não iniciado",
        },
        start_date: "2026-02-23T14:30:00",
        end_date: "2026-03-15T14:30:00",
        created_at: "2026-02-04T23:03:07.367Z",
        updated_at: "2026-02-04T23:03:07.367Z",
    },
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Maicon da Silva Jackson",
        status: {
            value: "warning",
            label: "Em aprovação",
        },
        start_date: "2026-02-21T14:30:00",
        end_date: "2026-03-19T14:30:00",
        created_at: "2026-02-04T23:03:07.367Z",
        updated_at: "2026-02-04T23:03:07.367Z",
    },
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Natália Portman",
        status: {
            value: "waiting",
            label: "Em andamento",
        },
        start_date: "2026-03-03T14:30:00",
        end_date: "2026-03-23T14:30:00",
        created_at: "2026-02-04T23:03:07.367Z",
        updated_at: "2026-02-04T23:03:07.367Z",
    },
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Marília Monroe",
        status: {
            value: "danger",
            label: "Expirado",
        },
        start_date: "2026-03-25T14:30:00",
        end_date: "2026-04-20T14:30:00",
        created_at: "2026-02-04T23:03:07.367Z",
        updated_at: "2026-02-04T23:03:07.367Z",
    },
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Antônio Hopkins",
        status: {
            value: "warning",
            label: "Em aprovação",
        },
        start_date: "2026-05-10T14:30:00",
        end_date: "2026-05-25T14:30:00",
        created_at: "2026-02-04T23:03:07.367Z",
        updated_at: "2026-02-04T23:03:07.367Z",
    },
];

export async function POST() {
    return NextResponse.json({ status: 201 });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? "1";
    const size = searchParams.get("size") ?? "4";
    const filterType = searchParams.get("filterType") ?? "status";
    const filterValue = searchParams.get("filterValue") ?? "";

    const filterMock = ({ data, type, value }: filterMockProps) => {
        if (!value) {
            return data;
        }
        return data.filter((item) => {
            switch (type) {
                case "status":
                    return item.status.label
                        .toLowerCase()
                        .includes(value.toLowerCase());
                case "name":
                    return item.name
                        .toLowerCase()
                        .includes(value.toLowerCase());
                case "start":
                    return new Date(item.start_date).toLocaleDateString("pt-BR")
                        .includes(value);
                case "end":
                    return new Date(item.end_date).toLocaleDateString("pt-BR")
                        .includes(value.toLowerCase());
                default:
                    return false;
            };
        });
    };

    const filteredData = filterMock({
        data: mock,
        type: filterType,
        value: filterValue,
    });

    return NextResponse.json({
        status: 201,
        body: {
            content: filteredData.slice(
                (parseInt(page) - 1) * parseInt(size),
                parseInt(page) * parseInt(size),
            ),
            pagination: {
                page: page,
                pageSize: size,
                totalItems: filteredData.length.toString(),
                totalPages: Math.ceil(
                    filteredData.length / parseInt(size),
                ).toString(),
            },
        },
    });
}
