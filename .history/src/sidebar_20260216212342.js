var state = false;

function toggleMenu() {
    state = !state;
    const sidebar = document.getElementById("sidebar");
    icona.classList.toggle('ruotata');
}