'use client'
import "../../styles.css";
import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button/variants/primary";
import Image from "next/image";
import { useMemo, useEffect, useState } from "react";
import renderIcon from "@/utils/iconGallery";

export default function ProfileColab() {
  const [colaborador, setColaborador] = useState({});
  const icons = useMemo(() => ({
    play: renderIcon({ name: "play", size: 18, color: "#000" }),
    edit: renderIcon({ name: "edit", size: 18, color: "#ffffff" }),
  }), []);

  const fetchColab = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/colaborador/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Colaborador: ", responseData);
        setColaborador(responseData);
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a solicitação:", error);
    }
  }

  const data = [
    { id: 1, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
    { id: 2, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
    { id: 3, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
    { id: 4, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
    { id: 5, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
    { id: 6, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
    { id: 7, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" },
    { id: 8, colaborador: "Rodolfo", modal: "Mercedes-Benz I-3492", tipoChamado: "Problema Elétrico", cliente: "Cliente", veiculo: "Veículo", problema: "Problema", data: "Data" }
  ]

  useEffect(() => {
    localStorage.getItem("id") && fetchColab();
    !localStorage.getItem("id") && route.push("/");
  }, []);

  return (
    <main>
      <div className="upper-container">
        <aside>
          <header className="header-info">
            <Image src={Logo} width={45} height={45} alt="Logo Porto Assistant" />
          </header>
          <div className="client-info">
            <h2>Colaborador</h2>
            <div className="div-info">
              <h1>Nome:</h1>
              <h2>Rodolfo</h2>
            </div>
            <div className="div-info">
              <h1>Email:</h1>
              <h2>rodolfo@email.com</h2>
            </div>
            <div className="div-info">
              <h1>CPF:</h1>
              <h2>671.176.690-39</h2>
            </div>
            <div className="div-info">
              <h1>RG:</h1>
              <h2>40.453.753-4</h2>
            </div>
            <div className="div-info">
              <h1>CNH:</h1>
              <h2>63166137796</h2>
            </div>
            <div className="div-info">
              <h1>Nascimento:</h1>
              <h2>27/01/2005</h2>
            </div>
            <div className="div-info">
              <h1>Gênero:</h1>
              <h2>Masculino</h2>
            </div>
            <div className="div-info">
              <h1>Telefone:</h1>
              <h2>(82) 92775-3597</h2>
            </div>
            <div className="div-info">
              <h1>Endereço:</h1>
              <h2>Rua do rodolf, 0000</h2>
            </div>
          </div>
          <div className="vehicle-info">
            <h2>Modal</h2>
            <div className="div-info">
              <h1>Modelo:</h1>
              <h2>I-7723</h2>
            </div>
            <div className="div-info">
              <h1>Placa:</h1>
              <h2>HWV-0124</h2>
            </div>
            <div className="div-info">
              <h1>Tipo Modal</h1>
              <h2>Lança</h2>
            </div>
            <div className="div-info">
              <h1>Altura:</h1>
              <h2>4m</h2>
            </div>
            <div className="div-info">
              <h1>Largura:</h1>
              <h2>5m</h2>
            </div>
            <div className="div-info">
              <h1>Comprimento:</h1>
              <h2>1.9m</h2>
            </div>
            <div className="div-info">
              <h1>Peso:</h1>
              <h2>5000kg</h2>
            </div>
            <div className="div-info">
              <h1>Peso Suportado:</h1>
              <h2>15000kg</h2>
            </div>
          </div>
          <Button>{icons.edit}Editar</Button>
        </aside>
        <div className="chatbot">
          <div className="container">
            <Button>Iniciar ChatBot</Button>
          </div>
        </div>
      </div>
      <div className="lower-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Colaborador</th>
              <th>Modal</th>
              <th>Tipo Chamado</th>
              <th>Cliente</th>
              <th>Veículo</th>
              <th>Problema</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {data.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.colaborador}</td>
                <td>{log.modal}</td>
                <td>{log.tipoChamado}</td>
                <td>{log.cliente}</td>
                <td>{log.veiculo}</td>
                <td>{log.problema}</td>
                <td>{log.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}