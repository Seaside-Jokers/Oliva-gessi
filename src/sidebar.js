let menuAperto = false;

function toggleMenu() {
    menuAperto = !menuAperto;

    const menu = document.querySelector('.sidebar');
    menu.classList.toggle('aperta');

    const clicker = document.querySelector(".clicker");
    clicker.classList.toggle('show');
}
function closeMenu() {
    if(!menuAperto) return;
    toggleMenu();
}