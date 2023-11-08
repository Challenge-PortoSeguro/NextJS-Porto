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

export default function Register() {
    // const { handleSubmit, setValue, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema)
    // });
    const { handleSubmit, setValue } = useForm();
    const [nextStep, setNextStep] = useState(false);

    const onSubmit = (data) => {
        const dataCliente = {
            genero: { id: parseInt(data.genero) },
            nome: data.nome,
            cpf: data.cpf,
            rg: data.rg,
            dataNascimento: data.nascimento,
            cnh: data.cnh,
            email: data.email,
            senha: data.senha
        }

        console.log("Cliente: ", dataCliente);
        fetch("http://localhost:8081/api/cliente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataCliente)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("REGISTRADO: ", data);
        })
        // router.push("/pages/profile/client");
    }

    return (
        <main className="container-register">
            <div className="image" />
            <div className="register">
                <h1>{!nextStep ? "Cadastro do Cliente" : "Cadastro do Veículo"}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={!nextStep ? "display-visible" : "display-none"}>
                        <Input
                            label="Nome Completo"
                            placeholder="Digite seu nome"
                            onChange={(e) => setValue("nome", e.target.value)}
                        // error={errors.nome?.message}
                        />
                        <div className="two-inputs">
                            <Input
                                label="CPF"
                                type="number"
                                placeholder="Digite seu CPF"
                                onChange={(e) => setValue("cpf", e.target.value)}
                            // // error={errors.cpf?.message}
                            />
                            <Input
                                label="RG"
                                type="number"
                                placeholder="Digite seu RG"
                                onChange={(e) => setValue("rg", e.target.value)}
                            // // error={errors.rg?.message}
                            />
                            <Input
                                label="CNH"
                                type="number"
                                placeholder="Digite sua CNH"
                                onChange={(e) => setValue("cnh", e.target.value)}
                            // // error={errors.cnh?.message}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Nascimento"
                                type="date"
                                onChange={(e) => setValue("nascimento", e.target.value)}
                            // // error={errors.nascimento?.message}
                            />
                            <Select
                                label="Gênero"
                                placeholder="Selecione seu gênero"
                                options={[{ value: "1", label: "Masculino" }, { value: "2", label: "Feminino" }, { value: "3", label: "Prefiro não dizer" }]}
                                onChange={(e) => setValue("genero", e.target.value)}
                            // // error={errors.genero?.message}
                            />
                            <Input
                                label="Telefone"
                                type="tel"
                                placeholder="Digite seu telefone"
                                onChange={(e) => setValue("telefone", e.target.value)}
                            // // error={errors.telefone?.message}
                            />
                        </div>
                        <Input
                            label="Endereço"
                            placeholder="Digite seu endereço"
                            onChange={(e) => setValue("endereco", e.target.value)}
                        // // error={errors.endereco?.message}
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            placeholder="Digite seu e-mail"
                            onChange={(e) => setValue("email", e.target.value)}
                        // // error={errors.email?.message}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha"
                            onChange={(e) => setValue("senha", e.target.value)}
                        // // error={errors.senha?.message}
                        />
                        <ButtonPrimary redirect="" onClick={() => setNextStep(true)}>Continuar</ButtonPrimary>
                        <ButtonLink redirect="/pages/auth/login/client">Já possui uma conta?</ButtonLink>
                    </div>

                    <div className={nextStep ? "display-visible" : "display-none"}>
                        <Input
                            label="Modelo"
                            placeholder="Digite o modelo"
                            onChange={(e) => setValue("modelo", e.target.value)}
                        // // error={errors.modelo?.message}
                        />
                        <div className="two-inputs">
                            <Input
                                label="Placa"
                                placeholder="Digite a placa"
                                onChange={(e) => setValue("placa", e.target.value)}
                            // // error={errors.placa?.message}
                            />
                            <Input
                                label="Renavam"
                                placeholder="Digite o renavam"
                                onChange={(e) => setValue("renavam", e.target.value)}
                            // // error={errors.renavam?.message}
                            />
                            <Input
                                label="Nº do Chassi"
                                placeholder="Digite o Nº do chassi"
                                onChange={(e) => setValue("numChassi", e.target.value)}
                            // // error={errors.numChassi?.message}
                            />
                        </div>
                        <Select
                            label="Tipo Chassi"
                            placeholder="Selecione o tipo do chassi"
                            options={[{ value: "longarina", label: "Longarina" }, { value: "monobloco", label: "Monobloco" }]}
                            onChange={(e) => setValue("tipoChassi", e.target.value)}
                        // // error={errors.tipoChassi?.message}
                        />
                        <Select
                            label="Tipo Eixo"
                            placeholder="Selecione o tipo do eixo"
                            options={[{ value: "simples", label: "Simples" }, { value: "duplo", label: "Duplo" }]}
                            onChange={(e) => setValue("tipoEixo", e.target.value)}
                        // // error={errors.tipoEixo?.message}
                        />
                        <div className="two-inputs">
                            <Input
                                label="Altura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("altura", e.target.value)}
                            // // error={errors.altura?.message}
                            />
                            <Input
                                label="Largura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("largura", e.target.value)}
                            // // error={errors.largura?.message}
                            />
                            <Input
                                label="Comprimento"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("comprimento", e.target.value)}
                            // // error={errors.comprimento?.message}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Peso"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("peso", e.target.value)}
                            // // error={errors.peso?.message}
                            />
                            <Input
                                label="Peso Suportado"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("pesoSuportado", e.target.value)}
                            // error={errors.pesoSuportado?.message}
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