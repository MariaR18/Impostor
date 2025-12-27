// Estado del juego
let roles = [];       // array con "impostor" o "jugador"
let turn = 0;         // índice del jugador actual
const words = [
    // Países fáciles (tema)
    "España",
    "Francia",
    "Italia",
    "Reino Unido",
    "México",
    "Argentina",
    "Estados Unidos",
    "China",
    "Alemania",
    "Rusia",
    // Ciudades españolas (tema)
    "Madrid",
    "Barcelona",
    "Valencia",
    "Zaragoza",
    "Granada",
    "Alicante",
    "Sevilla",

    // Asignaturas colegio (tema)
    "Matemáticas",
    "Lengua",
    "Historia",
    "Inglés",
    "Educación Física",
    "Música",

    // Marcas de alcohol o tipos (tema)
    "Vodka",
    "Ginebra",
    "Ron",
    "Tequila",
    "Cerveza",
    "Vino blanco",
    "Jagger",

    // Palabras literales
    "Fabrica",
    "Coco Loco",
    "Tiki bar",
    "Falkata",
    "Nochevieja",
    "Fallas",

    // Animales (tema)
    "Perro",
    "Gato",
    "León",
    "Caballo",
    "Delfín",
    "Águila",
    "Mono",
    "Conejo",
    "Loro",
    "Tortuga",
    "Rinoceronte",
    "Pingüino",



    // Muebles (tema)
    "Sofá",
    "Mesa",
    "Silla",
    "Cama",

    // Palabras literales
    "Regalo",
    "Chimenea",
    "Bombero",
    "Universidad",

    // Telecinco programas (tema)
    "Supervivientes",
    "First Dates",
    "La Isla de las Tentaciones",

    // Palabras literales
    "La que se avecina",
    "Kebab",
    "Piscina",
    "Marxuquera",
    "Hotel",
    "Coche",
    "Calvo",
    "Televisión",
    "Disney",
    "Jamón",
    "Copa",
    "Futbolista",
    "Despedida de soltero",
    "Boda",
    "Cámara",
    "Glaciar",
    "Llave",
    "Gimnasio"
];

let currentWord = "";
; // por ahora fija (luego la haremos aleatoria)

// Elementos del DOM
const setupSection = document.getElementById("setup");
const revealSection = document.getElementById("reveal");
const doneSection = document.getElementById("done");

const playersInput = document.getElementById("players");
const impostorsInput = document.getElementById("impostors");

const startBtn = document.getElementById("startBtn");
const setupError = document.getElementById("setupError");

const turnTitle = document.getElementById("turnTitle");
const revealBtn = document.getElementById("revealBtn");
const secretBox = document.getElementById("secret");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

function shuffle(array) {
    // Mezcla Fisher-Yates (mejor que sort random)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function show(section) {
    setupSection.classList.add("hidden");
    revealSection.classList.add("hidden");
    doneSection.classList.add("hidden");
    section.classList.remove("hidden");
}

function resetRevealUI() {
    secretBox.classList.add("hidden");
    nextBtn.classList.add("hidden");
    revealBtn.classList.remove("hidden");
    secretBox.textContent = "";
    secretBox.textContent = "📱 Pasa el móvil al siguiente jugador";

}

function startGame() {
    const players = Number(playersInput.value);
    const impostors = Number(impostorsInput.value);

    // Validaciones básicas
    if (!Number.isInteger(players) || players < 3) {
        setupError.textContent = "Mínimo 3 jugadores.";
        return;
    }
    if (!Number.isInteger(impostors) || impostors < 1) {
        setupError.textContent = "Mínimo 1 impostor.";
        return;
    }
    if (impostors >= players) {
        setupError.textContent = "Los impostores deben ser menos que los jugadores.";
        return;
    }

    setupError.textContent = "";

    // Crear roles: (players - impostors) jugadores + impostors impostores
    roles = [
        ...Array(players - impostors).fill("jugador"),
        ...Array(impostors).fill("impostor"),
    ];
    shuffle(roles);

    currentWord = words[Math.floor(Math.random() * words.length)];


    turn = 0;
    updateTurnScreen();
    show(revealSection);
}

function updateTurnScreen() {
    turnTitle.textContent = `Jugador ${turn + 1} — Eres...`;
    resetRevealUI();
}

function revealRole() {
    const role = roles[turn];
    if (role === "impostor") {
        secretBox.textContent = "🕵️‍♂️ IMPOSTOR 😈\n(suerte)";
    } else {
        secretBox.textContent = `✅ JUGADOR.\nTu palabra es: ${currentWord}`;
    }

    secretBox.classList.remove("hidden");
    revealBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");

    // Vibración si el móvil lo soporta
    if (navigator.vibrate) navigator.vibrate(80);
}

function nextPlayer() {
    turn++;
    if (turn >= roles.length) {
        show(doneSection);
        return;
    }
    updateTurnScreen();
}

function restart() {
    roles = [];
    turn = 0;
    show(setupSection);
}

// Eventos
startBtn.addEventListener("click", startGame);
revealBtn.addEventListener("click", revealRole);
nextBtn.addEventListener("click", nextPlayer);
restartBtn.addEventListener("click", restart);
