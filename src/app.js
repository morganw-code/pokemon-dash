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

async function displayPokemon() {
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
        const spriteImgNode = document.createElement("img");
        spriteImgNode.src = pokemon.sprites[key];
        spriteImgNode.style = "width: 96px; height: 96px;";
        // node that holds the sprite and sprite information
        const node = document.createElement("div");
        node.style =
          "display: flex; flex-direction: column; width: 256px; border: 1px solid black; padding: 1em; align-items: center;";
        node.appendChild(spriteImgNode);
        const spriteTitle = key
          .split("_")
          .map((substr) => {
            return substr[0].toUpperCase() + substr.slice(1);
          })
          .join(" ");
        node.appendChild(document.createTextNode(spriteTitle));
        spriteContainer.appendChild(node);
        spriteNodes.push(node);
      }
    });
  } else {
    console.log("pokemon was undefined");
  }
}

searchButton.addEventListener("click", displayPokemon);
