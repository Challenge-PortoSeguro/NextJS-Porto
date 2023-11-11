import { formatDate } from "@/utils/Date";
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

    function generateRandomApoliceVeiculo() {
        const min = 10000000000;
        const max = 99999999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    try {
        const data = await request.json();
        const dataCliente = {
            cpf_cliente: data.cpf_cliente,
            dt_nasc_cliente: formatDate(data.dt_nasc_cliente),
            email_cliente: data.email_cliente,
            endereco_cliente: data.endereco_cliente,
            genero_cliente: data.genero_cliente,
            nm_cliente: data.nm_cliente,
            senha_cliente: data.senha_cliente,
            telefone_cliente: data.telefone_cliente
        }

        const dataMedida = {
            largura: data.largura,
            altura: data.altura,
            comprimento: data.comprimento,
            peso: data.peso,
            peso_suportado: data.peso_suportado
        }

        const postCliente = await fetch("http://127.0.0.1:8081/api/cliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(dataCliente),
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
            const dataVeiculo = {
                id_medida: { id: postMedidaJson.id },
                apolice_veiculo: generateRandomApoliceVeiculo(),
                modelo_veiculo: data.modelo_veiculo,
                placa_veiculo: data.placa_veiculo,
                ano_veiculo: data.ano_veiculo,
                qtd_eixos_veiculo: data.qtd_eixos_veiculo,
                renavan_veiculo: data.renavan_veiculo,
                nr_chassi: data.nr_chassi,
                tp_chassi: data.tp_chassi,
                tp_eixo: data.tp_eixo
            };

            const postVeiculo = await fetch("http://127.0.0.1:8081/api/veiculo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(dataVeiculo),
            });
            
            if (postCliente.ok && postVeiculo.ok) {
                const dataCliente = await postCliente.json();
                const dataVeiculo = await postVeiculo.json();

                const sendData = {
                    id_cliente: { id_cliente: dataCliente.id_cliente },
                    id_veiculo: { id_veiculo: dataVeiculo.id_veiculo }
                }
            
                const postVeiculoCliente = await fetch("http://127.0.0.1:8081/api/veiculo-cliente", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify(sendData),
                });
            
                if (postVeiculoCliente.ok) {
                    return new Response("Veiculo cadastrado no N pra N", { status: postCliente.status });
                } else {
                    console.error("Falha na solicitação. Status: " + postVeiculoCliente.status);
                    return new Response(
                        "Falha na solicitação. Status: " + postVeiculoCliente.status,
                        { status: postVeiculoCliente.status }
                    );
                }                
            } 

            if (postCliente.ok && postMedida.ok && postVeiculo.ok) {
                const data = await postCliente.json();
                return NextResponse.json(data, { status: postCliente.status });
            } else {
                console.error("Falha na solicitação. Status: " + postCliente.status);
                return NextResponse.error("Falha na solicitação. Status: " + postCliente.status, {
                    status: postCliente.status
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
