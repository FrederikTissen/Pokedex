let currentPokemon;
let allPokemon = [];

async function loadPokemon() {
    for (let i = 1; i < 102; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        
        allPokemon.push(currentPokemon);
        renderPokemonCard(i);
    }
    console.log('Loaded Pokemon', allPokemon);
    
}




function renderPokemonInfo(i) {
    document.getElementById(`pokemon-name${i}`).innerHTML = currentPokemon[`name`];
    document.getElementById(`pokemon-img${i}`).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById(`type${i}`).innerHTML = currentPokemon['types'][0]['type']['name'];
}

function renderPokemonCard(i) {
    document.getElementById('pokedex').innerHTML += ` <div id="pokemon-card" class="pokemon-card">
    <h2 class="card-name" id="pokemon-name${i}">Name</h2>
    <div class="card-box">
        <div class="pokemon-img-div">
            <img class="pokemon-img" id="pokemon-img${i}" src=""></img>
        </div>
        <div id="type-card${i}" class="type-card">
            <p id="type${i}" class="type"></p>
        </div>
    </div>
</div>`

renderPokemonInfo(i);
}

function renderPokedex(){

}
