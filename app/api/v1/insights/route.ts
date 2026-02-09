import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        status: 201,
        body: {
            vacation_steps: {
                waiting: "201",
                approving: "18",
                progress: "23",
            },
            vacation_deadline: {
                waiting: "61",
                approving: "23",
                progress: "74",
            },
            vacation_duration: {
                waiting: "63",
                approving: "107",
                progress: "22",
            },
        },
    });
}
