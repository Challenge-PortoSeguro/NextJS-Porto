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

export const config = {
    matcher: "/api/cliente",
}