// Substitua o "SEU_ID_AQUI" pelo código gerado no site do CrudCrud
const API_URL = "https://crudcrud.com/api/294a3c71d59f4b8f92156460b78f580e/clientes";

// Elementos do HTML capturados para o JavaScript trabalhar
const formCliente = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");

// --- 1. FUNÇÃO: LISTAR CLIENTES (GET) ---
function listarClientes() {
    // Faz a requisição para a API buscar os dados
    fetch(API_URL)
        .then(response => response.json()) // Transforma a resposta bruta da API em JSON (objeto)
        .then(clientes => {
            listaClientes.innerHTML = ""; // Limpa a lista na tela antes de redesenhar

            // Roda um laço para cada cliente encontrado na API
            clientes.forEach(cliente => {
                const li = document.createElement("li");
                
                // Monta o texto com Nome e Email, e cria o botão contendo o _id do cliente
                li.innerHTML = `
                    <div>
                        <strong>${cliente.nome}</strong> <br>
                        <small>${cliente.email}</small>
                    </div>
                    <button class="btn-excluir" onclick="excluirCliente('${cliente._id}')">Excluir</button>
                `;
                
                // Adiciona o item criado dentro da nossa <ul> no HTML
                listaClientes.appendChild(li);
            });
        })
        .catch(erro => console.error("Erro ao listar clientes:", erro)); // Exibe erro no console (F12) se algo falhar
}

// --- 2. FUNÇÃO: CADASTRAR CLIENTE (POST) ---
formCliente.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Impede a página de recarregar ao enviar o formulário

    // Captura os valores que o usuário digitou
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    // Objeto com os dados estruturados para envio
    const dadosCliente = { nome: nome, email: email };

    // Faz a requisição de cadastro enviando dados no formato JSON
    fetch(API_URL, {
        method: "POST", // Método HTTP para criação
        headers: {
            "Content-Type": "application/json" // Avisa a API que estamos enviando texto em formato JSON
        },
        body: JSON.stringify(dadosCliente) // Transforma o objeto JavaScript em uma string de texto JSON
    })
    .then(response => {
        if (response.ok) {
            console.log("Cliente cadastrado com sucesso!");
            formCliente.reset(); // Limpa as caixas de digitação do formulário
            listarClientes(); // Atualiza a lista na tela para mostrar o novo cliente
        }
    })
    .catch(erro => console.error("Erro ao cadastrar cliente:", erro));
});

// --- 3. FUNÇÃO: EXCLUIR CLIENTE (DELETE) ---
function excluirCliente(id) {
    // O CrudCrud precisa que o ID do cliente seja passado direto na URL (ex: .../clientes/12345)
    fetch(`${API_URL}/${id}`, {
        method: "DELETE" // Método HTTP para remoção
    })
    .then(response => {
        if (response.ok) {
            console.log("Cliente deletado com sucesso!");
            listarClientes(); // Atualiza a tela removendo o cliente apagado
        }
    })
    .catch(erro => console.error("Erro ao deletar cliente:", erro));
}

// Executa a listagem assim que a página acaba de carregar pela primeira vez
listarClientes();