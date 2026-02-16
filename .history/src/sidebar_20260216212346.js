var state = false;

function toggleMenu() {
    state = !state;
    const sidebar = document.getElementById("navbar");
    icona.classList.toggle('ruotata');
}