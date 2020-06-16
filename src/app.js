const searchButton = document.querySelector('#search-button');
const searchBar = document.querySelector('#search-bar')
const pokemonImage = document.querySelector('#pokemon-image')
async function getPokemon(name) {
    try {
        const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${name}`)
        return response.data;
    } catch {
        console.log('something bad happened :(')
    }
}

searchButton.addEventListener('click', async () => {
    const pokemon = await getPokemon(searchBar.value);
    pokemonImage.src = pokemon.sprites.front_default;
});
