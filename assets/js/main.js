const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}
// Seleciona os elementos do pop up
const popup = document.querySelector('#popup');
const close = document.querySelector('#close');
const description = document.querySelector('#description');
// Função para mostrar o pop up e exibir a descrição do pokémon
function showPopup(pokemon) {
    // Faz uma requisição para obter os dados do pokémon
    getPokemonData("pokemon/" + pokemon)
      .then((data) => {
        // Altera o estilo do pop up para torná-lo visível
        popup.style.display = "block";
        // Altera o texto do parágrafo para mostrar a descrição do pokémon
        description.innerText = `Este é ${data.name}, um pokémon do tipo ${data.types[0].type.name}. Ele tem ${data.height} decímetros de altura e ${data.weight} gramas de peso.`;
      })
      .catch((error) => {
        // Exibe o erro no console
        console.error(error);
      });
  }
// Função para fechar o pop up e limpar a descrição do pokémon
function closePopup() {
    // Altera o estilo do pop up para torná-lo oculto
    popup.style.display = "none";
    // Altera o texto do parágrafo para uma string vazia
    description.innerText = "";
  }
// Seleciona todas as imagens dos pokémons
const images = document.querySelectorAll('.pokemon img');
// Percorre todas as imagens
images.forEach(function(image) {
  // Adiciona um evento de clique à imagem
  image.addEventListener('click', function() {
    // Obtém o nome do pokémon a partir do atributo 'alt' da imagem
    const name = image.getAttribute('alt');
    // Chama a função showPopup passando o nome do pokémon como argumento
    showPopup(name);
  });
});

// Adiciona um evento de clique ao botão de fechar
close.addEventListener('click', function() {
  // Chama a função closePopup
  closePopup();
});
    
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})