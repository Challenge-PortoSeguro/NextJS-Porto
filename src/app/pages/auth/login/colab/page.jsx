import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import "../styles.css";
import Input from "@/components/Input/page";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";

export default function Login() {
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
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                    />
                    <ButtonPrimary redirect="/pages/profile/colab">Entrar</ButtonPrimary>
                    <ButtonLink redirect="/pages/auth/register/colab">Cadastre sua conta</ButtonLink>
                    <ButtonLink redirect="/pages/auth/login/client">É um cliente?</ButtonLink>
                </form>
            </div>
        </main>
    )
}