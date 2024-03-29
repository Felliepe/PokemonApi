// pega o elemento que vamos inserir o pokemon
const loadPokemon = document.getElementById('loadPokemon')

// pega a url da pagina atual
const pagURL = window.location.href

// separa a parte relativa a atribuição
const splitURL = pagURL.split("=")

// define a variável id
let id = 0

// caso tenha ocorrido o split e ele seja maior que 1 ocorre um pop no id, caso não tenha o valor default será 1
if (splitURL.length > 1) {
    id = splitURL.pop()
} else {
    id = 1
}

// define a url que para requisição
const url = `https://pokeapi.co/api/v2/pokemon/${id}`
console.log(url)

// função para pegar os detalhes do pokemon e retornar no HTML
function toLoadPokemon(url) {
    pokeApi.getPokemonDetail(url).then((pokemon = []) => {
        const newHtml =
            `<div class="container">
                    <div class="pokemon-img">
                        <img src="${pokemon.photo}" alt="${pokemon.name}"> 
                    </div>
                        <span class="number" aria-label="número do Pokemon">#${pokemon.number}</span>
                        <h1 class="name">${pokemon.name}</h1>

                        <ol class="types" aria-label="Lista de tipos do Pokemon">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                <div class="pokemon-detail">
                        <h2>Estatísticas</h2>
                        <ul class="stats">
                            ${pokemon.stats.map((stat) => `
                            <li class="stat ${stat.stat.name}">
                                <h3>
                                    ${stat.stat.name}
                                </h3> 
                                <div class="progress">
                                    <span>${stat.base_stat}</span>
                                    <progress value="${stat.base_stat}" max="100"></progress>
                                </div>
                                    
                            </li>`).join('')}
                        </ul>
            </div>
        </div> 
        `
        loadPokemon.innerHTML += newHtml
    })
}

// evento de load adicionado a tela para ao carregar chamar a função acima
window.addEventListener('load', () => {
    toLoadPokemon(url)
})