import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, senha } = await request.json();
        const apiResponse = await fetch("http://127.0.0.1:8081/api/cliente/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ email_cliente: email, senha_cliente: senha }),
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