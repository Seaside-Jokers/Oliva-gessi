var state = false;

function toggleMenu() {
    state = !state;

    const icon = document.getElementById("navbar-button");
    icon.classList.toggle('ruotata');

    const menu = document.getElementById("sidebar");
    menu.classList.toggle('aperta');
}
function chiudiMenu() {
    if(!state) return;
    state = false;
    toggleMenu();
}