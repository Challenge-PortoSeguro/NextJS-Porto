import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params;
        console
        if (id) {
            const responseNtoN = await fetch(`http://127.0.0.1:8081/api/veiculo-cliente/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
            const response = await responseNtoN.json();
            return NextResponse.json(response);
        }
    } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
        return NextResponse.error(error);
    }
}