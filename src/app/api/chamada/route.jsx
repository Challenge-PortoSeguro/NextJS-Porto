import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = await fetch("http://127.0.0.1:8081/api/chamada", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error(error);
    }
}


export async function POST(request) {
    const data = await request.json();

    try {
        const response = fetch("http://127.0.0.1:8081/api/chamada", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
        });
        return new Response("Chamada criada com sucesso!", { status: 200 });
    } catch (error) {
        return NextResponse.error(error);
    }
}