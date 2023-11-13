import { NextResponse } from "next/server";

export async function POST(request, response) {
    try {
        const data = await request.json();
        const apiResponse = await fetch("http://127.0.0.1:8081/api/colaborador/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();
            return NextResponse.json(data, { status: apiResponse.status });
        } else {
            console.error("Falha na solicitação. Status: " + apiResponse.status);
            return NextResponse.error("Falha na solicitação. Status: " + apiResponse.status, {
                status: apiResponse.status
            });
        }
    } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
        return NextResponse.error(error);
    }
}