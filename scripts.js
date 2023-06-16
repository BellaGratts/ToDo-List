const button = document.querySelector('.button-task')
const input = document.querySelector('.input-task')
const lista = document.querySelector('.list-task')

let itens = []

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

function mostrarTarefas() {
    let novaLista = ''

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

    localStorage.setItem('lista', JSON.stringify(itens))
}

function concluirTarefa(index) {
    itens[index].concluida = !itens[index].concluida

    mostrarTarefas()
}

function deletarItem(index) {
    itens.splice(index, 1)

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        itens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', addTarefa)