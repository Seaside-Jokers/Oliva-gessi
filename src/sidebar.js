let menuAperto = false;

/**
 * Gestisce l'apertura e la chiusura della sidebar
 */
function toggleMenu() {
    menuAperto = !menuAperto;

    const menu = document.querySelector('.sidebar');
    const clicker = document.querySelector(".clicker");
    const toggle = document.getElementById('menu-toggle');

    // Toggle delle classi per l'animazione
    menu.classList.toggle('aperta');
    menu.setAttribute('aria-hidden', menuAperto ? 'false' : 'true');

    if (clicker) {
        clicker.classList.toggle('show');
    }

    if (toggle) {
        toggle.setAttribute('aria-expanded', menuAperto ? 'true' : 'false');
    }

    // Gestione del Focus per l'accessibilità (tabindex)
    if (menuAperto) {
        // Quando apriamo, mettiamo il focus sul primo bottone della sidebar
        const primoBottone = menu.querySelector('button, a');
        if (primoBottone) {
            setTimeout(() => primoBottone.focus(), 300); // Aspetta la fine dell'animazione CSS
        }
    }
}

/**
 * Chiude forzatamente il menu se è aperto
 */
function closeMenu() {
    if (menuAperto) {
        toggleMenu();
    }
}

/**
 * EVENT LISTENER: Tasto ESC per uscire
 */
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && menuAperto) {
        closeMenu();
    }
});