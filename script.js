// Lista de palabras relacionadas con la programación web
const palabras = [
    "HTML",
    "CSS",
    "JAVASCRIPT",
    "FRONTEND",
    "BACKEND",
    "FRAMEWORK",
    "API",
    "DOM",
    "RESPONSIVE",
    "DATABASE",
    "SERVER",
    "HTTP",
    "URL",
    "BROWSER",
    "CODE",
    "WEB",
    "DESIGN",
    "DATABASE",
    "NODE",
    "REACT",
    "VUE",
    "ANGULAR",
    "BOOTSTRAP",
    "JSON",
    "AJAX"
];

// Función para generar la sopa de letras
function generarSopaDeLetras() {
    const sopa = document.getElementById("sopa-de-letras");
    sopa.innerHTML = ""; // Limpiar la sopa actual

    const listaPalabras = document.getElementById("lista-palabras");
    listaPalabras.innerHTML = ""; // Limpiar la lista de palabras

    const largo = 15; // Tamaño de la sopa de letras

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

    // Colocar palabras en la sopa y agregarlas a la lista
    for (const palabra of palabras) {
        if (!colocarPalabra(sopa, palabra)) {
            console.log(`No se pudo colocar la palabra: ${palabra}`);
        } else {
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
function colocarPalabra(sopa, palabra) {
    const celdas = sopa.getElementsByClassName("celda");
    const largo = 15;
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
    const largo = 15;

    for (let i = 0; i < largo; i++) {
        for (let j = 0; j < largo; j++) {
            const index = i * largo + j;
            celdas[index].style.backgroundColor = "transparent";
        }
    }

    palabras.forEach(palabra => {
        if (buscarPalabra(sopa, palabra)) {
            resaltarPalabra(sopa, palabra);
        }
    });
}

function buscarPalabra(sopa, palabra) {
    const celdas = sopa.getElementsByClassName("celda");
    const palabraArray = palabra.split("");
    const largo = 15;

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

function resaltarPalabra(sopa, palabra) {
    const celdas = sopa.getElementsByClassName("celda");
    const palabraArray = palabra.split("");
    const largo = 15;

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
                        celdas[nuevoI * largo + nuevoJ].style.backgroundColor = "yellow";
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

// Event listener para el botón "Resolver Sopa"
const resolverButton = document.getElementById("resolver-button");
resolverButton.addEventListener("click", () => {
    resolverSopa();
});

// Generar la sopa de letras al cargar la página
window.addEventListener("DOMContentLoaded", generarSopaDeLetras);