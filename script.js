// Lista de palabras relacionadas con la programación web
const palabras = [
    "HTML", "CSS", "JAVASCRIPT", "FRONTEND", "BACKEND", "FRAMEWORK", "API", "DOM", "RESPONSIVE", "DATABASE",
    "SERVER", "HTTP", "URL", "BROWSER", "CODE", "WEB", "DESIGN", "DATABASE", "NODE", "REACT", "VUE", "ANGULAR",
    "BOOTSTRAP", "JSON", "AJAX", "CODIGO", "PROYECTO", "APLICACION", "TECNOLOGIA", "DESARROLLO", "INTERFAZ",
    "USUARIO", "SERVIDOR", "DOMINIO", "ENLACE", "IMAGEN", "TEXTO", "ESTILOS", "FRAMEWORK", "PROGRAMADOR",
    "DESARROLLADOR", "BASESDEDATOS", "RESPONSIVE", "ANIMACION"
];

// Función para generar la sopa de letras
function generarSopaDeLetras() {
    const sopa = document.getElementById("sopa-de-letras");
    sopa.innerHTML = ""; // Limpiar la sopa actual

    const listaPalabras = document.getElementById("lista-palabras");
    listaPalabras.innerHTML = ""; // Limpiar la lista de palabras

    const largo = 20; // Tamaño de la sopa de letras
    const palabrasUnicas = new Set(); // Conjunto para almacenar palabras únicas

    // Barajar las palabras aleatoriamente
    palabras.sort(() => Math.random() - 0.5);

    // Generar la sopa de letras con celdas vacías
    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < largo; j++) {
            const celda = document.createElement("div");
            celda.classList.add("celda");
            sopa.appendChild(celda);
        }
    }

    // Colocar palabras en la sopa y agregarlas a la lista (evitando repeticiones)
    for (const palabra of palabras) {
        if (!palabrasUnicas.has(palabra) && colocarPalabra(sopa, palabra, largo)) {
            palabrasUnicas.add(palabra);
            const li = document.createElement("li");
            li.textContent = palabra;
            listaPalabras.appendChild(li);
        }
    }

    // Rellenar espacios vacíos con letras aleatorias
    const celdas = sopa.getElementsByClassName("celda");
    for (let i = 0; i < celdas.length; i++) {
        if (celdas[i].textContent === "") {
            const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            celdas[i].textContent = randomChar;
        }
    }
}

// Función para colocar una palabra en la sopa de letras
function colocarPalabra(sopa, palabra, largo) {
    const celdas = sopa.getElementsByClassName("celda");
    const direccion = Math.random() < 0.5 ? "horizontal" : "vertical";
    const palabraArray = palabra.split("");

    let x, y;
    if (direccion === "horizontal") {
        x = Math.floor(Math.random() * largo);
        y = Math.floor(Math.random() * (largo - palabraArray.length + 1));
    } else {
        x = Math.floor(Math.random() * (largo - palabraArray.length + 1));
        y = Math.floor(Math.random() * largo);
    }

    // Verificar si la palabra se puede colocar en la dirección
    for (let i = 0; i < palabraArray.length; i++) {
        const index = direccion === "horizontal" ? (x * largo + y + i) : ((x + i) * largo + y);
        const celda = celdas[index];
        if (celda.textContent !== "" && celda.textContent !== palabraArray[i]) {
            return false;
        }
    }

    // Colocar la palabra en la dirección
    for (let i = 0; i < palabraArray.length; i++) {
        const index = direccion === "horizontal" ? (x * largo + y + i) : ((x + i) * largo + y);
        const celda = celdas[index];
        celda.textContent = palabraArray[i];
    }

    return true;
}

// Función para resolver la sopa de letras
function resolverSopa() {
    const sopa = document.getElementById("sopa-de-letras");
    const celdas = sopa.getElementsByClassName("celda");
    const largo = 20;

    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < largo; j++) {
            const index = i * largo + j;
            celdas[index].style.backgroundColor = "transparent";
        }
    }

    palabras.forEach(palabra => {
        if (buscarPalabra(sopa, palabra, largo)) {
            resaltarPalabra(sopa, palabra, largo);
        }
    });
}

function buscarPalabra(sopa, palabra, largo) {
    const celdas = sopa.getElementsByClassName("celda");
    const palabraArray = palabra.split("");

    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < largo; j++) {
            for (const [dx, dy] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
                let coincide = true;
                for (let k = 0; k < palabraArray.length; k++) {
                    const nuevoI = i + k * dx;
                    const nuevoJ = j + k * dy;
                    if (
                        nuevoI < 0 || nuevoI >= largo || nuevoJ < 0 || nuevoJ >= largo ||
                        celdas[nuevoI * largo + nuevoJ].textContent !== palabraArray[k]
                    ) {
                        coincide = false;
                        break;
                    }
                }
                if (coincide) {
                    return true;
                }
            }
        }
    }
    return false;
}

