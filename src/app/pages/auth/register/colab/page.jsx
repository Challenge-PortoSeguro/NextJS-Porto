'use client'
import Input from "@/components/Input/page";
import Select from "@/components/Select/page";
import ButtonPrimary from "@/components/Button/variants/primary";
import ButtonLink from "@/components/Button/variants/link";
import ButtonSuccess from "@/components/Button/variants/success";
import "../styles.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Register() {
    const route = useRouter();
    const { handleSubmit, setValue } = useForm();
    const [nextStep, setNextStep] = useState(false);

    const onSubmit = (data) => {
        if(!data 
            || !data.nm_colab 
            || !data.cpf_colab 
            || !data.genero_colab 
            || !data.tel_colab 
            || !data.dt_nasc_colab 
            || !data.endereco_colab 
            || !data.email_colab 
            || !data.senha_colab 
            || !data.modelo_modal 
            || !data.placa_modal 
            || !data.marca_modal 
            || !data.ano_modal 
            || !data.tipo_modal 
            || !data.altura 
            || !data.largura 
            || !data.comprimento 
            || !data.peso 
            || !data.peso_suportado) {
            alert("Preencha todos os campos!");
            return;
        }
        try {
            fetch('http://localhost:3000/api/colaborador/0', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.ok) {
                    route.push("/pages/auth/login/colab");
                } else {
                    alert("Erro ao cadastrar!");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="container-register">
            <div className="image" />
            <div className="register">
                <h1>{!nextStep ? "Cadastro do Colaborador" : "Cadastro do Modal"}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={!nextStep ? "display-visible" : "display-none"}>
                        <Input
                            label="Nome Completo"
                            type="text"
                            placeholder="Digite seu nome"
                            onChange={(e) => setValue("nm_colab", e.target.value)}
                        />
                        <div className="two-inputs">
                            <Input
                                label="CPF"
                                type="number"
                                maxLength={11}
                                placeholder="Digite seu CPF"
                                onChange={(e) => setValue("cpf_colab", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Nascimento"
                                type="date"
                                onChange={(e) => setValue("dt_nasc_colab", e.target.value)}
                            />
                            <Select
                                label="Gênero"
                                options={[{value: "", label: "Escolha o seu gênero"}, { value: "masculino", label: "Masculino" }, { value: "feminino", label: "Feminino" }, { value: "prefiro não dizer", label: "Prefiro não dizer" }]}
                                onChange={(e) => setValue("genero_colab", e.target.value)}
                            />
                            <Input
                                label="Telefone"
                                type="tel"
                                maxLength={11}
                                placeholder="Digite seu telefone"
                                onChange={(e) => setValue("tel_colab", e.target.value)}
                            />
                        </div>
                        <Input
                            label="Endereço"
                            type="text"
                            maxLength={80}
                            placeholder="Digite seu endereço"
                            onChange={(e) => setValue("endereco_colab", e.target.value)}
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            maxLength={50}
                            placeholder="Digite seu e-mail"
                            onChange={(e) => setValue("email_colab", e.target.value)}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            maxLength={250}
                            placeholder="Digite sua senha"
                            onChange={(e) => setValue("senha_colab", e.target.value)}
                        />
                        <ButtonPrimary onClick={() => setNextStep(true)}>Continuar</ButtonPrimary>
                        <ButtonLink redirect="/pages/auth/login/colab">Já possui uma conta?</ButtonLink>
                    </div>

                    <div className={nextStep ? "display-visible" : "display-none"}>
                        <Input
                            label="Modelo"
                            type="text"
                            placeholder="Digite o modelo"
                            onChange={(e) => setValue("modelo_modal", e.target.value)}
                        />
                        <div className="two-inputs">
                            <Input
                                label="Placa"
                                type="text"
                                maxLength={7}
                                placeholder="Digite a placa"
                                onChange={(e) => setValue("placa_modal", e.target.value)}
                            />
                            <Input
                                label="Marca"
                                type="text"
                                maxLength={20}
                                placeholder="Digite a marca"
                                onChange={(e) => setValue("marca_modal", e.target.value)}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Ano de Fabricação"
                                type="number"
                                maxLength={4}
                                placeholder="Digite o ano de fabricação"
                                onChange={(e) => setValue("ano_modal", parseInt(e.target.value))}
                            />
                            <Input
                                label="Tipo do modal"
                                type="text"
                                placeholder="Digite o tipo do modal"
                                onChange={(e) => setValue("tipo_modal", e.target.value)}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Altura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("altura", parseInt(e.target.value))}
                            />
                            <Input
                                label="Largura"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("largura", parseInt(e.target.value))}
                            />
                            <Input
                                label="Comprimento"
                                type="number"
                                placeholder="(m)"
                                onChange={(e) => setValue("comprimento", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="two-inputs">
                            <Input
                                label="Peso"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("peso", parseInt(e.target.value))}
                            />
                            <Input
                                label="Peso Suportado"
                                type="number"
                                placeholder="(kg)"
                                onChange={(e) => setValue("peso_suportado", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="div-buttons">
                            <ButtonPrimary onClick={() => setNextStep(false)}>Voltar</ButtonPrimary>
                            <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}