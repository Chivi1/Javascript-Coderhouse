//PARTIDO.HTML
const evento = new URLSearchParams(window.location.search).get('event')
console.log("Detalles de " + evento);

fetch('partidos.json')
                    .then(res => res.json())
                    .then(data => {
                        const partidos = data
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
                        botonCantidad.addEventListener("click", (e) => {
                            e.preventDefault();
                            validarCant();
                            sumaEntradas();
                        });
                        botonConfirmar.addEventListener("click", (e) => {
                            e.preventDefault();
                            confirmarCompra();
                            mostrarCompra();
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
                            compras.push({ cantidad: cantEntradas, nombre: nombreCompra, dni: dniCompra, titulo: partido.titulo })
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
                    })   
                    .catch(error => console.log("ERROR"));

const form = document.getElementById("form");
const botonCantidad = document.getElementById("botonCantidad");
const divPrecio = document.getElementById("precioParcial");

const botonSiguiente = document.getElementById("botonSi");
const entradaFormArea = document.getElementById("entradasForm");
const botonConfirmar = document.getElementById("botonFin");

const listaHistorial = document.getElementById("listaHistorial");
const historial = document.getElementById("historial");


const mostrarCompra = () => {
    let comprasDom = localStorage.getItem("compras");
    let comprasPrint = JSON.parse(comprasDom);
    comprasPrint.forEach(compra => {
        historial.style.visibility = "visible";
        listaHistorial.innerHTML += `
                            <li>
                                <div class="mb-3">
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between text-center">
                                        <h5 class="mb-1">${compra.titulo}</h5>
                                    </div>
                                    <p class="mb-1">${compra.nombre} - ${compra.dni}</p>
                                    <small class="text-muted">Cantidad de entradas: ${compra.cantidad}</small>
                                </a>
                                </div>
                            </li>    
        `
    });
}

//validaciones
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    cantEntradas: /^\d{1}$/,//un caracter
    dni: /^\d{7,9}$/ //7 a 9 caracteres 
};


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
    const input = document.getElementById("inputCantidad");
    if(input.value > 1 && input.value > 9 || input.value == 0){
        failConfirmar("Error: Cantidad entradas: (solo (1) caracteres del 1 al 9)")
        return false;
    }
    return true;
};
