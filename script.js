
let currentPokemon = 0;
let allPokemon = [];
let pokemonName;
let pokemonImg;
let type;
let type2;
let weight = 0;
let size = 0;
let abilities;
let stats;
let moves;


let darkModeStatus = 0;



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
        updateGlobalVariables();

        renderPokemonCard(i);
        //showDetailCard(i);
    }
    console.log('Loaded Pokemon', allPokemon);

}




function renderPokemonInfo(i) {

    document.getElementById(`pokemon-name${i}`).innerHTML = pokemonName;
    document.getElementById(`pokemon-img${i}`).src = pokemonImg;
    document.getElementById(`type${i}`).innerHTML = type;
    if (type2) {
        document.getElementById(`type2-${i}`).innerHTML = type2;
        document.getElementById(`type2-${i}`).classList = `type ${type2}`;

    } else {
        document.getElementById(`type2-${i}`).classList = 'type d-none';
    }
}

function renderPokemonCard(i) {
    document.getElementById('pokedex').innerHTML += templatePokemonCard(type, i);
    renderPokemonInfo(i);
}


function darkMode() {
    if (darkModeStatus == 1) {
        darkModeStatus = darkModeStatus - 1
    }

    changeStyleForDarkMode();
    changeCssClassForDarkMode()
    changeSource('moon', './img/moon.png')
}

function changeCssClassForDarkMode() {
    removeClassList('moon', 'border-dark');
    removeClassList('sun', 'border-white');
    addClassList('moon', 'border-white');
    addClassList('sun', 'border-dark');
}

function changeStyleForDarkMode() {
    for (let i = 1; i < 102; i++) {
        changeStyle(`pokemon-img-div${i}`, '');
    }
    changeStyle('header', '');
    changeStyle('footer', '');
    changeStyle('sun', '');
    changeStyle('logo-font', '');
    changeStyle('start-link', '');
    changeStyle('impressum-link', '');
    changeStyle('pokedex', '');
}

function addClassList(id, cssClass) {
    document.getElementById(id).classList.add(cssClass);
}

function removeClassList(id, cssClass) {
    document.getElementById(id).classList.remove(cssClass);
}

function changeStyle(id, style) {
    document.getElementById(id).style = style;
}

function changeSource(id, src) {
    document.getElementById(id).src = src;
}


function darkModeOff() {
    darkModeStatus = darkModeStatus + 1;
    changeStyleForDarkModeOff();
    changeSource('moon', './img/moon-dark.png')
}

function changeStyleForDarkModeOff() {
    for (let i = 1; i < 102; i++) {
        changeStyle(`pokemon-img-div${i}`, 'background-color: #efefef;');
    }
    changeStyle('header', 'background-color: #efefef; !important;');
    changeStyle('footer', 'background-color: #efefef; !important;');
    changeStyle('sun', 'background-color: black; !important;');
    changeStyle('logo-font', 'color: black; !important;');
    changeStyle('start-link', 'color: black; !important;');
    changeStyle('impressum-link', 'color: black; !important;');
    changeStyle('pokedex', 'background-color: white; !important;');
}



function renderDetailCard(i) {

    currentPokemon = allPokemon[i];
    updateGlobalVariables(i);

    document.getElementById('overlay').innerHTML = templateDetailCard(i);
    calculatePokemonWeight();
    calculatePokemonSize();
    checkDarkModeInDetailCard();

    document.getElementById('detail-card-name').innerHTML = pokemonName;
    document.getElementById('detail-card-img').src = pokemonImg;
    document.getElementById('detail-card-img-div').classList = `detail-card-img-div ${type}-border`;

    document.getElementById('detail-card-type').innerHTML = type;
    document.getElementById('detail-card').classList = `detail-card ${type}`;
    checkPokemonType();
    renderStats();
    drawChart();
}

function renderStats() {
    document.getElementById('detail-card-content').innerHTML = '';
    document.getElementById('stats').classList = `stats ${type}-underline`;
    document.getElementById('moves').classList = 'moves';



    document.getElementById('detail-card-content').innerHTML = /*html*/ `
    <div class="abilitiy-box">
        <h3 class="margin-0">Abilities</h3>
            <div id="abilities" class="abilities"></div>
        <div>
        <h3 class="margin-0">Stats</h3>
            <div id="stats" class="stats"></div>
        <div>
            <canvas id="myChart"></canvas>
        </div>
</div>`
    renderAbilities();
}

function renderMoves() {
    document.getElementById('detail-card-content').innerHTML = '';
    document.getElementById('moves').classList = `moves ${type}-underline`;
    document.getElementById('stats').classList = 'stats';

    document.getElementById('detail-card-content').innerHTML = /*html*/ `
    <div id="move-box" class="move-box">
        <h3 >Moves</h3>
</div>`
    for (let i = 0; i < moves.length; i++) {
        document.getElementById('move-box').innerHTML += /*html*/ `
        ${moves[i]['move']['name']}, &nbsp; `
    }
}


function renderAbilities() {
    for (let i = 0; i < abilities.length; i++) {
        document.getElementById('abilities').innerHTML += /*html*/ `
       <p>  ${abilities[i]['ability']['name']}, &nbsp; </p>`
    }
}

function checkDarkModeInDetailCard() {

    if (darkModeStatus == 1) {
        changeStyle('detail-card-img-div', 'background-color: rgb(239, 239, 239); !important;');
        changeStyle('detail-card-box', 'background-color: rgb(239, 239, 239); !important;');
    } else {
        changeStyle('detail-card-img-div', '');
        changeStyle('detail-card-box', '');
    }
}

function updateGlobalVariables() {
    pokemonName = currentPokemon['name'];
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    pokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    type = currentPokemon['types'][0]['type']['name'];
    if (currentPokemon['types'][1]) {
        type2 = currentPokemon['types'][1]['type']['name'];
    } else {
        type2 = '';
    }
    weight = currentPokemon['weight'];
    size = currentPokemon['height'];
    abilities = currentPokemon['abilities'];
    stats = currentPokemon['stats'];
    moves = currentPokemon['moves'];
}

function calculatePokemonWeight() {
    weight = weight / 10;
    weight = weight.toString();
    weight = weight.replace(".", ",");
    document.getElementById('weigth').innerHTML = `${weight}kg`;
}

function calculatePokemonSize() {
    size = size / 10;
    size = size.toString();
    size = size.replace(".", ",");
    document.getElementById('size').innerHTML = `${size}m`;
}

function checkPokemonType() {
    if (type2) {
        document.getElementById('detail-card-type2').innerHTML = type2;
        loadClassList('detail-card-type2', `type ${type2}`);
        changeStyle('detail-card-type-box', 'justify-content: space-between; !important');
    } else {
        loadClassList('detail-card-type2', 'type d-none');
        changeStyle('detail-card-type-box', 'justify-content: center; !important');
    }
}

function loadClassList(id, cssClass) {
    document.getElementById(id).classList = cssClass;
}

function showDetailCard(i) {
    i--;
    removeClassList('overlay', 'd-none');
    addClassList('body', 'overflow-hidden');
    renderDetailCard(i);
}

function backwardPokemon(i) {
    if (i == 0) {
        i = allPokemon.length - 1
    } else {
        i--;
    }
    renderDetailCard(i);
}

function forwardPokemon(i) {
    if (i == allPokemon.length - 1) {
        i = 0;
    } else {
        i++;
    }

    renderDetailCard(i);
}

function closeDetailCard() {
    addClassList('overlay', 'd-none');
    removeClassList('body', 'overflow-hidden');
}
