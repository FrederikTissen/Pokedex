let currentPokemon = 0;
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
    document.getElementById('pokedex').innerHTML += templatePokemonCard(type, i);
    renderPokemonInfo(i);
}


function darkMode() {
    for (let i = 1; i < 102; i++) {
        document.getElementById(`pokemon-img-div${i}`).style = '';
    }

   
    removeClassList('moon', 'border-dark');
    removeClassList('sun', 'border-white');
    addClassList('moon', 'border-white')
    addClassList('sun', 'border-dark')
  
    
    document.getElementById('moon').src = './img/moon.png';

    changeStyle('header', '');
    changeStyle('footer', '');
    changeStyle('sun', '');
    changeStyle('logo-font', '');
    changeStyle('start-link', '');
    changeStyle('impressum-link', '');
    changeStyle('pokedex', '');
    /*document.getElementById('header').style = '';
    document.getElementById('footer').style = '';
    document.getElementById('sun').style = '';
    document.getElementById('logo-font').style = '';
    document.getElementById('start-link').style = '';
    document.getElementById('impressum-link').style = '';
    document.getElementById('pokedex').style = '';*/
}

function addClassList(id, cssClass){
    document.getElementById(id).classList.add(cssClass);
}

function removeClassList(id, cssClass){
    document.getElementById(id).classList.remove(cssClass);
}

function changeStyle(id, style){
    document.getElementById(id).style = style;
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

    currentPokemon = allPokemon[i];
    let type = currentPokemon['types'][0]['type']['name'];
    
    document.getElementById('overlay').innerHTML = templateDetailCard(i);
    calculatePokemonWeight(currentPokemon);
    calculatePokemonSize(currentPokemon);

    document.getElementById('detail-card-name').innerHTML = currentPokemon['name'];
    document.getElementById('detail-card-img').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('detail-card-img-div').classList = `detail-card-img-div ${type}-border`;

    document.getElementById('detail-card-type').innerHTML = currentPokemon['types'][0]['type']['name'];
    document.getElementById('detail-card').classList = `detail-card ${type}`;
    checkPokemonType(currentPokemon);
}

function calculatePokemonWeight(currentPokemon){
    let weight = 0;
    weight = currentPokemon['weight'] / 10;
    weight = weight.toString();
    weight = weight.replace(".", ",");
    document.getElementById('weigth').innerHTML = `${weight}kg`;
}

function calculatePokemonSize(currentPokemon){
    let size = 0;
    size = currentPokemon['height'] / 10;
    size = size.toString();
    size = size.replace(".", ",");
    document.getElementById('size').innerHTML = `${size}m`;
}

function checkPokemonType(currentPokemon){
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
    i--;
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('body').classList.add('overflow-hidden');
    renderDetailCard(i);
}

function backwardPokemon(i) {
    i--;
    renderDetailCard(i);
}

function forwardPokemon(i) {
    i++;
    renderDetailCard(i);
}
