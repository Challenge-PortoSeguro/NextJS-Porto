import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    if (id) {
        const responseById = await fetch(`http://127.0.0.1:8081/api/colaborador/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
        const userById = await responseById.json();
        return NextResponse.json(userById);
    }
    const users = await responseAll.json();
    return NextResponse.json(users);
}


export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        const responseClient = await fetch(`http://127.0.0.1:8081/api/colaborador/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body),
        });

        if (responseClient.ok) {
            const data = await responseClient.json();
            return NextResponse.json(data, { status: responseClient.status });
        } else {
            console.error("Falha na solicitação. Status: " + responseClient.status);
            return NextResponse.error("Falha na solicitação. Status: " + responseClient.status, {
                status: responseClient.status,
            });
        }
    }
    catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
        return NextResponse.error(error);
    }
}