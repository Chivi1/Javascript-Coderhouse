const partidosStr = `[
    {
        "id":1,
        "torneo":"The Last Legends",
        "titulo":"BLACKTAIL vs MAYCAM EVOLVE",
        "fecha": "24 de septiembre",
        "precio": 1200,
        "esport": "League of Legends",
        "disponibles": true,
        "cantidad": 10
    },
    {
        "id":2,
        "torneo":"Valorant Champions",
        "titulo":"BLACKTAIL vs 9Z",
        "fecha": "16 de septiembre",
        "precio": 1500,
        "esport": "VALORANT",
        "disponibles": true,
        "cantidad": 15
    },
    {
        "id":3,
        "torneo":"Rocket League Championship",
        "titulo":"BLACKTAIL vs G2 ESPORTS",
        "fecha": "30 de septiembre",
        "precio": 900,
        "esport": "Rocket League",
        "disponibles": true,
        "cantidad": 10
    },
    {
        "id":4,
        "torneo":"Rocket League Championship",
        "titulo":"BLACKTAIL vs TEAM QUESO",
        "fecha": "1 de Octubre",
        "precio": 900,
        "esport": "Rocket League",
        "disponibles": true,
        "cantidad": 10
    }
]`
localStorage.setItem("partidos", partidosStr);
const partidos = JSON.parse(partidosStr);
console.log(partidos);
const inputBuscador = document.getElementById("buscador");
const botonBuscador = document.querySelector("#buscar")
const listaPartidos = document.getElementById("listaPartidos");

const filtrar = () => {
    console.log(inputBuscador.value);
    const filtered = partidos.filter(x => x.titulo.toLowerCase().includes(inputBuscador.value.toLowerCase()));
    let template = "";
    console.log(filtered);
    filtered.forEach((item) => template += buildTemplate(item));
    listaPartidos.innerHTML = template;
}
botonBuscador.addEventListener("click", filtrar);
inputBuscador.addEventListener("keyup", filtrar);

//template para las cards de cada evento 
let template = "";
partidos.forEach((item) => template += buildTemplate(item));
listaPartidos.innerHTML = template;

function buildTemplate(item) {
    return `
    <li>
    <div class="mb-4 me-3">
    <div class= "row row-cols-1 row-cols-md-2 g-4 bg-dark" id="evento" onClick="navigateToEvent(${item.id})">
    <img src="recursos/portadas/${item.id}.png"  class="card-img-top"></img> 
        <div class="card-body m-3">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">${item.fecha} - ${item.torneo} - ${item.esport}</p>
            <p class="card-text text-success fw-bolder">$${item.precio}</p>
            <button name="button" id="button" type="button" value="Input" class="btn btn-secondary">TICKETS</button>
        </div>
    </div>
    </div>
    </li>
    `
}
function navigateToEvent(id) {
    console.log(id);
    window.location = "partido.html?event=" + id
}
//card elegida => data => localstorage => partido.html




