// Configurar la fecha objetivo (Año, Mes [0 al 11], Día, Hora, Minutos, Segundos)
// Nota: En JS los meses van de 0 a 11 (0 = Enero, 8 = Septiembre, 11 = Diciembre).
const birthdayDate = new Date(2026, 8, 10, 0, 0, 0).getTime();

// --- 1. ELEMENTOS DE AUDIO Y VIDEO ---
const bgMusic = document.getElementById('bg-music');
const videoElement = document.querySelector('video');

// Función para iniciar la música de fondo
function playBackgroundMusic() {
    if (bgMusic && bgMusic.paused) {
        bgMusic.volume = 0.5; // Volumen al 50%
        bgMusic.play().catch(error => {
            console.log("El navegador bloqueó el autoplay hasta la interacción:", error);
        });
    }
}

// Pausar música cuando el video de recuerdos se reproduzca
if (videoElement) {
    videoElement.addEventListener('play', () => {
        if (bgMusic) bgMusic.pause();
    });

    videoElement.addEventListener('pause', () => {
        if (bgMusic) bgMusic.play();
    });
}

// --- 2. GENERADOR DE DESTELLOS DORADOS ---
function createSparkles() {
    const container = document.getElementById('gold-sparkles-container');
    if (!container) return;
    
    const sparkleCount = 35; // Cantidad de destellos flotantes

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Tamaños aleatorios
        const size = Math.random() * 6 + 2; 
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Posiciones horizontales y retrasos aleatorios
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 5}s`;
        sparkle.style.animationDuration = `${Math.random() * 4 + 4}s`;

        container.appendChild(sparkle);
    }
}
createSparkles();

// --- 3. RELOJ DE CUENTA REGRESIVA ---
function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    if (distance <= 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- 4. NAVEGACIÓN ENTRE SECCIONES ---
function switchSection(currentId, nextId) {
    const currentSec = document.getElementById(currentId);
    const nextSec = document.getElementById(nextId);

    currentSec.classList.add('hidden');
    setTimeout(() => {
        nextSec.classList.remove('hidden');
    }, 300);
}

// --- 5. EVENTOS DE BOTONES Y VALIDACIÓN ---
document.getElementById('btn-open-gift').addEventListener('click', () => {
    // Intentar reproducir la música con la primera interacción
    playBackgroundMusic();

    const now = new Date().getTime();

    // Si aún no ha llegado la fecha y hora elegida:
    if (now < birthdayDate) {
        const btn = document.getElementById('btn-open-gift');
        const originalText = btn.innerText;
        
        // Muestra un mensaje temporal en el botón
        btn.innerText = "🔒 ¡AÚN NO ES EL MOMENTO! 🔒";
        btn.style.borderColor = "#ff6b6b";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.borderColor = "var(--border-color)";
        }, 2000);

        return; // Detiene la función para NO pasar a la siguiente sección
    }

    // Si ya llegó el momento, abre el regalo
    switchSection('sec-countdown', 'sec-letter');
});

document.getElementById('btn-to-memories').addEventListener('click', () => {
    playBackgroundMusic();
    switchSection('sec-letter', 'sec-memories');
});

document.getElementById('btn-to-video').addEventListener('click', () => {
    playBackgroundMusic();
    switchSection('sec-memories', 'sec-video');
});