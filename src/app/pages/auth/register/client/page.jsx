'use client'
import Input from "@/components/Input/page";
import Select from "@/components/Select/page";
import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import ButtonSuccess from "@/components/Button/variants/success";
import "../styles.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Register() {
    const route = useRouter();
    const { handleSubmit, setValue } = useForm();
    const [nextStep, setNextStep] = useState(false);

    const onSubmit = async (data) => {
        if (!data.nm_cliente || !data.cpf_cliente || !data.dt_nasc_cliente || !data.genero_cliente || !data.telefone_cliente || !data.endereco_cliente || !data.email_cliente || !data.senha_cliente || !data.modelo_veiculo || !data.ano_veiculo || !data.placa_veiculo || !data.renavan_veiculo || !data.nr_chassi || !data.tp_chassi || !data.tp_eixo || !data.qtd_eixos_veiculo || !data.altura || !data.largura || !data.comprimento || !data.peso || !data.peso_suportado) {
            alert("Preencha todos os campos")
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/cliente/0", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                route.push("/pages/auth/login/client")
            } else {
                alert("Erro ao cadastrar o cliente")
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    }

    return (
        <main className="container-register">
            <div className="image" />
            <div className="register">
                <h1>Cadastro do Cliente</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={!nextStep ? "display-visible" : "display-none"}>
                        <Input
                            label="Nome Completo"
                            placeholder="Digite seu nome"
                            onChange={(e) => setValue("nm_cliente", e.target.value)}
                        />
                        <div className="two-inputs">
                            <Input
                                label="CPF"
                                type="number"
                                maxLength={11}
                                placeholder="Digite seu CPF"
                                onChange={(e) => setValue("cpf_cliente", e.target.value)}
                            />
                            <Input
                                label="Nascimento"
                                type="date"
                                onChange={(e) => setValue("dt_nasc_cliente", e.target.value)}
                            />
                        </div>
                        <div className="two-inputs">
                            <Select
                                label="Gênero"
                                options={[{value: "", label: "Escolha o seu gênero"}, { value: "masculino", label: "Masculino" }, { value: "feminino", label: "Feminino" }, { value: "prefiro não dizer", label: "Prefiro não dizer" }]}
                                onChange={(e) => setValue("genero_cliente", e.target.value)}
                            />
                            <Input
                                label="Telefone"
                                type="tel"
                                maxLength={11}
                                placeholder="Digite seu telefone"
                                onChange={(e) => setValue("telefone_cliente", e.target.value)}
                            />
                        </div>
                        <Input
                            label="Endereço"
                            maxLength={80}
                            placeholder="Digite o nome do endereço"
                            onChange={(e) => setValue("endereco_cliente", e.target.value)}
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            maxLength={50}
                            placeholder="Digite seu e-mail"
                            onChange={(e) => setValue("email_cliente", e.target.value)}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            maxLength={300}
                            placeholder="Digite sua senha"
                            onChange={(e) => setValue("senha_cliente", e.target.value)}
                        />
                        <ButtonPrimary redirect="" onClick={() => setNextStep(true)}>Continuar</ButtonPrimary>
                        <ButtonLink redirect="/pages/auth/login/client">Já possui uma conta?</ButtonLink>
                    </div>

                    <div className={nextStep ? "display-visible" : "display-none"}>
                        <div className="two-inputs">
                            <Input
                                label="Modelo"
                                placeholder="Digite o modelo"
                                maxLength={30}
                                onChange={(e) => setValue("modelo_veiculo", e.target.value)}
                            />
                            <Input
                                label="Ano de Fabricação"
                                type="number"
                                placeholder="Digite o ano"
                                maxLength={4}
                                onChange={(e) => setValue("ano_veiculo", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Placa"
                                maxLength={7}
                                placeholder="Digite a placa sem traço"
                                onChange={(e) => setValue("placa_veiculo", e.target.value)}
                            />
                            <Input
                                label="Renavan"
                                maxLength={11}
                                type="number"
                                placeholder="Digite o renavan"
                                onChange={(e) => setValue("renavan_veiculo", parseInt(e.target.value))}
                            />
                            <Input
                                label="Nº do Chassi"
                                maxLength={30}
                                placeholder="Digite o Nº do chassi"
                                onChange={(e) => setValue("nr_chassi", e.target.value)}
                            />
                        </div>
                        <Input
                            label="Tipo Chassi"
                            maxLength={300}
                            placeholder="Digite o tipo do chassi"
                            onChange={(e) => setValue("tp_chassi", e.target.value)}
                        />
                        <div className="two-inputs">
                            <Input
                                label="Tipo Eixo"
                                maxLength={300}
                                placeholder="Digite o tipo do eixo"
                                onChange={(e) => setValue("tp_eixo", e.target.value)}
                            />
                            <Input
                                label="Quantidade Eixos"
                                type="number"
                                maxLength={2}
                                placeholder="Digite a quantidade de eixos"
                                onChange={(e) => setValue("qtd_eixos_veiculo", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Altura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("altura", parseInt(e.target.value))}
                            />
                            <Input
                                label="Largura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("largura", parseInt(e.target.value))}
                            />
                            <Input
                                label="Comprimento"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("comprimento", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Peso"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("peso", parseInt(e.target.value))}
                            />
                            <Input
                                label="Peso Suportado"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("peso_suportado", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="div-buttons">
                            <ButtonPrimary onClick={() => setNextStep(false)}>Voltar</ButtonPrimary>
                            <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}