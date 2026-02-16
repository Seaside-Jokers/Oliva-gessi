var state = false;

function toggleMenu() {
    state = !state;

    const icon = document.getElementById("navbar-button");
    icon.classList.toggle('ruotata');
    icon.classList.add

    const menu = document.getElementById("sidebar");
    menu.classList.toggle('aperta');
}