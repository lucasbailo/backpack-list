const form = document.getElementById('novoItem');

const lista = document.getElementById('lista');

const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach((elemento) => {
    criaElemento(elemento)
    
});


form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    
    const quantidade = evento.target.elements['quantidade'];
    const nome = evento.target.elements['nome'];

    const existe = itens.find( elemento => elemento.nome === nome.value)
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }
        
    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id)] = itemAtual


    } else {

        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1: 0
        
        criaElemento(itemAtual)

        itens.push(itemAtual)

    }

    

    

    localStorage.setItem('itens', JSON.stringify(itens))

    

    quantidade.value = ""
    nome.value = ""

})


function criaElemento (item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.dataset.id = item.id
    numeroItem.innerHTML = item.quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}





function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}





function botaoDeleta (id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode)
    })

    return elementoBotao
}


function deletaElemento(tag, id) {
    tag.remove()
    
    itens.splice(itens.findIndex (elemento => elemento.id === id),1)

    localStorage.setItem("itens", JSON.stringify(itens))
}













