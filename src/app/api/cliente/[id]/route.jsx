import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params;
        if (id) {
            const response = await fetch(`http://127.0.0.1:8081/api/cliente/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
            const responseAPI = await response.json();
            return NextResponse.json(responseAPI);
        }
    } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
        return NextResponse.error(error);
    }
}


export async function POST(request) {
    try {
        const body = await request.json();
        console.log("Body: ", body);
        // const apiResponse = await fetch("http://127.0.0.1:8081/api/cliente", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "*",
        //     },
        //     body: JSON.stringify(body),
        // });

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


export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        const responseClient = await fetch(`http://127.0.0.1:8081/api/cliente/${id}`, {
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
