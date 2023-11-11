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
        console.log(data);
    }

    return (
        <main className="container-register">
            <div className="image" />
            <div className="register">
                <h1>{!nextStep ? "Cadastro do Colaborador" : "Cadastro do Modal"}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={!nextStep ? "display-visible" : "display-none"}>
                        <Input
                            label="Nome Completo"
                            type="text"
                            placeholder="Digite seu nome"
                            onChange={(e) => setValue("nm_colab", e.target.value)}
                        // error={errors.nome?.message}
                        />
                        <div className="two-inputs">
                            <Input
                                label="CPF"
                                type="number"
                                maxLength={11}
                                placeholder="Digite seu CPF"
                                onChange={(e) => setValue("cpf_colab", parseInt(e.target.value))}
                            // // error={errors.cpf?.message}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Nascimento"
                                type="date"
                                onChange={(e) => setValue("dt_nasc_colab", e.target.value)}
                            // // error={errors.nascimento?.message}
                            />
                            <Select
                                label="Gênero"
                                placeholder="Selecione seu gênero"
                                options={[{ value: "masculino", label: "Masculino" }, { value: "feminino", label: "Feminino" }]}
                                onChange={(e) => setValue("genero_colab", e.target.value)}
                            // // error={errors.genero?.message}
                            />
                            <Input
                                label="Telefone"
                                type="tel"
                                maxLength={11}
                                placeholder="Digite seu telefone"
                                onChange={(e) => setValue("tel_colab", e.target.value)}
                            // // error={errors.telefone?.message}
                            />
                        </div>
                        <Input
                            label="Endereço"
                            type="text"
                            maxLength={80}
                            placeholder="Digite seu endereço"
                            onChange={(e) => setValue("endereco_colab", e.target.value)}
                        // // error={errors.endereco?.message}
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            maxLength={50}
                            placeholder="Digite seu e-mail"
                            onChange={(e) => setValue("email_colab", e.target.value)}
                        // // error={errors.email?.message}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            maxLength={250}
                            placeholder="Digite sua senha"
                            onChange={(e) => setValue("senha_colab", e.target.value)}
                        // // error={errors.senha?.message}
                        />
                        <ButtonPrimary onClick={() => setNextStep(true)}>Continuar</ButtonPrimary>
                        <ButtonLink redirect="/pages/auth/login/colab">Já possui uma conta?</ButtonLink>
                    </div>

                    <div className={nextStep ? "display-visible" : "display-none"}>
                        <Input
                            label="Modelo"
                            type="text"
                            placeholder="Digite o modelo"
                            onChange={(e) => setValue("modelo_modal", e.target.value)}
                        // // error={errors.modelo?.message}
                        />
                        <div className="two-inputs">
                            <Input
                                label="Placa"
                                type="text"
                                maxLength={7}
                                placeholder="Digite a placa"
                                onChange={(e) => setValue("placa_modal", e.target.value)}
                            // // error={errors.placa?.message}
                            />
                            <Input
                                label="Marca"
                                type="text"
                                maxLength={20}
                                placeholder="Digite a marca"
                                onChange={(e) => setValue("marca_modal", e.target.value)}
                            // // error={errors.placa?.message}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Ano de Fabricação"
                                type="number"
                                maxLength={4}
                                placeholder="Digite o ano de fabricação"
                                onChange={(e) => setValue("ano_modal", parseInt(e.target.value))}
                            // // error={errors.numEixo?.message}
                            />
                            <Input
                                label="Tipo do modal"
                                type="text"
                                placeholder="Digite o tipo do modal"
                                onChange={(e) => setValue("tipo_modal", e.target.value)}
                            // // error={errors.numEixo?.message}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Altura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("altura", parseInt(e.target.value))}
                            // // error={errors.altura?.message}
                            />
                            <Input
                                label="Largura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("largura", parseInt(e.target.value))}
                            // // error={errors.largura?.message}
                            />
                            <Input
                                label="Comprimento"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("comprimento", parseInt(e.target.value))}
                            // // error={errors.comprimento?.message}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Peso"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("peso", parseInt(e.target.value))}
                            // // error={errors.peso?.message}
                            />
                            <Input
                                label="Peso Suportado"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("peso_suportado", parseInt(e.target.value))}
                            // // error={errors.pesoSuportado?.message}
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