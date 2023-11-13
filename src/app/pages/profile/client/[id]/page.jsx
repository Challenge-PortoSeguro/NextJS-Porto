'use client'
import "../../styles.css";
import Logo from "@/assets/images/logo.png";
import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonSecondary from "@/components/Button/variants/secondary";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import renderIcon from "@/utils/iconGallery";
import { formatDate, formatTime } from "@/utils/Date";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/page";
import Input from "@/components/Input/page";
import { useForm } from "react-hook-form";
import Select from "@/components/Select/page";
import TextArea from "@/components/TextArea/page";

export default function ProfileClient({ params }) {
    const route = useRouter();
    const [steps, setSteps] = useState(0);
    const { setValue, handleSubmit, reset } = useForm();
    const [isOpenVeiculo, setIsOpenVeiculo] = useState(false);
    const [isOpenCliente, setIsOpenCliente] = useState(false);
    const [cliente, setCliente] = useState({});
    const [veiculos, setVeiculos] = useState([]);
    const [idVeicCliente, setIdVeicCliente] = useState();
    const [colabs, setColabs] = useState([]);
    const [selectedGuincho, setSelectedGuincho] = useState();
    const [chamadas, setChamadas] = useState([]);
    const icons = useMemo(() => ({
        play: renderIcon({ name: "play", size: 18, color: "#000" }),
        edit: renderIcon({ name: "edit", size: 18, color: "#ffffff" }),
        back: renderIcon({ name: "back", size: 18, color: "#000000" }),
        next: renderIcon({ name: "next", size: 18, color: "#000000" }),
        guincho: renderIcon({ name: "guincho", size: 18, color: "#ffffff" }),
    }), []);

    const fetchClient = useCallback(async () => {
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
                setCliente(responseData);
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    }, [params.id]);

    const fetchVehicles = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/cliente/veiculo/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setIdVeicCliente(data.id_veic_client)
                const { id_veiculo } = data;
                setVeiculos(id_veiculo)
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    }, [params.id]);

    const fetchColabs = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/colaborador/modal-colab`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setColabs(responseData);
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    };

    const fetchChamadas = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/chamada`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setChamadas(responseData);
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    };

    const updateClient = async (data) => {
        if (!data.cpf_cliente) data.cpf_cliente = cliente.cpf_cliente;
        if (!data.dt_nasc_cliente) data.dt_nasc_cliente = cliente.dt_nasc_cliente;
        if (!data.email_cliente) data.email_cliente = cliente.email_cliente;
        if (!data.endereco_cliente) data.endereco_cliente = cliente.endereco_cliente;
        if (!data.genero_cliente) data.genero_cliente = cliente.genero_cliente;
        if (!data.nm_cliente) data.nm_cliente = cliente.nm_cliente;
        if (!data.senha_cliente) data.senha_cliente = cliente.senha_cliente;
        if (!data.telefone_cliente) data.telefone_cliente = cliente.telefone_cliente;
        data.dt_nasc_cliente = formatDate(data.dt_nasc_cliente);

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
                fetchClient();
                setIsOpenCliente(false);
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
            alert("Ocorreu um erro durante a solicitação:", error);
        }
    }

    const updateVehicle = async (data) => {
        if (!data.ano_veiculo) data.ano_veiculo = veiculos.ano_veiculo;
        data.apolice_veiculo = veiculos.apolice_veiculo;
        data.id_medida = { id: veiculos.id_medida.id };
        if (!data.modelo_veiculo) data.modelo_veiculo = veiculos.modelo_veiculo;
        if (!data.nr_chassi) data.nr_chassi = veiculos.nr_chassi;
        if (!data.placa_veiculo) data.placa_veiculo = veiculos.placa_veiculo;
        if (!data.qtd_eixos_veiculo) data.qtd_eixos_veiculo = veiculos.qtd_eixos_veiculo;
        if (!data.renavan_veiculo) data.renavan_veiculo = veiculos.renavan_veiculo;
        if (!data.tp_chassi) data.tp_chassi = veiculos.tp_chassi;
        if (!data.tp_eixo) data.tp_eixo = veiculos.tp_eixo;

        try {
            const response = await fetch(`http://localhost:3000/api/cliente/veiculo/${veiculos?.id_veiculo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                fetchVehicles();
                setIsOpenVeiculo(false);
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
            alert("Ocorreu um erro durante a solicitação:", error);
        }
    }

    const onSubmit = async (data) => {
        if (!data.ds_prob_chamada || !data.local_chamada || !data.destino_chamada) return alert("Preencha todos os campos");

        data.id_veic_client = { id_veic_client: idVeicCliente };
        data.id_modal_colab = { id_modal_colab: selectedGuincho };
        data.dt_inicio_chamada = formatDate(new Date());
        data.dt_fim_chamada = "";

        try {
            const response = await fetch(`http://localhost:3000/api/chamada`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSteps(0);
                fetchChamadas();
                alert("Chamada solicitada com sucesso");
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    }

    useEffect(() => {
        localStorage.getItem("id") && fetchClient();
        localStorage.getItem("id") && fetchVehicles();
        localStorage.getItem("id") && fetchColabs();
        localStorage.getItem("id") && fetchChamadas();
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
                            <h2>{cliente?.nm_cliente}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Email:</h1>
                            <h2>{cliente?.email_cliente}</h2>
                        </div>
                        <div className="div-info">
                            <h1>CPF:</h1>
                            <h2>{cliente?.cpf_cliente}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Nascimento:</h1>
                            <h2>{cliente?.dt_nasc_cliente && formatTime(cliente?.dt_nasc_cliente)}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Gênero:</h1>
                            <h2>{cliente?.genero_cliente}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Telefone:</h1>
                            <h2>{cliente?.telefone_cliente}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Endereço:</h1>
                            <h2>{cliente?.endereco_cliente}</h2>
                        </div>
                    </div>
                    <div className="vehicle-info">
                        <h2>Veículo</h2>
                        <div className="div-info">
                            <h1>Id:</h1>
                            <h2>{veiculos?.id_veiculo}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Modelo:</h1>
                            <h2>{veiculos?.modelo_veiculo}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Placa:</h1>
                            <h2>{veiculos?.placa_veiculo}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Ano Fabricação:</h1>
                            <h2>{veiculos?.ano_veiculo}</h2>
                        </div>
                        <div className="div-info">
                            <h1>Apolice:</h1>
                            <h2>{veiculos?.apolice_veiculo}</h2>
                        </div>
                    </div>
                </aside>
                <div className="chatbot">
                    <div className="container">
                        {veiculos.length !== 0 && steps === 0 && <ButtonPrimary onClick={() => setSteps(1)}>Iniciar Chamada</ButtonPrimary>}
                        {steps === 1 && (
                            <div className="container_info_step1">
                                <h2 className="title_vehicle_step1">As informações do seu veículo estão atualizadas?</h2>

                                <div className="infos">
                                    <h1>Id:</h1>
                                    <h2>{veiculos?.id_veiculo}</h2>
                                </div>
                                <div className="infos">
                                    <h1>Modelo:</h1>
                                    <h2>{veiculos?.modelo_veiculo}</h2>
                                </div>
                                <div className="infos">
                                    <h1>Placa:</h1>
                                    <h2>{veiculos?.placa_veiculo}</h2>
                                </div>
                                <div className="infos">
                                    <h1>Ano Fabricação:</h1>
                                    <h2>{veiculos?.ano_veiculo}</h2>
                                </div>
                                <div className="infos">
                                    <h1>Apolice:</h1>
                                    <h2>{veiculos?.apolice_veiculo}</h2>
                                </div>
                                <p className="title_medidas_step1">Medidas:</p>
                                <div className="infos">
                                    <h1>Altura:</h1>
                                    <h2>{veiculos?.id_medida?.altura} m</h2>
                                </div>
                                <div className="infos">
                                    <h1>Largura:</h1>
                                    <h2>{veiculos?.id_medida?.largura} m</h2>
                                </div>
                                <div className="infos">
                                    <h1>Comprimento:</h1>
                                    <h2>{veiculos?.id_medida?.comprimento} m</h2>
                                </div>
                                <div className="infos">
                                    <h1>Peso:</h1>
                                    <h2>{veiculos?.id_medida?.peso} tol</h2>
                                </div>
                                <div className="infos">
                                    <h1>Peso Suportado:</h1>
                                    <h2>{veiculos?.id_medida?.peso_suportado} tol</h2>
                                </div>
                                <div className="divButton">
                                    <ButtonSecondary onClick={() => setSteps(0)}>{icons.back}</ButtonSecondary>
                                    {veiculos?.id_medida && <ButtonPrimary onClick={() => setIsOpenVeiculo(true)}>{icons.edit}Editar</ButtonPrimary>}
                                    <ButtonSecondary onClick={() => setSteps(2)}>{icons.next}</ButtonSecondary>
                                </div>
                            </div>
                        )}
                        {steps === 2 && (
                            <div className="container_info_step1">
                                <h2 className="title_vehicle_step1">As informações do cliente estão atualizadas?</h2>
                                <div className="infos">
                                    <h1>Nome:</h1>
                                    <h2>{cliente?.nm_cliente}</h2>
                                </div>
                                <div className="infos">
                                    <h1>Email:</h1>
                                    <h2>{cliente?.email_cliente}</h2>
                                </div>
                                <div className="infos">
                                    <h1>CPF:</h1>
                                    <h2>{cliente?.cpf_cliente}</h2>
                                </div>
                                <div className="infos">
                                    <h1>Nascimento:</h1>
                                    <h2>{cliente?.dt_nasc_cliente && formatTime(cliente?.dt_nasc_cliente)}</h2>
                                </div>
                                <div className="infos">
                                    <h1>Gênero:</h1>
                                    <h2>{cliente?.genero_cliente}</h2>
                                </div>
                                <div className="infos">
                                    <h1>Telefone:</h1>
                                    <h2>{cliente?.telefone_cliente}</h2>
                                </div>
                                <div className="infos">
                                    <h1>Endereço:</h1>
                                    <h2>{cliente?.endereco_cliente}</h2>
                                </div>
                                <div className="divButton">
                                    <ButtonSecondary onClick={() => setSteps(1)}>{icons.back}</ButtonSecondary>
                                    {cliente?.id_cliente && <ButtonPrimary onClick={() => setIsOpenCliente(true)}>{icons.edit}Editar</ButtonPrimary>}
                                    <ButtonSecondary onClick={() => setSteps(3)}>{icons.next}</ButtonSecondary>
                                </div>
                            </div>
                        )}
                        {steps === 3 && (
                            <>
                                <h2 className="title_vehicle_step1">Selecione um Guincho</h2>
                                {colabs.length !== 0 && (
                                    colabs.map((colab) => (
                                        <div className="container_info_step3" key={colab.id_colab}>
                                            <p>{colab.nm_colab}</p>
                                            <p>{colab.id_modal.marca_modal + " - " + colab.id_modal.modelo_modal}</p>
                                            <p>{colab.id_modal.placa_modal}</p>
                                            <ButtonPrimary onClick={() => { setSelectedGuincho(colab.id_modal_colab); setSteps(4); }}>Selecionar {icons.guincho}</ButtonPrimary>
                                        </div>
                                    ))
                                )}
                                {colabs.length === 0 && <p style={({ fontSize: "24px", fontWeight: "700" })}>Não há guinchos disponíveis</p>}
                                <div style={({ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" })}>
                                    <ButtonSecondary onClick={() => setSteps(2)}>{icons.back}</ButtonSecondary>
                                    <ButtonSecondary onClick={() => {
                                        if (selectedGuincho) setSteps(4);
                                        else alert("Selecione um guincho");
                                    }}>{icons.next}</ButtonSecondary>
                                </div>
                            </>
                        )}
                        {steps === 4 && (
                            <form className="form_chamada" onSubmit={handleSubmit(onSubmit)}>
                                <TextArea
                                    label="Descrição do problema"
                                    maxLength={300}
                                    placeholder="Digite sua descrição"
                                    onChange={(e) => setValue("ds_prob_chamada", e.target.value)}
                                />
                                <Input
                                    label="Local Atual"
                                    maxLength={50}
                                    placeholder="Digite seu local atual"
                                    onChange={(e) => setValue("local_chamada", e.target.value)}
                                />
                                <Input
                                    label="Local de Destino"
                                    maxLength={50}
                                    placeholder="Digite seu local de destino"
                                    onChange={(e) => setValue("destino_chamada", e.target.value)}
                                />
                                <div style={({ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" })}>
                                    <ButtonSecondary onClick={() => { setSteps(3); reset(); }}>{icons.back}</ButtonSecondary>
                                    <ButtonPrimary type="submit">Solicitar Chamada</ButtonPrimary>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <div className="lower-container">
                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Local</th>
                            <th>Destino</th>
                            <th>Colaborador</th>
                            <th>Guincho</th>
                            <th>Cliente</th>
                            <th>Veículo</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamadas.map((chamada) => (
                            <tr key={chamada?.id_chamada}>
                                <td>{chamada?.ds_prob_chamada}</td>
                                <td>{chamada?.local_chamada}</td>
                                <td>{chamada?.destino_chamada}</td>
                                <td>{chamada?.id_modal_colab?.id_colab?.nm_colab}</td>
                                <td>{chamada?.id_modal_colab?.id_modal?.modelo_modal}</td>
                                <td>{chamada?.id_veic_client?.id_cliente?.nm_cliente}</td>
                                <td>{chamada?.id_veic_client?.id_veiculo?.placa_veiculo}</td>
                                <td>{chamada?.dt_inicio_chamada && formatTime(chamada.dt_inicio_chamada)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isOpenCliente && (
                <Modal closeModal={() => { setIsOpenCliente(false); reset(); }} title="Atualizar Cliente">
                    <div className="modal_update">
                        <form onSubmit={handleSubmit(updateClient)}>
                            <Input
                                label="Nome"
                                maxLength={300}
                                placeholder="Digite seu novo nome"
                                onChange={(e) => setValue("nm_cliente", e.target.value)}
                            />
                            <Input
                                label="Email"
                                type="email"
                                maxLength={50}
                                placeholder="Digite seu novo email"
                                onChange={(e) => setValue("email_cliente", e.target.value)}
                            />
                            <Input
                                label="CPF"
                                type="number"
                                maxLength={11}
                                placeholder="Digite seu novo CPF"
                                onChange={(e) => setValue("cpf_cliente", parseInt(e.target.value))}
                            />
                            <Input
                                label="Data de nascimento"
                                type="date"
                                placeholder="Digite sua nova data de nascimento"
                                onChange={(e) => setValue("dt_nasc_cliente", formatDate(e.target.value))}
                            />
                            <Select
                                label="Gênero"
                                placeholder="Digite seu novo gênero"
                                options={[{ id: 1, label: "Masculino" }, { id: 2, label: "Feminino" }, { id: 3, label: "Prefiro não dizer" }]}
                                onChange={(e) => setValue("genero_cliente", e.target.value)}
                            />
                            <Input
                                label="Número de Telefone"
                                type="number"
                                maxLength={11}
                                placeholder="Digite seu novo número"
                                onChange={(e) => setValue("telefone_cliente", parseInt(e.target.value))}
                            />
                            <Input
                                label="Endereço"
                                maxLength={500}
                                placeholder="Digite seu novo endereço"
                                onChange={(e) => setValue("endereco_cliente", e.target.value)}
                            />
                            <Input
                                label="Senha"
                                type="password"
                                maxLength={500}
                                placeholder="Digite sua nova senha"
                                onChange={(e) => setValue("senha_cliente", e.target.value)}
                            />
                            <ButtonPrimary type="submit">Atualizar</ButtonPrimary>
                        </form>
                    </div>
                </Modal>
            )}
            {isOpenVeiculo && (
                <Modal closeModal={() => { setIsOpenVeiculo(false); reset(); }} title="Atualizar Veículo">
                    <div className="modal_update">
                        <form onSubmit={handleSubmit(updateVehicle)}>
                            <Input
                                label="Ano do Veículo"
                                type="number"
                                maxLength={4}
                                placeholder="Digite seu novo ano do veículo"
                                onChange={(e) => setValue("ano_veiculo", e.target.value)}
                            />
                            <Input
                                label="Modelo"
                                maxLength={50}
                                placeholder="Digite seu novo modelo"
                                onChange={(e) => setValue("modelo_veiculo", e.target.value)}
                            />
                            <Input
                                label="Número do Chassi"
                                maxLength={30}
                                placeholder="Digite seu novo numero de chassi"
                                onChange={(e) => setValue("nr_chassi", e.target.value)}
                            />
                            <Input
                                label="Placa"
                                maxLength={7}
                                placeholder="Digite sua nova placa"
                                onChange={(e) => setValue("placa_veiculo", e.target.value)}
                            />
                            <Input
                                label="Qtd de Eixos"
                                type="number"
                                maxLength={2}
                                placeholder="Digite sua nova quantidade de eixos"
                                onChange={(e) => setValue("qtd_eixos_veiculo", e.target.value)}
                            />
                            <Input
                                label="Renavan"
                                maxLength={11}
                                placeholder="Digite seu novo renavan"
                                onChange={(e) => setValue("renavan_veiculo", e.target.value)}
                            />
                            <Input
                                label="Tipo do chassi"
                                maxLength={300}
                                placeholder="Digite seu novo tipo do chassi"
                                onChange={(e) => setValue("tp_chassi", e.target.value)}
                            />
                            <Input
                                label="Tipo do eixo"
                                maxLength={300}
                                placeholder="Digite seu novo tipo de eixo"
                                onChange={(e) => setValue("tp_eixo", e.target.value)}
                            />
                            <ButtonPrimary type="submit">Atualizar</ButtonPrimary>
                        </form>
                    </div>
                </Modal>
            )}
        </main>
    )
}