const searchButton = document.querySelector("#search-button");
const searchBar = document.querySelector("#search-bar");
const spriteContainer = document.querySelector("#sprite-container");
const pokemonName = document.querySelector("#pokemon-name");
const statsContainer = document.querySelector("#stats-container");
let spriteNodes = [];
let statNodes = [];
let pokemon = null;

async function getPokemon(name) {
  await axios
    .get(`http://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      pokemon = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function searchPokemon() {
  await getPokemon(searchBar.value);
  displayPokemonSprites(pokemon);
  displayPokemonStats(pokemon);
}

function displayPokemonSprites(pokemon) {
  destroyChildNodes(spriteContainer, spriteNodes);
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
        // used for cleanup
        spriteNodes.push(spriteNode);
      }
    });
  } else {
    console.log("pokemon was undefined");
  }
}

function displayPokemonStats(pokemon) {
  destroyChildNodes(statsContainer, statNodes);
  statsContainer.style.visibility = "visible";
  const basicDataNames = ["name", "base_experience", "height", "weight"];
  basicDataNames.forEach((name) => {
    const titleNode = document.createElement("h3");
    const statNode = document.createElement("p");
    let stat = pokemon[name];
    // weight is originally in hectograms
    if (name === "weight") {
      stat = (stat / 10).toString() + "kg";
    }
    titleNode.innerHTML = name.includes("_")
      ? capitalize(name, "_")
      : capitalize(name);
    statNode.innerHTML = stat;
    statNodes.push(titleNode);
    statNodes.push(statNode);
    statsContainer.appendChild(titleNode);
    statsContainer.appendChild(statNode);
  });
}

function capitalize(str, delim = null) {
  if (delim !== null) {
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

function destroyChildNodes(parent, nodeList) {
  if (nodeList.length > 0) {
    nodeList.forEach((node) => {
      parent.removeChild(node);
    });

    nodeList.length = 0;
  }
}

searchButton.addEventListener("click", searchPokemon);
