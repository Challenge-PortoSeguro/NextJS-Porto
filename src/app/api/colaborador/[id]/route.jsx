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


export async function POST(request) {
    try {
        const data = await request.json();
        const dataColaborador ={
            nm_colab: data.nm_colab,
            cpf_colab: data.cpf_colab,
            genero_colab: data.genero_colab,
            tel_colab: data.tel_colab,
            dt_nasc_colab: data.dt_nasc_colab,
            endereco_colab: data.endereco_colab,
            email_colab: data.email_colab,
            senha_colab: data.senha_colab,
        }

        const dataMedida = {
            largura: data.largura,
            altura: data.altura,
            comprimento: data.comprimento,
            peso: data.peso,
            peso_suportado: data.peso_suportado
        }

        const postColaborador = await fetch("http://127.0.0.1:8081/api/colaborador", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(dataColaborador),
        });

        const postMedida = await fetch("http://127.0.0.1:8081/api/medida", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(dataMedida),
        });

        if (postMedida.ok) {
            const postMedidaJson = await postMedida.json();
            const dataModal = {
                id_medida: { id: postMedidaJson.id },
                modelo_modal: data.modelo_modal,
                placa_modal: data.placa_modal,
                marca_modal: data.marca_modal,
                ano_modal: data.ano_modal,
                tipo_modal: data.tipo_modal
            };

            const postModal = await fetch("http://127.0.0.1:8081/api/modal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(dataModal),
            });
            
            if (postColaborador.ok && postModal.ok) {
                const dataColaborador = await postColaborador.json();
                const dataModal = await postModal.json();

                const sendData = {
                    id_colab: { id_colab: dataColaborador.id_colab },
                    id_modal: { id_modal: dataModal.id_modal }
                }
            
                const postColaboradorModal = await fetch("http://127.0.0.1:8081/api/modal-colaborador", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify(sendData),
                });
            
                if (postColaboradorModal.ok) {
                    return new Response("Modal cadastrado no N pra N", { status: postColaborador.status });
                } else {
                    console.error("Falha na solicitação. Status: " + postColaboradorModal.status);
                    return new Response(
                        "Falha na solicitação. Status: " + postColaboradorModal.status,
                        { status: postColaboradorModal.status }
                    );
                }                
            } 

            if (postColaborador.ok && postMedida.ok && postModal.ok) {
                const data = await postColaborador.json();
                return NextResponse.json(data, { status: postColaborador.status });
            } else {
                console.error("Falha na solicitação. Status: " + postColaborador.status);
                return NextResponse.error("Falha na solicitação. Status: " + postColaborador.status, {
                    status: postColaborador.status
                });
            }
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