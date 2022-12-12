function templatePokemonCard(type, i) {
    return /*html*/ `
    <div onclick="showDetailCard(${i})" id="pokemon-card${i}" class="pokemon-card ${type}">
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
}

function templateDetailCard(i) {
    return /*html*/ `
    <div id="detail-card" class=" ">
    <h1 class="detail-card-name margin-10 color-white" id="detail-card-name">Name</h1>
    <div id="detail-card-type-box" class="detail-card-type-box">
        <p id="detail-card-type" class="type color-white"></p>
        <p id="detail-card-type2" class="type color-white"></p>
    </div>
    <div id="size-box" class="size-box">
        <p id="size" class="size"></p>
        <p id="weigth" class="weigth"></p>
    </div>

    <div id="change-pokemon" class="change-pokemon">
        <img onclick="backwardPokemon(${i})" id="turn-left" class="turn-left-png" src="./img/winkel-links.png">
        <img onclick="forwardPokemon(${i})" id="turn-right" class="turn-right-png" src="./img/winkel-rechts.png">
    </div>

    <div id="detail-card-img-div" class="detail-card-img-div">
        <img class="detail-card-img" id="detail-card-img" src="" alt="">
    </div>

    <div id="detail-card-box" class="detail-card-box">
        <div class="stats-move-bar">
            <p onclick="renderStats(), drawChart()" id="stats" class="stats ">Stats</p>
            <p onclick="renderMoves()" id="moves" class="moves">Moves</p>
        </div>

        <div id="detail-card-content" class="detail-card-content">

        </div>

    </div>
    <img onclick="closeDetailCard()" class="close-icon" src="./img/close-icon.png" alt="">

</div>`
}