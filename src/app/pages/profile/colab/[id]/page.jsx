'use client'
import "../../styles.css";
import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button/variants/primary";
import Image from "next/image";
import { useMemo, useEffect, useState, useCallback } from "react";
import renderIcon from "@/utils/iconGallery";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/Date";
import Input from "@/components/Input/page";
import Select from "@/components/Select/page";
import Modal from "@/components/Modal/page";
import { useForm } from "react-hook-form";

export default function ProfileColab({ params }) {
  const route = useRouter();
  const { setValue, handleSubmit, reset } = useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenColab, setIsOpenColab] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const [modals, setModals] = useState([]);
  const [chamadas, setChamadas] = useState([]);
  const icons = useMemo(() => ({
    play: renderIcon({ name: "play", size: 18, color: "#000" }),
    edit: renderIcon({ name: "edit", size: 18, color: "#ffffff" }),
  }), []);

  const fetchColaborador = async () => {
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
        setColaborador(responseData);
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a solicitação:", error);
    }
  }

  const fetchModals = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/colaborador/modal/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.ok) {
        const { id_modal } = await response.json();
        setModals(id_modal)
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a solicitação:", error);
    }
  }

  const fetchChamadas = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/chamada`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setChamadas(responseData);
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a solicitação:", error);
    }
  }, []);


  const updateColaborador = async (data) => {
    if (!data.cpf_colab) data.cpf_colab = colaborador.cpf_colab;
    if (!data.dt_nasc_colab) data.dt_nasc_colab = colaborador.dt_nasc_colab;
    if (!data.email_colab) data.email_colab = colaborador.email_colab;
    if (!data.endereco_colab) data.endereco_colab = colaborador.endereco_colab;
    if (!data.genero_colab) data.genero_colab = colaborador.genero_colab;
    if (!data.nm_colab) data.nm_colab = colaborador.nm_colab;
    if (!data.senha_colab) data.senha_colab = colaborador.senha_colab;
    if (!data.tel_colab) data.tel_colab = colaborador.tel_colab;
    data.dt_nasc_colab = formatDate(data.dt_nasc_colab);

    try {
      const response = await fetch(`http://localhost:3000/api/colaborador/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchColaborador();
        setIsOpenColab(false);
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a solicitação:", error);
      alert("Ocorreu um erro durante a solicitação:", error);
    }
  }

  const updateModal = async (data) => {
    if (!data.modelo_modal) data.modelo_modal = modals.modelo_modal;
    if (!data.placa_modal) data.placa_modal = modals.placa_modal;
    if (!data.marca_modal) data.marca_modal = modals.marca_modal;
    if (!data.ano_modal) data.ano_modal = modals.ano_modal;
    if (!data.tipo_modal) data.tipo_modal = modals.tipo_modal;
    data.id_medida = { id: modals.id_medida.id }
    console.log(data);

    try {
      const response = await fetch(`http://localhost:3000/api/colaborador/modal/${modals?.id_modal}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchModals();
        setIsOpenModal(false);
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a solicitação:", error);
      alert("Ocorreu um erro durante a solicitação:", error);
    }
  }


  useEffect(() => {
    !localStorage.getItem("id") && route.push("/");
    if (params?.id) {
      fetchColaborador();
      fetchModals();
      fetchChamadas();
    }
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
              <h2>{colaborador?.nm_colab}</h2>
            </div>
            <div className="div-info">
              <h1>Email:</h1>
              <h2>{colaborador.email_colab}</h2>
            </div>
            <div className="div-info">
              <h1>CPF:</h1>
              <h2>{colaborador.cpf_colab}</h2>
            </div>
            <div className="div-info">
              <h1>Nascimento:</h1>
              <h2>{colaborador?.dt_nasc_colab && formatDate(colaborador?.dt_nasc_colab)}</h2>
            </div>
            <div className="div-info">
              <h1>Gênero:</h1>
              <h2>{colaborador.genero_colab}</h2>
            </div>
            <div className="div-info">
              <h1>Telefone:</h1>
              <h2>{colaborador?.tel_colab}</h2>
            </div>
            <div className="div-info">
              <h1>Endereço:</h1>
              <h2>{colaborador?.endereco_colab}</h2>
            </div>
            <Button onClick={() => setIsOpenColab(true)}>{icons.edit}Editar Colaborador</Button>
          </div>
          <div className="vehicle-info">
            <h2>Modal</h2>
            <div className="div-info">
              <h1>Modelo:</h1>
              <h2>{modals?.modelo_modal}</h2>
            </div>
            <div className="div-info">
              <h1>Placa:</h1>
              <h2>{modals?.placa_modal}</h2>
            </div>
            <div className="div-info">
              <h1>Tipo Modal</h1>
              <h2>{modals?.tipo_modal}</h2>
            </div>
            <Button onClick={() => setIsOpenModal(true)}>{icons.edit}Editar Modal</Button>
          </div>

        </aside>
        <div className="chatbot">
          <div className="container">
            <h1>Chamadas</h1>
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Local</th>
                  <th>Destino</th>
                  <th>Guincho</th>
                  <th>Cliente</th>
                  <th>Veículo</th>
                  <th>Data Início</th>
                </tr>
              </thead>
              <tbody>
                {chamadas.map((chamada) => (
                  <tr key={chamada.id_chamada}>
                    <td>{chamada.ds_prob_chamada}</td>
                    <td>{chamada.local_chamada}</td>
                    <td>{chamada.destino_chamada}</td>
                    <td>{chamada.id_modal_colab?.id_colab?.nm_colab}</td>
                    <td>{chamada.id_veic_client?.id_cliente?.nm_cliente}</td>
                    <td>{chamada.id_veic_client?.id_veiculo?.placa_veiculo}</td>
                    <td>{chamada.dt_inicio_chamada && formatTime(chamada.dt_inicio_chamada)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isOpenColab && (
        <Modal closeModal={() => { setIsOpenColab(false); reset(); }} title="Atualizar Colaborador">
          <div className="modal_update">
            <form onSubmit={handleSubmit(updateColaborador)}>
              <Input
                label="Nome"
                maxLength={300}
                placeholder="Digite seu novo nome"
                onChange={(e) => setValue("nm_colab", e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                maxLength={50}
                placeholder="Digite seu novo email"
                onChange={(e) => setValue("email_colab", e.target.value)}
              />
              <Input
                label="CPF"
                type="number"
                maxLength={11}
                placeholder="Digite seu novo CPF"
                onChange={(e) => setValue("cpf_colab", parseInt(e.target.value))}
              />
              <Input
                label="Data de nascimento"
                type="date"
                placeholder="Digite sua nova data de nascimento"
                onChange={(e) => setValue("dt_nasc_colab", formatDate(e.target.value))}
              />
              <Select
                label="Gênero"
                placeholder="Digite seu novo gênero"
                options={[{ id: 1, label: "Masculino" }, { id: 2, label: "Feminino" }, { id: 3, label: "Prefiro não dizer" }]}
                onChange={(e) => setValue("genero_colab", e.target.value)}
              />
              <Input
                label="Número de Telefone"
                type="number"
                maxLength={11}
                placeholder="Digite seu novo número"
                onChange={(e) => setValue("tel_colab", parseInt(e.target.value))}
              />
              <Input
                label="Endereço"
                maxLength={500}
                placeholder="Digite seu novo endereço"
                onChange={(e) => setValue("endereco_colab", e.target.value)}
              />
              <Input
                label="Senha"
                type="password"
                maxLength={500}
                placeholder="Digite sua nova senha"
                onChange={(e) => setValue("senha_colab", e.target.value)}
              />
              <Button type="submit">Atualizar</Button>
            </form>
          </div>
        </Modal>
      )}
      {isOpenModal && (
        <Modal closeModal={() => { setIsOpenModal(false); reset(); }} title="Atualizar Veículo">
          <div className="modal_update">
            <form onSubmit={handleSubmit(updateModal)}>
              <Input
                label="Modelo"
                maxLength={30}
                placeholder="Digite seu o novo modelo"
                onChange={(e) => setValue("modelo_modal", e.target.value)}
              />
              <Input
                label="Placa"
                maxLength={7}
                placeholder="Digite sua nova placa"
                onChange={(e) => setValue("placa_modal", e.target.value)}
              />
              <Input
                label="Marca"
                maxLength={50}
                placeholder="Digite sua nova marca"
                onChange={(e) => setValue("marca_modal", e.target.value)}
              />
              <Input
                label="Ano do modal"
                maxLength={4}
                placeholder="Digite o novo ano do modal"
                onChange={(e) => setValue("ano_modal", e.target.value)}
              />
              <Input
                label="Tipo do Modal"
                maxLength={50}
                placeholder="Digite o novo tipo do modal"
                onChange={(e) => setValue("tipo_modal", e.target.value)}
              />
              <Button type="submit">Atualizar</Button>
            </form>
          </div>
        </Modal>
      )}
    </main>
  )
}