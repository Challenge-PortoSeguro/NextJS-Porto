import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch("http://localhost:8081/api/cliente", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
    const users = await response.json();

    return NextResponse.json(users);
}

export async function POST(request) {
    if (request.method !== "POST") {
        return NextResponse.forbidden("Método não permitido");
    }

    try {
        const { email, password } = request.body;
        const response = await fetch("http://localhost:8081/api/cliente/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Falha na solicitação. Status: " + response.status);
        }
    } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
        return NextResponse.error(error);
    }
}

export const config = {
    matcher: ["/api/cliente", "/api/cliente/login"],
}