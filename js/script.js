const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '#';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        //pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; imagens animadas incompletas
        pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = ':(';
        input.value = '';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);

btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});