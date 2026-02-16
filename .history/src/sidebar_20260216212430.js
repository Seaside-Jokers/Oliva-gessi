var state = false;

function toggleMenu() {
    state = !state;

    const sidebar_button = document.getElementById("navbar-button");
    sidebar_button.classList.toggle('ruotata');


}