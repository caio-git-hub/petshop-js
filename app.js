const moment = require("moment"); //Usando o modulo Moment
const fs = require("fs"); //Importando o modulo FS para manipulação de arquivos
const nomeArquivo = 'pets.json'; //Salvando em uma variavel onde esta o arquivo JSON
const nomePetshop = "** PETSHOP **"; //Nome do Petshop

//Importando minha lista de cadastros
let petsJSON = fs.readFileSync(nomeArquivo); //Le o conteudo do arquivo 
let arquivoPets = JSON.parse(petsJSON); //Converte para formato JS

//console.log(arquivoPets.pets);

//------------------------------    FUNÇOES     ------------------

//Função para atualizar os dados no arquivo JSON
const atualizarJSON = () => {
    let listaJSON = JSON.stringify(arquivoPets, null, 2); //objeto para converter, "null" para não minificar(deixar tudo junto), "2" para numero de linhas - convertendo o objeto literal para JSON
    fs.writeFileSync(nomeArquivo, listaJSON, "utf-8"); //fs.writeFileSync(caminho do arquivo, conteudo novo, formato)
}

//Arrow Function para adicionar novos pets
const adicionaPet = (infoPet) => {
    arquivoPets.pets.push(infoPet);
    atualizarJSON();//Atualizando para a lista
    console.log(`${infoPet.nome} está cadastrado no nosso sistema!`)
}

//Declarando a arrowfuncition (função) para listar os pets de uma lista
const listarPets = (listaDePets) => {
    let vacinado //Declarando uma variavel para salvar o status de Vacinado
    for (let i = 0; i < listaDePets.length; i++) {
        //console.log(listaDePets[i].nome + ", " + listaDePets[i].idade + ", " + listaDePets[i].tipo)

        /* CODIGO COM IF E ELSE
        //Checando se o pet esta vacinado
        if (listaDePets[i].vacinado == true) //Pet esta vacinado
        {
            vacinado = "Vacinado"
        } else //Pet não esta vacinado
        {
            vacinado = "Não Vacinado"
        }
        */

        //Retornando os dados
        console.log(`${listaDePets[i].nome}, ${listaDePets[i].idade} anos, ${listaDePets[i].tipo}, ${(listaDePets[i].vacinado ? "Vacinado!" : "Nao vacinado!")}`)

        //Para checar os Serviços do pet
        for(let s = 0; s < listaDePets[i].servicos.length; s++){
            console.log(`Servicos: ${listaDePets[i].servicos[s].data} - ${listaDePets[i].servicos[s].nome}`)
        }
    }   
}

//ArrowFuncition para checar se o pet esta vacinado, se nao estiver, vacine ele
const vacinarPet = (pet) => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        atualizarJSON(); //Atualizando a lista
        console.log(`${pet.nome} foi vacinado com sucesso!`)
    } else {
        console.log(`Ops, ${pet.nome} já esta vacinado!`)
    }
}

//ArrowFunction para checar se os pets estão vacinados
const campanhaVacina = (listaPets) => {
    let totalVacinados = 0; //variavel para contar o total de vacinados
    for (let i = 0; i < listaPets.length; i++){
        if (!listaPets[i].vacinado){ //checando se não esta vacinado
            listaPets[i].vacinado = true;    //vacine
            totalVacinados++;   //mais um para o total de vacinados
        }
    }
    atualizarJSON();
    console.log(`Parabéns, ${totalVacinados} pets foram vacinados nessa campanha!`)
}

//Criando a função de dar banho no pet
const darBanhoPet = (pet) => {
    pet.servicos.push({
        nome: "Banho",
        data: moment().format("DD-MM-YYYY") //Data que o pet tomou banho
    })
    atualizarJSON();
    console.log(`${pet.nome} esta cheiroso`)
}


//Criando a função cortar a Unha do pet
const apararUnhasPet = (pet) => {
    pet.servicos.push({
        nome: "Unhas",
        data: moment().format("DD-MM-YYYY") //Data que o pet tomou banho
    })
    atualizarJSON();
    console.log(`${pet.nome} esta de unhas feitas!`)
}

//Criando a função de Tosa no pet
const tosarPet = (pet) => {
    pet.servicos.push({
        nome: "Tosa",
        data: moment().format("DD-MM-YYYY") //Data que o pet tomou banho
    })
    atualizarJSON();
    console.log(`${pet.nome} foi tosado, e esta magnifico!`)
}

//Criando função para buscar pet
const buscarPet = (nomePet) => {
    const petEncontrado = arquivoPets.pets.find((pet) => { //find, pecorre pelo array buscando o nome, e guardando no parametro "pet", para depois verificar se é igual ao "nomePet"
        return pet.nome == nomePet;
    })
    console.log(petEncontrado ? petEncontrado : `Nenhum pet encontrado com esse nome:  ${nomePet}`);
}

//Criando função para atender o cliente, dando qual pet é, e qual servico quer
const atenderCliente = (pet, servico) => {
    console.log(`Ola, ${pet.nome}!`);
    servico(pet);
    console.log("Até mais!");
}

//Criando uma função para adicionar um atributo se foi castrado ou não. Ele adiciona na lista
const addInfoCastrado = (listaPets) => {
    let listaPetsAtualizado = listaPets.map((pet) => {
        pet.castrado = true; //automaticamente ele cria o atributo castrado, e deixa todos como "true"

        return pet;
    })
    arquivoPets.pets = listaPetsAtualizado;
    atualizarJSON();
}

//Criando uma função para listar o total que tem de vacinados na lista de clientes
const listarVacinados = () => {
    console.log("** VACINADO **")
    let vacinados = arquivoPets.pets.filter((pet) => { //verifica na lista cada cliente
        return pet.vacinado; //retorna os que estão vacinados
    })

    console.log(vacinados);
    console.log(`Temos ${vacinados.length} pets vacinados`);
}

//-----------------------------     EXECUÇÃO DAS FUNÇÕES    ---------------

//Executando a funçao de adicionar novos pets
// adicionaPet({
//    nome: "Rex",
//    idade: 4,
//    raca: "Predador",
//    tipo: "Dinossauro",
//    vacinado: false,
//    genero: "M",
//    servicos: []
// });


//Executando a função de vacinar o pet
vacinarPet(arquivoPets.pets[0]);
vacinarPet(arquivoPets.pets[3]);

//Executando a função da campanha para ver quantos foram vacinados
campanhaVacina(arquivoPets.pets);

//Executando a função de dar Banho
darBanhoPet(arquivoPets.pets[0]);

//Executando a função de dar Tosa
tosarPet(arquivoPets.pets[0]);

//Executando a função de cortar a Unha
apararUnhasPet(arquivoPets.pets[0]);

//Executando a função para listar os meus dados dos pets
listarPets(arquivoPets.pets) //Função "listarPets" com o parametro "pets" | "pets" é onde guardei as informações dos meus Pets

//Executando a função para buscar um determinado pet na lista
buscarPet("Ted");

//Executando a funcão de atender o cliente
atenderCliente(arquivoPets.pets[0], darBanhoPet);

//Executando a função de verificar quantos estão vacinados
listarVacinados();