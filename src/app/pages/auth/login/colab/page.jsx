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

    const onSubmit = (data) => {
        // console.log(data);

        dataCliente = {
            email: data.email,
            senha: data.senha
        }

        console.log("Cliente: ", dataCliente);
        // fetch("http://localhost:8081/api/cliente", {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(data)
        // }).then((response) => {
        //     return response.json();
        // }).then((data) => {
        //     console.log("Logado: ", data);
        // })
        // router.push("/pages/profile/colab");
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