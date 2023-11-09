import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;

    if (id) {
        const responsePhone = await fetch(`http://127.0.0.1:8081/api/telefone-cliente/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
        
        const responseAddress = await fetch(`http://127.0.0.1:8081/api/endereco-cliente/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        const userWithPhone = await responsePhone.json();
        const userWithAddress = await responseAddress.json();
        const returnData = {
            ...userWithPhone,
            ...userWithAddress,
        }

        return NextResponse.json(returnData);
    }

    const response = await fetch("http://127.0.0.1:8081/api/cliente", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
    const users = await response.json();
    return NextResponse.json(users);
}
