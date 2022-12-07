let currentPokemon;
let allPokemon = [];



function init() {
    loadPokemon();
    //darkMode();
}

async function loadPokemon() {
    for (let i = 1; i < 102; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        allPokemon.push(currentPokemon);
        showDetailCard(i);
        //renderPokemonCard(i);

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

    document.getElementById('pokedex').innerHTML += /*html*/ ` <div onclick="showDetailCard(${i})" id="pokemon-card${i}" class="pokemon-card ${type}">
    <h2 class="card-name" id="pokemon-name${i}">Name</h2>
    <div class="card-box">
        <div id="pokemon-img-div${i}" class="pokemon-img-div" >
            <img class="pokemon-img" id="pokemon-img${i}" src="" >
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
    for (let i = 1; i < 102; i++) {
        document.getElementById(`pokemon-img-div${i}`).style = '';
    }

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

    for (let i = 1; i < 102; i++) {
        document.getElementById(`pokemon-img-div${i}`).style = 'background-color: #efefef;';
    }

    document.getElementById('moon').src = './img/moon-dark.png';
    document.getElementById('header').style = 'background-color: #efefef; !important';
    document.getElementById('footer').style = 'background-color: #efefef; !important';
    document.getElementById('sun').style = 'background-color: black; !important';
    document.getElementById('logo-font').style = 'color: black; !important';
    document.getElementById('start-link').style = 'color: black; !important';
    document.getElementById('impressum-link').style = 'color: black; !important';
    document.getElementById('pokedex').style = 'background-color: white; !important';
}

function renderDetailCard(i) {
    i--;
    currentPokemon = allPokemon[i];
    let type = currentPokemon['types'][0]['type']['name'];
    let size = 0;
    size = currentPokemon['height'] / 10;
    size = size.toString();
    size = size.replace(".", ",");

    let weight = 0;
    weight = currentPokemon['weight'] / 10;
    weight = weight.toString();
    weight = weight.replace(".", ",");

    document.getElementById('detail-card-name').innerHTML = currentPokemon['name'];
    document.getElementById('detail-card-img').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('detail-card-img-div').classList = `detail-card-img-div ${type}-border`;

    document.getElementById('detail-card-type').innerHTML = currentPokemon['types'][0]['type']['name'];
    document.getElementById('detail-card').classList = `detail-card ${type}`;
    document.getElementById('weigth').innerHTML = `${weight}kg`;
    document.getElementById('size').innerHTML = `${size}m`;



    if (currentPokemon['types'][1]) {
        document.getElementById('detail-card-type2').innerHTML = currentPokemon['types'][1]['type']['name'];
        document.getElementById('detail-card-type2').classList = `type ${currentPokemon['types'][1]['type']['name']}`;
        document.getElementById('detail-card-type-box').style = 'justify-content: space-between; !important';

    } else {
        document.getElementById('detail-card-type2').classList = 'type d-none';
        document.getElementById('detail-card-type-box').style = 'justify-content: center; !important';

    }
}

function showDetailCard(i) {


    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('body').classList.add('overflow-hidden');


    renderDetailCard(i);
}
