// ========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    cargarConfiguracion();
    iniciarCuentaRegresiva();
    configurarAnimaciones();
    configurarMusica();
});

// ========================================
// CARGAR CONFIGURACIÓN
// ========================================

function cargarConfiguracion() {
    // Nombres
    document.getElementById('nombresNovios').textContent = CONFIG.nombres;
    document.getElementById('footerNombres').textContent = CONFIG.nombres;

    // Fecha
    document.getElementById('fechaBoda').textContent = CONFIG.fechaTexto;

    // Ceremonia Civil
    document.getElementById('nombreCeremonia').textContent = CONFIG.nombreCeremonia;
    document.getElementById('horaCeremonia').textContent = CONFIG.horaCeremonia;
    document.getElementById('direccionCeremonia').textContent = CONFIG.direccionCeremonia;
    document.getElementById('imagenCeremonia').src = CONFIG.imagenCeremonia;
    document.getElementById('btnMapsCeremonia').href = CONFIG.urlMapsCeremonia;

    // Lugar de Celebración
    document.getElementById('nombreCelebracion').textContent = CONFIG.nombreCelebracion;
    document.getElementById('horaCelebracion').textContent = CONFIG.horaCelebracion;
    document.getElementById('direccionCelebracion').textContent = CONFIG.direccionCelebracion;
    document.getElementById('imagenCelebracion').src = CONFIG.imagenCelebracion;
    document.getElementById('btnMapsCelebracion').href = CONFIG.urlMapsCelebracion;

    // Mensaje
    document.getElementById('mensajePrincipal').textContent = CONFIG.mensajePrincipal;

    // Historia
    document.getElementById('textoHistoria').textContent = CONFIG.historia;

    // Imágenes
    document.querySelector('.portada').style.backgroundImage = `url('${CONFIG.imagenPortada}')`;
    document.getElementById('imagenPareja').src = CONFIG.imagenPareja;

    // WhatsApp
    const urlWhatsAppAntonio = `https://wa.me/${CONFIG.whatsappAntonio}?text=${encodeURIComponent(CONFIG.textoWhatsApp)}`;
    const urlWhatsAppElena = `https://wa.me/${CONFIG.whatsappElena}?text=${encodeURIComponent(CONFIG.textoWhatsApp)}`;
    document.getElementById('btnConfirmarAntonio').href = urlWhatsAppAntonio;
    document.getElementById('btnConfirmarElena').href = urlWhatsAppElena;
}

// ========================================
// CUENTA REGRESIVA
// ========================================

function iniciarCuentaRegresiva() {
    const fechaEvento = new Date(CONFIG.fechaEvento).getTime();

    function actualizarContador() {
        const ahora = new Date().getTime();
        const diferencia = fechaEvento - ahora;

        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            document.getElementById('dias').textContent = dias;
            document.getElementById('horas').textContent = horas;
            document.getElementById('minutos').textContent = minutos;
            document.getElementById('segundos').textContent = segundos;
        } else {
            document.getElementById('dias').textContent = '0';
            document.getElementById('horas').textContent = '0';
            document.getElementById('minutos').textContent = '0';
            document.getElementById('segundos').textContent = '0';

            // Opcional: Mostrar mensaje de que el evento ya pasó
            document.querySelector('.cuenta-regresiva h2').textContent = '¡El gran día ha llegado!';
        }
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);
}

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

function configurarAnimaciones() {
    const elementos = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    elementos.forEach(elemento => {
        observer.observe(elemento);
    });

    // Scroll suave al hacer clic en la flecha
    document.querySelector('.flecha-abajo').addEventListener('click', () => {
        document.querySelector('.cuenta-regresiva').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ========================================
// MÚSICA DE FONDO (OPCIONAL)
// ========================================

function configurarMusica() {
    if (CONFIG.musicaFondo && CONFIG.musicaFondo.trim() !== '') {
        const audio = document.getElementById('musicaFondo');
        const fuente = document.getElementById('fuenteMusica');

        fuente.src = CONFIG.musicaFondo;
        audio.load();

        // La música se reproduce automáticamente al hacer clic en la página
        // (los navegadores no permiten autoplay sin interacción del usuario)
        document.body.addEventListener('click', () => {
            audio.play().catch(error => {
                console.log('No se pudo reproducir la música:', error);
            });
        }, { once: true });
    }
}
