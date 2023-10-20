import Image from "next/image";
import Gif from "../assets/images/gif_AI.gif";
import Handshake from "../assets/images/handshake.svg";
import Eficience from "../assets/images/eficience.svg";
import Innovation from "../assets/images/inovation.svg";
import Team from "../assets/images/team.png";
import Button from "@/components/Button/page";
import { useMemo } from "react";
import renderIcon from "@/utils/iconGallery";
import "./styles.css";

export default function Home() {
  const icons = useMemo(() => ({
    play: renderIcon({ name: "play", size: 18, color: "#000" }),
    aboutus: renderIcon({ name: "aboutus", size: 62, color: "#fff" }),
  }), []);

  return (
    <section className="home-section">
      <div className="welcome-div">
        <div className="text-div">
          <h1 className="home-title">Bem vindo à revolucionária asseguradora de veículos pesados</h1>
          <h3 className="home-subtitle">Descubra a revolução utilizando IA avançada para a coleta de dados precisos, garantindo proteção incomparável e processos eficientes.</h3>
          <div className="buttons-div">
            <Button variant="primary" redirect="/register/client">Cadastre-se</Button>
            <Button variant="secondary">{icons.play} Apresentação</Button>
          </div>
        </div>
        <Image className="illustration-welcome" src={Gif} height={100} width={100} alt="Ilustração de Bem vindo"/>
      </div>

      <div className="about-div">
        <h1 className="about-title">{icons.aboutus} QUEM SOMOS</h1>
        <div className="info-div">
          <div className="illustration-about"/>
          <div className="info-content">
            <p className="info-text">
              A Porto Assistent foi criada em 2023 por um grupo
              do curso de Análise e Desenvolvimento de Sistemas
              da FIAP. Nós somos apaixonados por tecnologia e
              estamos comprometidos em atender nosso público de
              forma eficiente e inovadora.
              Nosso objetivo é praticar nossos conhecimentos e
              aplicá-los em soluções práticas e eficazes para as
              necessidades de nossos clientes.
              Na PortoAssistent, trabalhamos de perto para
              entender as demandas e fornecer soluções sob medida
              que atendam as suas expectativas.
            </p>
          </div>
        </div>
      </div>

      <div className="principles-div">
        <h1 className="principles-title">Nossos Princípios</h1>
        <div className="principles-content">
          
        </div>
      </div>

      <div className="group-div">
        <h1 className="group-title">Integrantes</h1>
        <a className="group-desc" href="" target="_blank">LINK DO REPOSITÓRIO</a>
        <div className="group-content">
          
        </div>
      </div>

      <div className="contact-div">
        <h1 className="contact-title">Contato</h1>
        <form className="form-contact">
          <input type="text" placeholder="Digite seu nome" />
          <Button variant="primary">Enviar</Button>
        </form>
      </div>
    </section>
  )
}
