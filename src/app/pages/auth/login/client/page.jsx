import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import "../styles.css";
import Input from "@/components/Input/page";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";

export default function Login() {
    return (
        <main className="container-login">
            <div className="image-client" />
            <div className="login">
                <Image src={Logo} width={150} height={150} alt="Logo Porto Assistant" />
                <h1>Login Cliente</h1>
                <form>
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="Digite seu e-mail"
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                    />
                    <ButtonPrimary redirect="">Entrar</ButtonPrimary>
                    <ButtonLink redirect="/pages/auth/register/client">Cadastre sua conta</ButtonLink>
                    <ButtonLink redirect="/pages/auth/login/colab">É um colaborador?</ButtonLink>
                </form>
            </div>
        </main>
    )
}