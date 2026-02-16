var state = false;

function toggleMenu() {
    state = !state;
    const sidebar = document.getElementById("navbar-button");
    icona.classList.toggle('ruotata');
}