'use client';
import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import "../styles.css";
import Input from "@/components/Input/page";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Login() {
    const router = useRouter();
    const [login, setLogin] = useState({ email: "", senha: "" });

    const onSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/cliente/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(login)
            });

            if (response.ok) {
                const responseData = await response.json();

                if (responseData) {
                    localStorage.setItem("id", responseData.id);
                    router.push(`/pages/profile/client/${parseInt(localStorage.getItem("id"))}`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                }
            } else {
                alert("Usuário ou Senha Inválidos!")
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    }

    return (
        <main className="container-login">
            <div className="image-client" />
            <div className="login">
                <Image src={Logo} width={150} height={150} alt="Logo Porto Assistant" />
                <h1>Login Cliente</h1>
                <form>
                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        onChange={(e) => (setLogin({ ...login, email: e.target.value }))}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        onChange={(e) => (setLogin({ ...login, senha: e.target.value }))}
                    />
                    <ButtonPrimary onClick={() => onSubmit()}>Entrar</ButtonPrimary>
                    <ButtonLink redirect="/pages/auth/register/client">Cadastre sua conta</ButtonLink>
                    <ButtonLink redirect="/pages/auth/login/colab">É um colaborador?</ButtonLink>
                </form>
            </div>
        </main>
    )
}