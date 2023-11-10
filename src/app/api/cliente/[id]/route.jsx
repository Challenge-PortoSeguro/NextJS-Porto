import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
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
    } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
        return NextResponse.error(error);
    }
}


export async function POST(request) {
    try {
        const body = await request.json();
        const apiResponse = await fetch("http://127.0.0.1:8081/api/cliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body),
        });

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


export async function PUT(request, { params }){
    try {
        const { id } = params;
        const body = await request.json();

        const clienteObject = {
            caminhoImagem: "",
            genero: body.genero,
            nome: body.nome,
            cpf: body.cpf,
            rg: body.rg,
            dataNascimento: body.dataNascimento,
            cnh: body.cnh,
            email: body.email,
            senha: body.senha,
        }
        console.log(clienteObject);

        const responseClient = await fetch(`http://127.0.0.1:8081/api/cliente/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(clienteObject),
        });

        const phoneObject = {
            cliente: clienteObject,
            tipo: body.tipo_telefone,
            numero: body.numero,
            ddd: body.ddd,
            ddi: body.ddi
        }
        console.log(phoneObject);
        const responsePhone = await fetch(`http://127.0.0.1:8081/api/telefone-cliente/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(phoneObject),
        });
        
        if (responseClient.ok && responsePhone.ok) {
            const data = await responseClient.json();
            return NextResponse.json(data, { status: responseClient.status });
        } else {
            console.error("Falha na solicitação. Status: " + responseClient.status + responsePhone.status);
            return NextResponse.error("Falha na solicitação. Status: " + responseClient.status + responsePhone.status, {
                status: responseClient.status,
            });
        }
    }
    catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
        return NextResponse.error(error);
    }
}
