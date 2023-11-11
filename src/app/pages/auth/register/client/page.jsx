'use client'
import Input from "@/components/Input/page";
import Select from "@/components/Select/page";
import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import ButtonSuccess from "@/components/Button/variants/success";
import "../styles.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import schema from "../yup-schema";
import { formatDate } from "@/utils/Date";

export default function Register() {
    // const { handleSubmit, setValue, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema)
    // });
    const { handleSubmit, setValue } = useForm();
    const [nextStep, setNextStep] = useState(false);

    const onSubmit = async (data) => {
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
                const responseData = await response.json();
                console.log(responseData);
                // if (responseData) {
                //     localStorage.setItem("id", responseData.id_cliente);
                //     router.push(`/pages/profile/client/${parseInt(localStorage.getItem("id"))}`);
                //     setTimeout(() => {
                //         window.location.reload();
                //     }, 3000)
                // }
            } else {
                alert("Erro ao cadastrar o usuário")
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
        

        // fetch("http://localhost:3000/api/cliente/0", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(dataCliente)
        // }).then((response) => {
        //     return response.json();
        // }).then((data) => {
        //     console.log("REGISTRADO: ", data);
        // })
        // router.push("/pages/profile/client");
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
                        // error={errors.nome?.message}
                        />
                        <div className="two-inputs">
                            <Input
                                label="CPF"
                                type="number"
                                maxLength={11}
                                placeholder="Digite seu CPF"
                                onChange={(e) => setValue("cpf_cliente", e.target.value)}
                            // error={errors.cpf?.message}
                            />
                            <Input
                                label="Nascimento"
                                type="date"
                                onChange={(e) => setValue("dt_nasc_cliente", e.target.value)}
                            // error={errors.nascimento?.message}
                            />
                        </div>
                        <div className="two-inputs">
                            <Select
                                label="Gênero"
                                placeholder="Selecione seu gênero"
                                options={[{ value: "1", label: "Masculino" }, { value: "2", label: "Feminino" }, { value: "3", label: "Prefiro não dizer" }]}
                                onChange={(e) => setValue("genero_cliente", e.target.value)}
                            // error={errors.genero?.message}
                            />
                            <Input
                                label="Telefone"
                                type="tel"
                                maxLength={11}
                                placeholder="Digite seu telefone"
                                onChange={(e) => setValue("telefone_cliente", e.target.value)}
                            // error={errors.telefone?.message}
                            />
                        </div>
                        <Input
                            label="Endereço"
                            maxLength={80}
                            placeholder="Digite o nome do endereço"
                            onChange={(e) => setValue("endereco_cliente", e.target.value)}
                        // error={errors.endereco?.message}
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            maxLength={50}
                            placeholder="Digite seu e-mail"
                            onChange={(e) => setValue("email_cliente", e.target.value)}
                        // error={errors.email?.message}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            maxLength={300}
                            placeholder="Digite sua senha"
                            onChange={(e) => setValue("senha_cliente", e.target.value)}
                        // error={errors.senha?.message}
                        />
                        <ButtonPrimary redirect="" onClick={() => setNextStep(true)}>Continuar</ButtonPrimary>
                        {/* <ButtonSuccess type="submit">Cadastrar</ButtonSuccess> */}
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
                                placeholder="Digite o ano"
                                maxLength={4}
                                onChange={(e) => setValue("ano_veiculo", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Placa"
                                maxLength={7}
                                placeholder="Digite a placa"
                                onChange={(e) => setValue("placa_veiculo", e.target.value)}
                            />
                            <Input
                                label="Renavan"
                                maxLength={11}
                                placeholder="Digite o renavan"
                                onChange={(e) => setValue("renavan_veiculo", e.target.value)}
                            />
                            <Input
                                label="Nº do Chassi"
                                maxLength={30}
                                placeholder="Digite o Nº do chassi"
                                onChange={(e) => setValue("nr_chassi", e.target.value)}
                            />
                        </div>
                        <Select
                            label="Tipo Chassi"
                            maxLength={300}
                            placeholder="Selecione o tipo do chassi"
                            options={[{ value: "longarina", label: "Longarina" }, { value: "monobloco", label: "Monobloco" }]}
                            onChange={(e) => setValue("tp_chassi", e.target.value)}
                        />
                        <div className="two-inputs">
                            <Select
                                label="Tipo Eixo"
                                maxLength={300}
                                placeholder="Selecione o tipo do eixo"
                                options={[{ value: "simples", label: "Simples" }, { value: "duplo", label: "Duplo" }]}
                                onChange={(e) => setValue("tp_eixo", e.target.value)}
                            />
                            <Input
                                label="Qauntidade Eixos"
                                type="number"
                                placeholder="Digite a quantidade de eixos"
                                onChange={(e) => setValue("qtd_eixos_veiculo", e.target.value)}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Altura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("altura", e.target.value)}
                            />
                            <Input
                                label="Largura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("largura", e.target.value)}
                            />
                            <Input
                                label="Comprimento"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("comprimento", e.target.value)}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Peso"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("peso", e.target.value)}
                            />
                            <Input
                                label="Peso Suportado"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("peso_suportado", e.target.value)}
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