import Image from "next/image";
import Gif from "../assets/images/gif_AI.gif";
import Handshake from "../assets/images/handshake.svg";
import Eficience from "../assets/images/eficience.svg";
import Innovation from "../assets/images/inovation.svg";
import ButtonPrimary from "../components/Button/variants/primary";
import ButtonSecondary from "../components/Button/variants/secondary";
import ButtonLink from "../components/Button/variants/link";
import { useMemo } from "react";
import renderIcon from "@/utils/iconGallery";
import "./styles.css";
import Card from "@/components/Card/page";

export default function Home() {
  const icons = useMemo(() => ({
    play: renderIcon({ name: "play", size: 18, color: "#000" }),
    aboutus: renderIcon({ name: "aboutus", size: 62, color: "#fff" }),
    github: renderIcon({ name: "github", size: 18, color: "#030303" }),
    linkedin: renderIcon({ name: "linkedin", size: 18, color: "#0059fd" }),
  }), []);

  return (
    <main className="home-section">
      <section className="welcome-div">
        <div className="text-div">
          <h1 className="home-title">Bem vindo à revolucionária asseguradora de veículos pesados</h1>
          <h3 className="home-subtitle">Descubra a revolução utilizando IA avançada para a coleta de dados precisos, garantindo proteção incomparável e processos eficientes.</h3>
          <div className="buttons-div">
            <ButtonPrimary redirect="/pages/auth/register/client">Cadastre-se</ButtonPrimary>
            <ButtonLink >{icons.play} Apresentação</ButtonLink>
          </div>
        </div>
        <Image className="illustration-welcome" src={Gif} height={100} width={100} alt="Ilustração de Bem vindo" />
      </section>

      <section className="about-div">
        <h1 className="about-title">{icons.aboutus} QUEM SOMOS</h1>
        <div className="info-div">
          <div className="illustration-about" />
          <div className="info-content">
            <p className="info-text">
              A Porto Assistant foi criada em 2023 por um grupo
              do curso de Análise e Desenvolvimento de Sistemas
              da FIAP. Nós somos apaixonados por tecnologia e
              estamos comprometidos em atender nosso público de
              forma eficiente e inovadora.
              Nosso objetivo é praticar nossos conhecimentos e
              aplicá-los em soluções práticas e eficazes para as
              necessidades de nossos clientes.
              Na PortoAssistant, trabalhamos de perto para
              entender as demandas e fornecer soluções sob medida
              que atendam as suas expectativas.
            </p>
          </div>
        </div>
      </section>

      <section className="principles-div">
        <h1 className="principles-title">NOSSOS PRINCÍPIOS</h1>
        <div className="principles-content">
          <Card>
            <Image src={Handshake} height={300} width={300} alt="Ilustração Mãos Dadas" />
            <h1 className="card-title">Compromisso</h1>
          </Card>
          <Card>
            <Image src={Innovation} height={300} width={300} alt="Ilustração Inovação" />
            <h1 className="card-title">Inovação</h1>
          </Card>
          <Card>
            <Image src={Eficience} height={300} width={300} alt="Ilustração Eficiência" />
            <h1 className="card-title">Eficiência</h1>
          </Card>
        </div>
      </section>

      <section className="group-div">
        <h1 className="group-title">INTEGRANTES</h1>
        <ButtonSecondary redirect="https://github.com/Challenge-PortoSeguro/NextJS-Porto">{icons.github} REPOSITÓRIO</ButtonSecondary>
        <div className="group-content">
          <Card>
            <Image className="card-image" src="https://github.com/CarlosEduardo7700.png" height={150} width={150} alt="Foto Carlos Eduardo" />
            <h1 className="card-title">Carlos Eduardo</h1>
            <p className="card-subtitle">RM552164</p>
            <div className="buttons-card">
              <ButtonLink redirect="https://github.com/CarlosEduardo7700">{icons.github}</ButtonLink>
              <ButtonLink redirect="https://www.linkedin.com/">{icons.linkedin}</ButtonLink>
            </div>
          </Card>
          <Card>
            <Image className="card-image" src="https://github.com/Duh0127.png" height={150} width={150} alt="Foto Eduardo Toshio" />
            <h1 className="card-title">Eduardo Toshio</h1>
            <p className="card-subtitle">RM551763</p>
            <div className="buttons-card">
              <ButtonLink redirect="https://github.com/Duh0127">{icons.github}</ButtonLink>
              <ButtonLink redirect="https://www.linkedin.com/in/eduardo-okubo/">{icons.linkedin}</ButtonLink>
            </div>
          </Card>
          <Card>
            <Image className="card-image" src="https://github.com/kauezin05.png" height={150} width={150} alt="Foto Kauê Alexandre" />
            <h1 className="card-title">Kauê Alexandre</h1>
            <p className="card-subtitle">RM551812</p>
            <div className="buttons-card">
              <ButtonLink redirect="https://github.com/kauezin05">{icons.github}</ButtonLink>
              <ButtonLink redirect="https://www.linkedin.com/in/kau%C3%AA-alexandre-de-oliveira/">{icons.linkedin}</ButtonLink>
            </div>
          </Card>
          <Card>
            <Image className="card-image" src="https://github.com/matviniciuus.png" height={150} width={150} alt="Foto Mateus Vinícius" />
            <h1 className="card-title">Mateus Vinícius</h1>
            <p className="card-subtitle">RM551692</p>
            <div className="buttons-card">
              <ButtonLink redirect="https://github.com/matviniciuus">{icons.github}</ButtonLink>
              <ButtonLink redirect="https://www.linkedin.com/">{icons.linkedin}</ButtonLink>
            </div>
          </Card>
          <Card>
            <Image className="card-image" src="https://github.com/VitorMiranda11.png" height={150} width={150} alt="Foto Vitor Miranda" />
            <h1 className="card-title">Vitor Miranda</h1>
            <p className="card-subtitle">RM551451</p>
            <div className="buttons-card">
              <ButtonLink redirect="https://github.com/VitorMiranda11">{icons.github}</ButtonLink>
              <ButtonLink redirect="https://www.linkedin.com/in/vitor-machado-miranda/">{icons.linkedin}</ButtonLink>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
