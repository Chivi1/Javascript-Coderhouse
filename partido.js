//PARTIDO.HTML
const evento = new URLSearchParams(window.location.search).get('event')
console.log("Detalles de " + evento);
partidos = JSON.parse(localStorage.getItem("partidos"));
console.log(partidos)
const partido = partidos.find(p => p.id === parseInt(evento));
console.log(partido)
document.getElementById("titulo").innerHTML = partido.titulo;

let cardArea = document.getElementById("cardElegida");
cardArea.innerHTML = `
<div class="card mb-3 bg-dark text-white" style="max-width: 720px;">
<div class="row g-0">
    <div class="col-md-4">
        <img src="recursos/cards/${partido.id}.png" id ="img" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">${partido.titulo}</h5>
            <p class="card-text">${partido.torneo} - ${partido.fecha}</p>
            <p class="card-text fw-bolder">${partido.esport}</small></p>
            <p class="card-text fw-bolder text-light">$${partido.precio}</small></p>
            <p class="card-text text-success">Entradas disponibles: ${partido.cantidad}</small></p>
        </div>
    </div>
</div>
</div>
`;
const form = document.getElementById("form");
const botonCantidad = document.getElementById("botonCantidad");
const divPrecio = document.getElementById("precioParcial");

botonCantidad.addEventListener("click", (e) => {
    e.preventDefault();
    validarCant();
    sumaEntradas();
});

const botonSiguiente = document.getElementById("botonSi");
const entradaFormArea = document.getElementById("entradasForm");
const botonConfirmar = document.getElementById("botonFin");

const sumaEntradas = () => {
    go()
    const esValido = validarCant();
    if(!esValido)
        return;
    const inputCantidad = document.getElementById("inputCantidad");
    const cantEntradas = inputCantidad.value;
    const precioEvento = partido.precio;
    console.log(cantEntradas);
    localStorage.setItem("cantidad", cantEntradas);
    function multiplicar(a, b) {
        return a * b
    };
    const precio = multiplicar(precioEvento, cantEntradas);
    console.log(precio);
    divPrecio.innerHTML = `
    <div class="mx-auto">
        <p class="card-text fw-bolder text-light m-3 text-center">Total a pagar= $${precio}</p> 
    </div>
    `
    botonConfirmar.style.visibility = "visible";
    domEntradas();
}

const domEntradas = () => {
    const entradas = inputCantidad.value;
    entradaFormArea.innerHTML = `
        <div class="card mb-3 bg-dark text-white" style="max-width: 540px;">
        <div class="row g-0">
                <div class="col-md-4">
                <img src="recursos/iUser.png" class="img-fluid rounded-start" alt="...">
                </div>
            <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${partido.titulo}</h5>
                <p class="card-text">${partido.torneo} - ${partido.fecha}</p>
                <p class="card-text">${entradas} Entradas</p>
                <p class="card-text">Titular</p>
                <form id="formPersona">
                <div class="mb-3">
                    <label for="nombrePersona" class="form-label">Nombre Completo</label>
                    <input type="text" class="form-control" name="nombrePersona" id="nombrePersona" placeholder="Jorge Perez">
                </div>
                <div class="mb-3">
                    <label for="dniPersona" class="form-label">Documento de identidad</label>
                    <input type="text" class="form-control" name="dniPersona" id="dniPersona" placeholder="39378623">
                </div>
                </form>
                <div class="text-danger" id="alerta"></div>
            </div>
        </div>
    </div>
    </div>`
};

botonConfirmar.addEventListener("click", (e) => {
    e.preventDefault();
    confirmarCompra();
});

const confirmarCompra = () => {
    go()
    const esValido = validarForm() && validarCant();
    if(!esValido)
        return;
    let cantEntradas = inputCantidad.value;
    let nombreCompra = document.getElementById("nombrePersona").value;
    let dniCompra = document.getElementById("dniPersona").value;
    let compras = localStorage.getItem("compras");
    if (!compras) {
        //inicializar la primera vez
        compras = [];
        localStorage.setItem('compras', compras);
    } else {
        compras = JSON.parse(compras);
    }
    compras.push({ cantidad: cantEntradas, nombre: nombreCompra, dni: dniCompra })
    localStorage.setItem('compras', JSON.stringify(compras));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Entrada Reservada',
        timer: 1500
    });
    function entradaPdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        //doc.addImage(); //Investigar como se hace 
        doc.text(`  ENTRADA
                        Titular: ${nombreCompra} - DNI: ${dniCompra}
                        Partido: ${partido.titulo}
                        Fecha: ${partido.fecha}
                        Torneo: ${partido.torneo}
                        Cantidad de entradas: ${cantEntradas} (Asiento no numerado)
                        `, 10, 10)
        doc.save("Entrada.pdf");
    };
    entradaPdf();
};



//validaciones
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    cantEntradas: /^\d{1}$/,//un caracter
    dni: /^\d{7,9}$/ //7 a 9 caracteres 
};

// const alerta = document.getElementById("alerta"); -> No podes declarar aca poque solo aparece en el documento una vez que clickeas las entradas
const failConfirmar = (mensaje) => {
    console.log(mensaje)
    alerta = document.getElementById('alerta');
    alerta.classList.remove("text-success");
    alerta.classList.add("text-danger");
    alerta.innerHTML = "Los campos son OBLIGATORIOS. Revisa que se hayan colocado correctamente: \n" + mensaje;
};
const go = () => {
    alerta.innerHTML = '';
};

const formulario = document.getElementById("formPersona");
const inputs = document.querySelectorAll("#formPersona input");
const nombreInput = document.getElementById("nombrePersona");
const dniInput = document.getElementById("dniPersona");

const validarForm = () => {
    const nombre = document.getElementById("nombrePersona");
    if(!nombre.value || !expresiones.nombre.test(nombre.value)){
        failConfirmar("Error nombre")
        return false;
    }
    const dni = document.getElementById("dniPersona");

    if(!dni.value || !expresiones.dni.test(dni.value)){
        failConfirmar("Error DNI")
        return false;
    }
    return true;
};


const validarCant = () => {
    const input = document.getElementById("inputCantidad").value;
    if(input > 1 || input > 9 || input.lenght < 1 || input == 0 ){
        failConfirmar("Error: Cantidad entradas: (solo (1) caracteres del 1 al 9)")
        return false;
    }
    return true;
};