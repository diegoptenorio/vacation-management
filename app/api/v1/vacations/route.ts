import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({ status: 201 });
}

export async function GET() {
    return NextResponse.json({
        status: 201,
        body: {
            content: [
                {
                    id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
                    name: "Jamesson Bond",
                    status: "waiting",
                    start_date: "2023-10-27T14:30:00",
                    end_date: "2023-10-27T14:30:00",
                    created_at: "2026-02-04T23:03:07.367Z",
                    updated_at: "2026-02-04T23:03:07.367Z",
                },
                {
                    id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
                    name: "Maicon da Silva Jackson",
                    status: "waiting",
                    start_date: "2023-10-27T14:30:00",
                    end_date: "2023-10-27T14:30:00",
                    created_at: "2026-02-04T23:03:07.367Z",
                    updated_at: "2026-02-04T23:03:07.367Z",
                },
                {
                    id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
                    name: "Natália Portman",
                    status: "waiting",
                    start_date: "2023-10-27T14:30:00",
                    end_date: "2023-10-27T14:30:00",
                    created_at: "2026-02-04T23:03:07.367Z",
                    updated_at: "2026-02-04T23:03:07.367Z",
                },
                {
                    id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
                    name: "Marília Monroe",
                    status: "waiting",
                    start_date: "2023-10-27T14:30:00",
                    end_date: "2023-10-27T14:30:00",
                    created_at: "2026-02-04T23:03:07.367Z",
                    updated_at: "2026-02-04T23:03:07.367Z",
                },
                {
                    id: "8f9e0b3a-51b1-4d29-a9cf-91b7c9f3b212",
                    name: "Antônio Hopkins",
                    status: "waiting",
                    start_date: "2023-10-27T14:30:00",
                    end_date: "2023-10-27T14:30:00",
                    created_at: "2026-02-04T23:03:07.367Z",
                    updated_at: "2026-02-04T23:03:07.367Z",
                },
            ],
            pagination: {
                page: 1,
                pageSize: 10,
                totalItems: 120,
                totalPages: 12,
            },
        },
    });
}
