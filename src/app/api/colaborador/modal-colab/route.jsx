import { NextResponse } from "next/server";

export async function GET() {
    try {

        const responseNtoN = await fetch(`http://127.0.0.1:8081/api/modal-colaborador`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
        const response = await responseNtoN.json();
        return NextResponse.json(response);
    } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
        return NextResponse.error(error);
    }
}