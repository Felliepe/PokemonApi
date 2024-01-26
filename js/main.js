let pokemonList = document.getElementById('pokemonList')
const input = document.getElementById('search')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 150 // número máximo de pokemon como 150 
const limit = 20 // limite de pokemon a serem carregados por vez 
let offset = 0; // Inicializa o deslocamento da paginação para 0

function loadPokemonitens(offset, limit) { // Função para carregar itens de Pokémon com um determinado deslocamento e limite
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { // pokeApi para obter dados do Pokémon com base no deslocamento e limite fornecidos
        const newHtml = pokemons.map((pokemon) => // HTML para cada Pokémon nos dados recebidos
            `
            <li class="pokemon">
                <a href="details.html?id=${pokemon.id}" class="">
                <span class="number">#${pokemon.number}</span>
                <h2 class="name">${pokemon.name}</h2>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}"> 
                </div>
            </a>
        </li> 
    `
        ).join('')
        pokemonList.innerHTML += newHtml // Acrescenta o HTML ao pokemonList

        input.oninput = () => { // Adiciona um ouvinte de entrada ao elemento de entrada para pesquisa/filtragem
            if (input.value.length > 0) { // Limpa o conteúdo existente em pokemonList se o valor de entrada não estiver vazio
                pokemonList.innerHTML = ""
            } else {
                pokemonList.innerHTML = newHtml // Restaura o HTML original se o valor de entrada estiver vazio
            }

            pokemons.forEach((pokemon) => { // Itera através dos dados do Pokémon carregados para filtragem com base no valor de entrada
                const pokeName = pokemon.name.toString();
                let adicionouPoke = false;
                let str = ''
                let inputValue = input.value.toLowerCase()

                for (let i = 0; i < pokeName.length; i++) { // Verifica se o valor de entrada corresponde parcialmente ao nome do Pokémon
                    str += pokeName[i]
                    if (inputValue.includes(pokeName[i]) && inputValue === str) {
                        console.log(str)
                        adicionouPoke = true;
                    }
                }
                if (adicionouPoke) { // Se uma correspondência for encontrada, adicione o HTML do Pokémon correspondente à pokemonList
                    const newHtml = `
                            <li class="">
                                <a href="details.html?id=${pokemon.id}" class="pokemon">
                                    <span class="number">#${pokemon.number}</span>
                                    <h2 class="name">${pokemon.name}</h2>
                                    <div class="detail">
                                        <ol class="types">
                                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                        </ol>
                                        <img src="${pokemon.photo}" alt="${pokemon.name}"> 
                                    </div>
                                </a>
                            </li> 
                        `
                    pokemonList.innerHTML += newHtml
                }
            }
            )
        }
    })
}

loadPokemonitens(offset, limit) // Carrega itens Pokémon inicialmente com o deslocamento e limite especificados

loadMoreButton.addEventListener('click', () => { //  addEventListener de clique ao loadMoreButton para carregamento paginado
    offset += limit // Aumenta o deslocamento pelo limite para carregar o próximo conjunto de Pokémon

    const qtdRecord = offset + limit // Calcula o número total de pokemon a serem carregados após o incremento

    if (qtdRecord >= maxRecords) { // Verifica se o total de registros a serem carregados excede o máximo de registros
        const newLimit = maxRecords - offset // Ajusta o limite da última carga de pokemon
        loadPokemonitens(offset, newLimit) // // Carrega itens Pokémon com o limite ajustado

        loadMoreButton.parentElement.removeChild(loadMoreButton) // Remove o loadMoreButton se for a última carga
    } else {
        loadPokemonitens(offset, limit) // Carrega itens Pokémon com o deslocamento e limite especificados
    }
})