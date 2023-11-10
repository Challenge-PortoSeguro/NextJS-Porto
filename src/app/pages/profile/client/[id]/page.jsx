'use client'
import "../../styles.css";
import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button/variants/primary";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import renderIcon from "@/utils/iconGallery";
import { formatDate, formatTime } from "@/utils/Date";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/page";
import Input from "@/components/Input/page";
import { useForm } from "react-hook-form";
import Select from "@/components/Select/page";

export default function ProfileClient({ params }) {
    const { setValue, handleSubmit, reset } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const route = useRouter();
    const [cliente, setCliente] = useState({});
    const [veiculos, setVeiculos] = useState([]);
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

    const fetchVehicles = async () => {
        try {
            console.log("ID: ", params.id);
            const response = await fetch(`http://localhost:3000/api/cliente/veiculo/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Veículos: ", responseData);
                setVeiculos(responseData.veiculo)
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    }

    const updateClient = async (data) => {
        console.log("Data normal: ", data);

        if(!data.nome) data.nome = cliente?.cliente?.nome;
        if(!data.email) data.email = cliente?.cliente?.email;
        if(!data.cpf) data.cpf = cliente?.cliente?.cpf;
        if(!data.rg) data.rg = cliente?.cliente?.rg;
        if(!data.cnh) data.cnh = cliente?.cliente?.cnh;
        if(!data.dataNascimento) data.dataNascimento = formatDate(cliente?.cliente?.dataNascimento);
        if(!data.genero){
            const genero = cliente?.cliente?.genero?.id;
            data.genero = genero == 1 ? { id: 1 } : (genero == 2 ? { id: 2 } : { id: 3 });
        }
        if(!data.ddi) data.ddi = cliente?.ddi;
        if(!data.ddd) data.ddd = cliente?.ddd;
        if(!data.numero) data.numero = cliente?.numero;
        if(!data.logradouro) data.logradouro = cliente?.logradouro?.nome;
        if(!data.numLogradouro) data.numLogradouro = cliente?.numLogradouro;
        data.senha = cliente?.cliente?.senha;
        console.log("Data preenchida: ", data);

        try {
            const response = await fetch(`http://localhost:3000/api/cliente/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Cliente atualizado: ", responseData);
                fetchClient();
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
            alert("Ocorreu um erro durante a solicitação:", error);
        }
    }

    useEffect(() => {
        localStorage.getItem("id") && fetchClient();
        localStorage.getItem("id") && fetchVehicles();
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
                            <h1>Id:</h1>
                            <h2>{veiculos.id}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Marca:</h1>
                            <h2>{veiculos.marca}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Modelo:</h1>
                            <h2>{veiculos.modelo}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Placa:</h1>
                            <h2>{veiculos.placa}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Ano Fabricação:</h1>
                            <h2>{veiculos.anoFabricacao}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Apolice:</h1>
                            <h2>{veiculos.apolice}</h2>
                        </div>
                    </div>
                    <Button onClick={() => setIsOpen(true)}>{icons.edit}Editar</Button>
                </aside>
                <div className="chatbot">
                    <div className="container">
                        <Button>Iniciar ChatBot</Button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Modal closeModal={() => { setIsOpen(false); reset(); }} title="Atualizar Informações">
                    <div className="modal_update">
                        <form onSubmit={handleSubmit(updateClient)}>
                            <Input
                                placeholder="Digite seu novo nome"
                                onChange={(e) => setValue("nome", e.target.value)}
                            />
                            <Input
                                type="email"
                                placeholder="Digite seu novo email"
                                onChange={(e) => setValue("email", e.target.value)}
                            />
                            <Input
                                type="number"
                                placeholder="Digite seu novo CPF"
                                onChange={(e) => setValue("cpf", parseInt(e.target.value))}
                            />
                            <Input
                                type="number"
                                placeholder="Digite seu novo RG"
                                onChange={(e) => setValue("rg", parseInt(e.target.value))}
                            />
                            <Input
                                type="number"
                                placeholder="Digite sua nova CNH"
                                onChange={(e) => setValue("cnh", parseInt(e.target.value))}
                            />
                            <Input
                                type="date"
                                placeholder="Digite sua nova data de nascimento"
                                onChange={(e) => setValue("dataNascimento", formatDate(e.target.value))}
                            />
                            <Select
                                placeholder="Digite seu novo gênero"
                                options={[
                                    { id: 1, label: "Masculino" },
                                    { id: 2, label: "Feminino" },
                                    { id: 3, label: "Prefiro não dizer" },
                                ]}
                                onChange={(e) => {
                                    if(e.target.value == "Masculino") setValue("genero", { id: 1 });
                                    if(e.target.value == "Feminino") setValue("genero", { id: 2 });
                                    if(e.target.value == "Prefiro não dizer") setValue("genero", { id: 3 });
                                }}
                            />
                            <Input
                                type="number"
                                placeholder="Digite seu novo DDI"
                                onChange={(e) => setValue("ddi", parseInt(e.target.value))}
                            />
                            <Input
                                type="number"
                                placeholder="Digite seu novo DDD"
                                onChange={(e) => setValue("ddd", parseInt(e.target.value))}
                            />
                            <Input
                                type="number"
                                placeholder="Digite seu novo número"
                                onChange={(e) => setValue("numero", parseInt(e.target.value))}
                            />
                            <Input
                                placeholder="Digite seu novo logradouro"
                                onChange={(e) => setValue("logradouro", e.target.value)}
                            />
                            <Input
                                type="number"
                                placeholder="Digite seu novo número de logradouro"
                                onChange={(e) => setValue("numLogradouro", parseInt(e.target.value))}
                            />
                            <Input
                                placeholder="Digite seu novo DDI"
                                onChange={(e) => setValue("ddi", e.target.value)}
                            />
                            <Input
                                type="number"
                                placeholder="Digite seu novo DDD"
                                onChange={(e) => setValue("ddd", parseInt(e.target.value))}
                            />
                            <Input
                                type="number"
                                placeholder="Digite seu novo número"
                                onChange={(e) => setValue("numero", parseInt(e.target.value))}
                            />
                            <Select
                                placeholder="Escolha seu novo tipo de telefone"
                                options={[
                                    { id: 1, label: "COMERCIAL" },
                                    { id: 2, label: "CELULAR" },
                                    { id: 3, label: "FIXO" },
                                ]}
                                onChange={(e) => setValue("tipo_telefone", e.target.value)}
                            />
                            {/* <Button type="submit" onClick={() => setTimeout(() => {setIsOpen(false); reset()}, 1500)}>Atualizar</Button> */}
                            <Button type="submit">Atualizar</Button>
                        </form>
                    </div>
                </Modal>
            )}
        </main>
    )
}