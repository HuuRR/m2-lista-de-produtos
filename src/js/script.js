const ul = document.querySelector('.containerListaProdutos ul');
const arrayCarrinho = []

function montarListaProdutos(listaProdutos) {
    ul.innerHTML = '';
    listaProdutos.forEach((produto) => {

        const li = document.createElement('li');

        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const span = document.createElement('span');
        const componentes = document.createElement("ol")
        const addCarrinho = document.createElement("button")
        addCarrinho.setAttribute("id", "botao-add")
        addCarrinho.addEventListener("click", () => fAddCarrinho(produto))

        img.src = produto.img;
        img.alt = produto.nome;
        h3.innerText = produto.nome;
        p.innerText = produto.preco;
        span.innerText = produto.secao;
        
        for (let i = 0; i < produto.componentes.length; i++) {
            const liComponente = document.createElement("li")
            liComponente.innerText = produto.componentes[i]
            componentes.appendChild(liComponente)
        }
            

        addCarrinho.innerText = "Adicionar ao Carrinho"

        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(span);
        li.appendChild(componentes)
        li.appendChild(addCarrinho)

        ul.appendChild(li);
    });
    //valorTotal(produtos)
}
montarListaProdutos(produtos)


function filtrarPorHortifruti() {
    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === 'Hortifruti';
    })

    montarListaProdutos(listaHortifruti);
}
const botaoMostrarHortifruti = document.querySelector('.estiloGeralBotoes--filtrarHortifruti');
botaoMostrarHortifruti.addEventListener('click', filtrarPorHortifruti)

function filtrarPorPanificadora() {
    const listaPanificadora = produtos.filter((produto) => {
        return produto.secao === 'Panificadora';
    })

    montarListaProdutos(listaPanificadora);
}
const botaoMostrarPanificadora = document.querySelector('.estiloGeralBotoes--filtrarPanificadora');
botaoMostrarPanificadora.addEventListener('click', filtrarPorPanificadora)

function filtrarPorLaticinios() {
    const listaLaticinios = produtos.filter((produto) => {
        return produto.secao === 'Laticinio';
    })

    montarListaProdutos(listaLaticinios);
}
const botaoMostrarLaticinios = document.querySelector('.estiloGeralBotoes--filtrarLaticinios');
botaoMostrarLaticinios.addEventListener('click', filtrarPorLaticinios)


//função para mostrar todos
function mostrarTodos () {
    return montarListaProdutos(produtos)
}
const botaoTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos")
botaoTodos.addEventListener("click", mostrarTodos)

//função do campo de busca
function barraPesquisa () {
    const campoDeBusca = document.querySelector('.campoBuscaPorNome')
    const pesquisaProdutos = []
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome.toLowerCase().indexOf(campoDeBusca.value.toLowerCase()) !== -1 ) {
            pesquisaProdutos.push(produtos[i])
        } else if (produtos[i].secao.toLowerCase().indexOf(campoDeBusca.value.toLowerCase()) !== -1){
            pesquisaProdutos.push(produtos[i])
        } else if (produtos[i].categoria.toLowerCase().indexOf(campoDeBusca.value.toLowerCase()) !== -1) {
            pesquisaProdutos.push(produtos[i])
        }
    }
    montarListaProdutos(pesquisaProdutos)
}
const buttonPesquisa = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
buttonPesquisa.addEventListener("click", barraPesquisa)


//lidando com carrinho
const ul2 = document.querySelector('.containerCarrinho ul');


function fAddCarrinho (produto){
    arrayCarrinho.push(produto)
    ul2.innerHTML = ""
    carrinho(arrayCarrinho)
    valorTotal(arrayCarrinho)
    //console.log(arrayCarrinho)
}

function carrinho (arrayCarrinho) {
    arrayCarrinho.forEach((produto) => {
        const liC = document.createElement('li')

        const imgC = document.createElement('img')
        const h3C = document.createElement('h3')
        const pC = document.createElement("p")
        const spanC = document.createElement("span")

        imgC.src = produto.img;
        imgC.alt = produto.nome;
        h3C.innerText = produto.nome;
        pC.innerText = produto.preco;
        spanC.innerText = produto.secao;

        liC.append(imgC, h3C, pC, spanC)

        ul2.appendChild(liC)
    })
}

function valorTotal (array){
    const valor = array.reduce((acc, {preco}) => {
        acc = parseFloat(preco) + acc
        return acc
    },0) 
    const precoTotal = document.getElementById("precoTotal")
    precoTotal.innerText = valor.toFixed(2)
}
