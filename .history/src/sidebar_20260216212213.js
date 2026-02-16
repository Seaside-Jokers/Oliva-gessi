var state = false;

function toggleMenu() {
    state = !state;
    const icona = document.querySelector('.icona-menu');
    icona.classList.toggle('ruotata');
}