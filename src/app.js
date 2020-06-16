const searchButton = document.querySelector("#search-button");
const searchBar = document.querySelector("#search-bar");
const spriteContainer = document.querySelector("#sprite-container");
const pokemonName = document.querySelector("#pokemon-name");
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

async function displayPokemon() {
  if (spriteNodes.length > 0) {
    spriteNodes.forEach((node) => {
      spriteContainer.removeChild(node);
    });
    spriteNodes = [];
  }
  const pokemon = await getPokemon(searchBar.value);

  if (pokemon !== undefined || pokemon !== null) {
    spriteContainer.style.visibility = "visible";
    pokemonName.style.visibility = "visible";
    pokemonName.innerHTML = capitalize(pokemon.name);
    Object.keys(pokemon.sprites).forEach((key) => {
      if (pokemon.sprites[key] !== null) {
        const spriteImgNode = document.createElement("img");
        const spriteNode = document.createElement("div");
        const spriteTitle = capitalize(key, "_");

        spriteImgNode.src = pokemon.sprites[key];
        spriteImgNode.id = "sprite-img";
        spriteNode.id = "sprite-holder";
        spriteNode.appendChild(spriteImgNode);
        spriteNode.appendChild(document.createTextNode(spriteTitle));
        spriteContainer.appendChild(spriteNode);
        spriteNodes.push(spriteNode);
      }
    });
  } else {
    console.log("pokemon was undefined");
  }
}

function capitalize(str, delim = null) {
  if (delim != null) {
    const newStr = str
      .split(delim)
      .map((substr) => {
        return substr[0].toUpperCase() + substr.slice(1);
      })
      .join(" ");
    return newStr;
  } else {
    return str[0].toUpperCase() + str.slice(1);
  }
}

searchButton.addEventListener("click", displayPokemon);
