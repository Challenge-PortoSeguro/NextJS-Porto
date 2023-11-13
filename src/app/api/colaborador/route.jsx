import { NextResponse } from "next/server";

export async function GET(){
    const response = await fetch("http://127.0.0.1:8081/api/modal-colaborador", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });

    const data = await response.json();

    return NextResponse.json(data);
} 