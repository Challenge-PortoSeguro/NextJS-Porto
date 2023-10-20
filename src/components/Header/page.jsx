import Link from "next/link";
import Button from "../Button/page";
import Logo from "../../assets/images/logo.png";
import Image from "next/image";
import { useMemo } from "react";
import renderIcon from "../../utils/iconGallery";

export default function Header() {

    const icons = useMemo(() => ({
        user: renderIcon({ name: "user", size: 18, color: "#000" }),
        login: renderIcon({ name: "login", size: 18, color: "#000" }),
        hamburguer: renderIcon({ name: 'hamburguer', size: 18, color: "#000" }),
        next: renderIcon({ name: "next", size: 18, color: "#000" }),
        aboutus: renderIcon({ name: "aboutus", size: 18, color: "#000" }),
        contact: renderIcon({ name: "contact", size: 18, color: "#000" }),
        sos: renderIcon({ name: "sos", size: 40, color: "#000" }),
    }), []);

    return (
        <header className="w-full bg-slate-300">
            <nav>
                <ul className="h-14 flex justify-between items-center p-2">
                    <li><Link href="/"><Image src={Logo} height={50} width={50} alt="Logo" /></Link></li>
                    <li><Button variant="secondary" redirect="/pages/auth/login">{icons.login} Login</Button></li>
                </ul>
            </nav>
        </header>
    )
}