function resaltarPalabra(sopa, palabra, largo) {
    const celdas = sopa.getElementsByClassName("celda");
    const palabraArray = palabra.split("");

    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < largo; j++) {
            for (const [dx, dy] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
                let coincide = true;
                for (let k = 0; k < palabraArray.length; k++) {
                    const nuevoI = i + k * dx;
                    const nuevoJ = j + k * dy;
                    if (
                        nuevoI < 0 || nuevoI >= largo || nuevoJ < 0 || nuevoJ >= largo ||
                        celdas[nuevoI * largo + nuevoJ].textContent !== palabraArray[k]
                    ) {
                        coincide = false;
                        break;
                    }
                }
                if (coincide) {
                    for (let k = 0; k < palabraArray.length; k++) {
                        const nuevoI = i + k * dx;
                        const nuevoJ = j + k * dy;
                        celdas[nuevoI * largo + nuevoJ].style.backgroundColor = "#F178E7";
                    }
                }
            }
        }
    }
}



// Event listener para el botón "Generar Sopa"
const generarButton = document.getElementById("generar-button");
generarButton.addEventListener("click", () => {
    generarSopaDeLetras(); // Generar una nueva sopa de letras
});
// ...


// ...

// Generar la sopa de letras al cargar la página
window.addEventListener("DOMContentLoaded", generarSopaDeLetras);

// Variables para el seguimiento de la selección del usuario
let seleccionActual = [];
let palabraSeleccionada = "";

// Variable para almacenar las palabras encontradas manualmente
let palabrasEncontradasManualmente = [];


// Event listener para hacer clic en una celda de la sopa
document.getElementById("sopa-de-letras").addEventListener("click", (event) => {
    const celda = event.target;

    // Verificar si la celda ya ha sido seleccionada previamente o si la palabra ya ha sido encontrada manualmente
    if (
        !celda.classList.contains("seleccionada") &&
        !celda.classList.contains("palabra-encontrada") &&
        !palabrasEncontradasManualmente.includes(palabraSeleccionada)
    ) {
        // Agregar la celda a la selección actual
        seleccionActual.push(celda);

        // Cambiar el fondo de la celda seleccionada
        celda.classList.add("seleccionada");

        // Obtener la palabra seleccionada actualmente
        palabraSeleccionada = seleccionActual.map(c => c.textContent).join("");

        // Verificar si la palabra seleccionada coincide con alguna palabra de la lista
        if (palabras.includes(palabraSeleccionada)) {
            // Resaltar la palabra en la sopa de letras si es correcta
            resaltarPalabra(document.getElementById("sopa-de-letras"), palabraSeleccionada, 20);

            // Marcar la palabra como encontrada en la lista de palabras
            resaltarPalabraEnLista(palabraSeleccionada);
            celda.classList.add("palabra-encontrada"); // Marcar la celda como parte de una palabra encontrada

            // Agregar la palabra encontrada manualmente a la lista
            palabrasEncontradasManualmente.push(palabraSeleccionada);

            // Desseleccionar la palabra seleccionada
            deseleccionarPalabra();
        }
    } 
    else {
        // Si el usuario hace clic en una celda ya seleccionada o parte de una palabra encontrada, deseleccionarla
        deseleccionarPalabra();
    }

    // Verificar si la palabra seleccionada coincide con alguna palabra de la lista
    if (palabras.includes(palabraSeleccionada)) {
        // Resaltar la palabra en la sopa de letras si es correcta
        resaltarPalabra(document.getElementById("sopa-de-letras"), palabraSeleccionada, 20);
    }
});

// Función para deseleccionar una palabra
function deseleccionarPalabra() {
    for (const celda of seleccionActual) {
        celda.classList.remove("seleccionada");
    }
    seleccionActual = [];
    palabraSeleccionada = "";
}

function resaltarPalabra(sopa, palabra, largo) {
    const celdas = sopa.getElementsByClassName("celda");
    const palabraArray = palabra.split("");

    // Itera a través de las celdas para buscar la palabra
    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < largo; j++) {
            for (const [dx, dy] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
                let coincide = true;
                for (let k = 0; k < palabraArray.length; k++) {
                    const nuevoI = i + k * dx;
                    const nuevoJ = j + k * dy;
                    if (
                        nuevoI < 0 || nuevoI >= largo || nuevoJ < 0 || nuevoJ >= largo ||
                        celdas[nuevoI * largo + nuevoJ].textContent !== palabraArray[k]
                    ) {
                        coincide = false;
                        break;
                    }
                }
                if (coincide) {
                    for (let k = 0; k < palabraArray.length; k++) {
                        const nuevoI = i + k * dx;
                        const nuevoJ = j + k * dy;
                        celdas[nuevoI * largo + nuevoJ].style.backgroundColor = "#F178E7";
                    }
                    // Resalta la palabra en la lista de palabras
                    resaltarPalabraEnLista(palabra);
                    return; // Detiene la búsqueda una vez que se encuentra la palabra
                }
            }
        }
    }
}

// Función para resaltar una palabra en la lista de palabras
function resaltarPalabraEnLista(palabra) {
    const listaPalabras = document.getElementById("lista-palabras");
    const palabrasEnLista = listaPalabras.getElementsByTagName("li");

    for (const palabraEnLista of palabrasEnLista) {
        if (palabraEnLista.textContent === palabra) {
            palabraEnLista.classList.add("palabra-resaltada"); // Agrega la clase para resaltar
            break;
        }
    }
}

let palabrasEncontradasPorUsuario = [];

