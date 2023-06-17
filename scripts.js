const button = document.querySelector('.button-task')
const input = document.querySelector('.input-task')
const lista = document.querySelector('.list-task')

/*Array de itens (tarefas criadas) */
let itens = []

/*Função que adiciona uma nova tarefa(seu conteudo) ao array "itens" e depois exibe*/
function addTarefa() {
    if (input.value != '') {
        itens.push({
            conteudo: input.value,
            concluida: false,
        })

        input.value = ''

        mostrarTarefas()
    }
}

/* Função para mostrar as tarefas na página */
function mostrarTarefas() {
    let novaLista = ''
    
    /* forEach passa por cada item do array inserindo o conteudo de forma dinamica*/
    itens.forEach((tarefa, index) => {
        let img = "circle.png"

        if (tarefa.concluida == true) {
            img = "check_circle.png"
        }
        novaLista = novaLista + `
        <li class="task ${tarefa.concluida && 'done'}">
            <img src="./img/${img}" alt="Concluir tarefa" onclick="concluirTarefa(${index})">
            <p>${tarefa.conteudo}</p>
            <img src="./img/delete.png" alt="Excluir tarefa" onclick="deletarItem(${index})">

        </li>
        `
    })

    lista.innerHTML = novaLista

    /*Guardar a informação das Tarefas quando der F5 no site */
    localStorage.setItem('lista', JSON.stringify(itens))
}

/*Função que troca "concluida" para true  */
function concluirTarefa(index) {
    itens[index].concluida = !itens[index].concluida

    mostrarTarefas()
}

/* Função para deletar um item */
function deletarItem(index) {
    itens.splice(index, 1)

    mostrarTarefas()
}

/*Função para salvar o conteudo de "lista" no local storage*/
function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        itens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', addTarefa)