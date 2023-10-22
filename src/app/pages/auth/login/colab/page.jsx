'use client';
import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import "../styles.css";
import Input from "@/components/Input/page";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import { useState } from "react";

export default function Login() {
    const [form , setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        console.log(form);
    }

    const onSubmit = (e) => {
        console.log(form);
    }

    return (
        <main className="container-login">
            <div className="image-colab" />
            <div className="login">
                <Image src={Logo} width={150} height={150} alt="Logo Porto Assistant" />
                <h1>Login Colaborador</h1>
                <form>
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="Digite seu e-mail"
                        name={"email"}
                        onChange={handleChange}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        name={"password"}
                        onChange={handleChange}
                    />
                    <ButtonPrimary onClick={onSubmit}>Entrar</ButtonPrimary>
                    <ButtonLink redirect="/pages/auth/register/colab">Cadastre sua conta</ButtonLink>
                    <ButtonLink redirect="/pages/auth/login/client">É um cliente?</ButtonLink>
                </form>
            </div>
        </main>
    )
}