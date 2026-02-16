var state = false;

function toggleMenu() {
    state = !state;

    const icon = document.getElementById("navbar-button");
    icon.classList.toggle('ruotata');

    
}