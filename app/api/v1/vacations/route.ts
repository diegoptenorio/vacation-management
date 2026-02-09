import { NextResponse } from "next/server";

const mock = [
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Jamesson Bond",
        status: "default",
        start_date: "2026-02-23T14:30:00",
        end_date: "2026-03-15T14:30:00",
        created_at: "2026-02-04T23:03:07.367Z",
        updated_at: "2026-02-04T23:03:07.367Z",
    },
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Maicon da Silva Jackson",
        status: "warning",
        start_date: "2026-02-21T14:30:00",
        end_date: "2026-03-19T14:30:00",
        created_at: "2026-02-04T23:03:07.367Z",
        updated_at: "2026-02-04T23:03:07.367Z",
    },
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Natália Portman",
        status: "waiting",
        start_date: "2026-03-03T14:30:00",
        end_date: "2026-03-23T14:30:00",
        created_at: "2026-02-04T23:03:07.367Z",
        updated_at: "2026-02-04T23:03:07.367Z",
    },
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Marília Monroe",
        status: "danger",
        start_date: "2026-03-25T14:30:00",
        end_date: "2026-04-20T14:30:00",
        created_at: "2026-02-04T23:03:07.367Z",
        updated_at: "2026-02-04T23:03:07.367Z",
    },
    {
        id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
        name: "Antônio Hopkins",
        status: "warning",
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

    return NextResponse.json({
        status: 201,
        body: {
            content: mock.slice(
                (parseInt(page) - 1) * parseInt(size),
                parseInt(page) * parseInt(size)
            ),
            pagination: {
                page: page,
                pageSize: size,
                totalItems: mock.length,
                totalPages: Math.ceil(mock.length / parseInt(size)),
            },
        },
    });
}
