import Link from "next/link";
import ButtonPrimary from "../../components/Button/variants/primary";
import Logo from "../../assets/images/logo.png";
import Image from "next/image";
import { useMemo } from "react";
import renderIcon from "../../utils/iconGallery";
import "./styles.css";

export default function Header() {
    const icons = useMemo(() => ({
        login: renderIcon({ name: "login", size: 18, color: "#fff" }),
        hamburguer: renderIcon({ name: 'hamburguer', size: 18, color: "#fff" }),
        next: renderIcon({ name: "next", size: 18, color: "#fff" }),
    }), []);

    return (
        <header className="header">
            <nav>
                <ul className="ul">
                    <li><Link href="/"><Image src={Logo} height={50} width={50} alt="Logo" /></Link></li>
                    <li><ButtonPrimary redirect="/pages/auth/login/client">{icons.login} Login</ButtonPrimary></li>
                </ul>
            </nav>
        </header>
    )
}