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

    const responseAll = await fetch("http://127.0.0.1:8081/api/colaborador", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
    const users = await responseAll.json();
    return NextResponse.json(users);
}
