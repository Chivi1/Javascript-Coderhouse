fetch('partidos.json')
                    .then(res => res.json())
                    .then(data => {
                        const partidos = data
                        partidos.forEach((item) => template += buildTemplate(item));
                        listaPartidos.innerHTML = template;
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
                        
                    })   
                    .catch(error => console.log("ERROR"));


const inputBuscador = document.getElementById("buscador");
const botonBuscador = document.querySelector("#buscar")
const listaPartidos = document.getElementById("listaPartidos");


//template para las cards de cada evento 
let template = "";

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
};




