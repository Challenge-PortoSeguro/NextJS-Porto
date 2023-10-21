'use client'
import Input from "@/components/Input/page";
import Image from "next/image";
import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import ButtonSuccess from "@/components/Button/variants/success";
import Logo from "@/assets/images/logo.png";
import "../styles.css";
import { useState } from "react";

export default function Register() {
    const [nextStep, setNextStep] = useState(false);


    return (
        <main className="container-register">
            <div className="image" />
            <div className="register">
                <h1>{!nextStep ? "Cadastro do Cliente" : "Cadastro do Veículo"}</h1>
                <form>
                    {!nextStep && (
                        <>
                            <Input label="Nome Completo" type="text" placeholder="Digite seu nome" />
                            <div className="two-inputs">
                                <Input label="CPF" type="number" placeholder="Digite seu CPF" />
                                <Input label="RG" type="number" placeholder="Digite seu RG" />
                                <Input label="CNH" type="number" placeholder="Digite sua CNH" />
                            </div>
                            <div className="two-inputs">
                                <Input label="Nascimento" type="date" />
                                <Input label="Gênero" type="text" placeholder="Digite seu Gênero" />
                                <Input label="Telefone" type="tel" placeholder="Digite seu telefone" />
                            </div>
                            <Input label="Endereço" type="text" placeholder="Digite seu endereço" />
                            <Input label="E-mail" type="email" placeholder="Digite seu e-mail" />
                            <Input label="Senha" type="password" placeholder="Digite sua senha" />
                            <ButtonPrimary redirect="" onClick={() => setNextStep(true)}>Continuar</ButtonPrimary>
                            <ButtonLink redirect="/pages/auth/login/client">Já possui uma conta?</ButtonLink>
                        </>
                    )}
                    {nextStep && (
                        <>
                            <Input label="Modelo" type="text" placeholder="Digite o modelo" />
                            <div className="two-inputs">
                                <Input label="Placa" type="text" placeholder="Digite a placa" />
                                <Input label="Renavam" type="text" placeholder="Digite o renavam" />
                                <Input label="Nº do Chassi" type="text" placeholder="Digite o Nº do chassi" />
                            </div>
                            <Input label="Tipo do Chassi" type="text" placeholder="Digite o tipo do chassi" />
                            <Input label="Tipo Eixo" type="text" placeholder="Digite o tipo do eixo" />
                            <div className="two-inputs">
                                <Input label="Altura" type="number" placeholder="(m)" />
                                <Input label="Largura" type="number" placeholder="(m)" />
                                <Input label="Comprimento" type="number" placeholder="(m)" />
                            </div>
                            <div className="two-inputs">
                                <Input label="Peso" type="number" placeholder="(kg)" />
                                <Input label="Peso Suportado" type="number" placeholder="(kg)" />
                            </div>
                            <div className="div-buttons">
                                <ButtonPrimary onClick={() => setNextStep(false)}>Voltar</ButtonPrimary>
                                <ButtonSuccess onClick={() => handleRegister()}>Cadastrar</ButtonSuccess>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </main>
    )
}