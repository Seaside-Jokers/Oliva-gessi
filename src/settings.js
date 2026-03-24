const allDark = () => {
    document.querySelector('.settings-item.tema.selected')?.classList.remove('selected');
}

const setDefault = () => {
    allDark();
    document.querySelector('#def_theme')?.classList.add('selected')
}

const setLight = () => {
    allDark();
    document.querySelector('#light_theme')?.classList.add('selected')
}

const setDark = () => {
    allDark();
    document.querySelector('#dark_theme')?.classList.add('selected')
}