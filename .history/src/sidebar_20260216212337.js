var state = false;

function toggleMenu() {
    state = !state;
    const sidebar = document.getElementById("mySidebar");
    icona.classList.toggle('ruotata');
}