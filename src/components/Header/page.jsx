'use client'
import Link from "next/link";
import ButtonPrimary from "../../components/Button/variants/primary";
import Logo from "../../assets/images/logo.png";
import Image from "next/image";
import { useMemo } from "react";
import renderIcon from "../../utils/iconGallery";
import "./styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isToken, setIsToken] = useState(false);
    const route = useRouter();

    const icons = useMemo(() => ({
        login: renderIcon({ name: "login", size: 18, color: "#fff" }),
        hamburguer: renderIcon({ name: 'hamburguer', size: 18, color: "#fff" }),
        next: renderIcon({ name: "next", size: 18, color: "#fff" }),
        user: renderIcon({ name: "user", size: 18, color: "#fff" }),
    }), []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsToken(true);
        }
        !token && setIsToken(false) && route.push("/pages/auth/login/client");
    }, []);

    return (
        <header className="header">
            <nav>
                <ul className="ul">
                    <li><Link href="/"><Image src={Logo} height={50} width={50} alt="Logo" /></Link></li>
                    {!isToken && <li><ButtonPrimary redirect="/pages/auth/login/client">{icons.login} Login</ButtonPrimary></li>}
                    {isToken && <li><ButtonPrimary redirect="/pages/profile/client">{icons.user} Perfil</ButtonPrimary></li>}
                </ul>
            </nav>
        </header>
    )
}