const pokeApi = {} // objeto vazio para servir como namespace pokeApi

function convertPokeApiDetailToPokemon(pokeDetail) { // Função para converter detalhes do PokeAPI em um objeto Pokémon
    const pokemon = new Pokemon() // nova instância da classe Pokémon

    pokemon.id = pokeDetail.id // Atribui propriedades do detalhe PokeAPI ao objeto Pokémon

    let numberString = pokeDetail.id.toString() // formatação do número do Pokémon com zeros à esquerda para garantir três dígitos
    while (numberString.length < 3) {
        numberString = "0" + numberString
    }

    // atribuindo pokemon.number ao número formatado
    pokemon.number = numberString
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name) // Extrai os tipos e atribui-os ao array 'types' e à propriedade 'type'
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    const stats = pokeDetail.stats.map((statSlot) => statSlot) // Extrai as estatísticas e atribui-as ao array 'stats' e à propriedade 'stat'
    const [stat] = stats
    pokemon.stats = stats
    pokemon.stat = stat

    // URL para a imagem oficial da arte do Pokémon
    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`
    return pokemon // return o objeto Pokémon preenchido
}

pokeApi.getPokemonDetail = (pokemon) => { // Função para obter detalhes de um único Pokémon da PokeAPI
    return fetch(pokemon.url || url) // fetch para obter detalhes do Pokémon
        .then((response) => response.json()) // converter a resposta para JSON
        .then(convertPokeApiDetailToPokemon) // converter para um objeto Pokémon
}

pokeApi.getPokemonDetails = (pokemon) => { // obter detalhes de uma lista de Pokémon da PokeAPI
    return fetch(pokemon) // fetch para obter detalhes do Pokémon
        .then((response) => response.json()) // converter a resposta para JSON 
        .then(convertPokeApiDetailToPokemon) // converter para um objeto Pokémon
}

pokeApi.getPokemons = (offset = 0, limit = 5) => { // obter uma lista de Pokémon da PokeAPI com um deslocamento e limite especificados
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` // URL para o endpoint PokeAPI com base no deslocamento e no limite
    return fetch(url) // Busca a lista de Pokémon da PokeAPI, extrai os resultados, obtém detalhes de cada um e resolve as Promise
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}
