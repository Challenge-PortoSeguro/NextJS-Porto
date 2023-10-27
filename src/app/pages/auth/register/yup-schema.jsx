import * as yup from 'yup';

const schema = yup.object().shape({
    nome: yup.string().required("Nome completo é obrigatório"),
    cpf: yup.number().required("CPF é obrigatório"),
    rg: yup.number().required("RG é obrigatório"),
    cnh: yup.number().required("CNH é obrigatória"),
    nascimento: yup.date().required("Data de nascimento é obrigatória"),
    genero: yup.string().required("Gênero é obrigatório"),
    telefone: yup.number().required("Telefone é obrigatório"),
    endereco: yup.string().required("Endereço é obrigatório"),
    email: yup.string().required("Email é obrigatório"),
    senha: yup.string().required("Senha é obrigatória"),
    modelo: yup.string().required("Modelo é obrigatório"),
    placa: yup.string().required("Placa é obrigatória"),
    renavam: yup.string().required("Renvam é obrigatório"),
    tipoChassi: yup.string().required("Tipo do chassi é obrigatório"),
    numChassi: yup.string().required("Número do chassi é obrigatório"),
    tipoEixo: yup.string().required("Tipo do eixo é obrigatório"),
    numEixo: yup.string().required("Túmero do eixo é obrigatório"),
    altura: yup.number().required("Altura é obrigatória"),
    largura: yup.number().required("Largura é obrigatória"),
    comprimento: yup.number().required("Comprimento é obrigatório"),
    peso: yup.number().required("Peso é obrigatório"),
    pesoSuportado: yup.number().required("Peso suportado é obrigatório"),
})

export default schema;