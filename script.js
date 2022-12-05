let currentPokemon;
let allPokemon = [];


function init(){
    loadPokemon();
    darkMode();
}

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
    if (currentPokemon['types'][1]) {
        document.getElementById(`type2-${i}`).innerHTML = currentPokemon['types'][1]['type']['name'];
        document.getElementById(`type2-${i}`).classList = `type ${currentPokemon['types'][1]['type']['name']}`;

    } else {
        document.getElementById(`type2-${i}`).classList = 'type d-none';

    }
}

function renderPokemonCard(i) {
    let type = currentPokemon['types'][0]['type']['name'];

    document.getElementById('pokedex').innerHTML += /*html*/ ` <div id="pokemon-card${i}" class="pokemon-card ${type}">
    <h2 class="card-name" id="pokemon-name${i}">Name</h2>
    <div class="card-box">
        <div class="pokemon-img-div">
            <img class="pokemon-img" id="pokemon-img${i}" src="" alt="">
        </div>
        <div id="type-card${i}" class="type-card">
            <p id="type${i}" class="type"></p>
            <p id="type2-${i}" class="type "></p>
        </div>
    </div>
</div>`


    renderPokemonInfo(i);
}


function darkMode() {
    document.getElementById('moon').classList.add('border-white');
    document.getElementById('moon').classList.remove('border-dark');

    document.getElementById('sun').classList.remove('border-white');
    document.getElementById('sun').classList.add('border-dark');
    document.getElementById('moon').src = './img/moon.png';


    
    document.getElementById('header').style = '';
    document.getElementById('footer').style = '';
    document.getElementById('sun').style = '';
    document.getElementById('logo-font').style = '';
    document.getElementById('start-link').style = '';
    document.getElementById('impressum-link').style = '';
    document.getElementById('pokedex').style = '';

}

function darkModeOff() {


   
    //document.getElementById('moon').style = 'background-color: black; !important';
    document.getElementById('moon').src = './img/moon-dark.png';





    
    

    document.getElementById('header').style = 'background-color: #efefef; !important';
    document.getElementById('footer').style = 'background-color: #efefef; !important';
    document.getElementById('sun').style = 'background-color: black; !important';
    document.getElementById('logo-font').style = 'color: black; !important';
    document.getElementById('start-link').style = 'color: black; !important';
    document.getElementById('impressum-link').style = 'color: black; !important';
    document.getElementById('pokedex').style = 'background-color: white; !important';
    





}
