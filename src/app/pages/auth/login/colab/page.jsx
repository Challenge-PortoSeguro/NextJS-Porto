'use client';
import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import "../styles.css";
import Input from "@/components/Input/page";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const schema = yup.object().shape({
        email: yup.string().email("E-mail inválido").required("Email é obrigatório"),
        password: yup.string().required("Senha é obrigatória")
    });
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/api/colaborador/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ email: data.email, senha: data.password })
            });

            if (response.ok) {
                const responseData = await response.json();

                if (responseData) {
                    localStorage.setItem("id", responseData.id);
                    router.push(`/pages/profile/colab/${parseInt(localStorage.getItem("id"))}`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500)
                }
            } else {
                !localStorage.getItem("id") && console.error("Falha no login"); 
            }
        } catch (error) {
            console.error("Ocorreu um erro durante a solicitação:", error);
        }
    }

    return (
        <main className="container-login">
            <div className="image-colab" />
            <div className="login">
                <Image src={Logo} width={150} height={150} alt="Logo Porto Assistant" />
                <h1>Login Colaborador</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        name={"email"}
                        onChange={(e) => setValue("email", e.target.value)}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        name={"password"}
                        onChange={(e) => setValue("password", e.target.value)}
                        error={errors.password?.message}
                    />
                    <ButtonPrimary type="submit">Entrar</ButtonPrimary>
                    <ButtonLink redirect="/pages/auth/register/colab">Cadastre sua conta</ButtonLink>
                    <ButtonLink redirect="/pages/auth/login/client">É um cliente?</ButtonLink>
                </form>
            </div>
        </main>
    )
}