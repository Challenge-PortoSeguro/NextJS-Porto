'use client'
import "../../styles.css";
import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button/variants/primary";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import renderIcon from "@/utils/iconGallery";
import { formatTime } from "@/utils/Date";
import { useRouter } from "next/navigation";

export default function ProfileClient({ params }) {
    const route = useRouter();
    const [cliente, setCliente] = useState({});
    const icons = useMemo(() => ({
        play: renderIcon({ name: "play", size: 18, color: "#000" }),
        edit: renderIcon({ name: "edit", size: 18, color: "#ffffff" }),
    }), []);


    const fetchClient = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/cliente/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Cliente: ", responseData);
                setCliente(responseData);
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    }

    const data = [
        { id: 1, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
        { id: 2, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
        { id: 3, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
        { id: 4, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
        { id: 5, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
        { id: 6, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
        { id: 7, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
        { id: 8, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" }
    ]

    useEffect(() => {
        localStorage.getItem("id") && fetchClient();
        !localStorage.getItem("id") && route.push("/");
    }, []);

    return (
        <main>
            <div className="upper-container">
                <aside>
                    <header className="header-info">
                        <Image src={Logo} width={45} height={45} alt="Logo Porto Assistant" />
                    </header>
                    <div className="client-info">
                        <h2>Cliente</h2>
                        <div className="div-info">
                            <h1>Nome:</h1>
                            <h2>{cliente?.cliente?.nome}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Email:</h1>
                            <h2>{cliente?.cliente?.email}</h2>
                        </div>
                        <div className="div-info">
                            <h1>CPF:</h1>
                            <h2>{cliente?.cliente?.cpf}</h2>
                        </div>
                        <div className="div-info">
                            <h1>RG:</h1>
                            <h2>{cliente?.cliente?.rg}</h2>
                        </div>
                        <div className="div-info">
                            <h1>CNH:</h1>
                            <h2>{cliente?.cliente?.cnh}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Nascimento:</h1>
                            <h2>{formatTime(cliente?.cliente?.dataNascimento)}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Gênero:</h1>
                            <h2>{cliente?.cliente?.genero?.id == 1 ? "Masculino" : (cliente?.genero?.id == 2 ? "Feminino" : "Prefiro não dizer")}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Telefone:</h1>
                            <h2>{cliente?.ddi + " " + cliente?.ddd + " " + cliente?.numero}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Endereço:</h1>
                            <h2>{cliente?.logradouro?.nome + " " + cliente?.numLogradouro}</h2>
                        </div>
                    </div>
                    <div className="vehicle-info">
                        <h2>Veículo</h2>
                        <div className="div-info">
                            <h1>Modelo:</h1>
                            <h2>I-7723</h2>
                        </div>
                        <div className="div-info">
                            <h1>Placa:</h1>
                            <h2>HWV-0124</h2>
                        </div>
                        <div className="div-info">
                            <h1>Qtd Eixos:</h1>
                            <h2>3</h2>
                        </div>
                        <div className="div-info">
                            <h1>Renavam:</h1>
                            <h2>47318462164</h2>
                        </div>
                        <div className="div-info">
                            <h1>Nº Chassi:</h1>
                            <h2>8S40m4U0uzE6B4398</h2>
                        </div>
                        <div className="div-info">
                            <h1>Altura:</h1>
                            <h2>3m</h2>
                        </div>
                        <div className="div-info">
                            <h1>Largura:</h1>
                            <h2>5m</h2>
                        </div>
                        <div className="div-info">
                            <h1>Comprimento:</h1>
                            <h2>1.5m</h2>
                        </div>
                        <div className="div-info">
                            <h1>Peso:</h1>
                            <h2>4000kg</h2>
                        </div>
                        <div className="div-info">
                            <h1>Peso Suportado:</h1>
                            <h2>3000kg</h2>
                        </div>
                    </div>
                    <Button>{icons.edit}Editar</Button>
                </aside>
                <div className="chatbot">
                    <div className="container">
                        <Button>Iniciar ChatBot</Button>
                    </div>
                </div>
            </div>
            <div className="lower-container">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Colaborador</th>
                            <th>Modal</th>
                            <th>Tipo Chamado</th>
                            <th>Cliente</th>
                            <th>Veículo</th>
                            <th>Problema</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((log) => (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{log.colaborador}</td>
                                <td>{log.modal}</td>
                                <td>{log.tipoChamado}</td>
                                <td>{log.cliente}</td>
                                <td>{log.veiculo}</td>
                                <td>{log.problema}</td>
                                <td>{log.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}