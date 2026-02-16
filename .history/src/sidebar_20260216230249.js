var menuAperto = false;

function toggleMenu() {
    menuAperto = !menuAperto;

    const icon = document.getElementById("navbar-button");
    icon.classList.toggle('ruotata');

    const menu = document.getElementById("sidebar");
    menu.classList.toggle('aperta');

    const clicker = document.querySelector(".clicker");
    clicker.classList.toggle('show');
}
function closeMenu() {
    if(!menuAperto) return;
    toggleMenu();
}