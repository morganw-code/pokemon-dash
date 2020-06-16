const searchButton = document.querySelector("#search-button");
const searchBar = document.querySelector("#search-bar");
const spriteContainer = document.querySelector("#sprite-container");
let spriteNodes = [];

async function getPokemon(name) {
  try {
    const response = await axios.get(
      `http://pokeapi.co/api/v2/pokemon/${name}`
    );
    return response.data;
  } catch {
    console.log("something bad happened :(");
  }
}

async function searchPokemon() {
  if (spriteNodes.length > 0) {
    spriteNodes.forEach((node) => {
      spriteContainer.removeChild(node);
    });
    spriteNodes = [];
  }
  const pokemon = await getPokemon(searchBar.value);
  if (pokemon !== undefined || pokemon !== null) {
    Object.keys(pokemon.sprites).forEach((key) => {
      if (pokemon.sprites[key] !== null) {
        const node = document.createElement("img");
        node.src = pokemon.sprites[key];

        spriteNodes.push(node);

        spriteContainer.appendChild(node);
      }
    });
  } else {
    console.log("pokemon was undefined");
  }
}

searchButton.addEventListener("click", searchPokemon);
