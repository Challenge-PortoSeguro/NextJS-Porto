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
        email_colab: yup.string().email("E-mail inválido").required("Email é obrigatório"),
        senha_colab: yup.string().required("Senha é obrigatória")
    });
    const { setValue, handleSubmit, formState: { errors } } = useForm({
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
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseData = await response.json();

                if (responseData) {
                    sessionStorage.setItem("token", responseData.id_colab);
                    router.push(`/pages/profile/colab/${parseInt(sessionStorage.getItem("token"))}`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                }
            } else {
                alert("Usuário ou Senha Inválidos"); 
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
                        onChange={(e) => setValue("email_colab", e.target.value)}
                        error={errors.email_colab?.message}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        onChange={(e) => setValue("senha_colab", e.target.value)}
                        error={errors.senha_colab?.message}
                    />
                    <ButtonPrimary type="submit">Entrar</ButtonPrimary>
                    <ButtonLink redirect="/pages/auth/register/colab">Cadastre sua conta</ButtonLink>
                    <ButtonLink redirect="/pages/auth/login/client">É um cliente?</ButtonLink>
                </form>
            </div>
        </main>
    )
}