var state = false;

function toggleMenu() {
    state = !state;

    const icon = document.getElementById("navbar-button");
    sidebar_button.classList.toggle('ruotata');


}