'use client';
import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import "../styles.css";
import Input from "@/components/Input/page";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    senha: yup.string().required("Campo obrigatório")
});

export default function Login() {
    const router = useRouter();
    const { handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/api/cliente/login", {
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
                    sessionStorage.setItem("token", responseData.id_cliente);
                    router.push(`/pages/profile/client/${parseInt(sessionStorage.getItem("token"))}`);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        onChange={(e) => setValue("email", e.target.value)}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        onChange={(e) => setValue("senha", e.target.value)}
                        error={errors.senha?.message}
                    />
                    <ButtonPrimary type="submit">Entrar</ButtonPrimary>
                    <ButtonLink redirect="/pages/auth/register/client">Cadastre sua conta</ButtonLink>
                    <ButtonLink redirect="/pages/auth/login/colab">É um colaborador?</ButtonLink>
                </form>
            </div>
        </main>
    )
}