const allDarkTheme = () => {
    document.querySelector('.settings-item.tema.selected')?.classList.remove('selected');
}

const setDefault = () => {
    allDarkTheme();
    document.querySelector('#def_theme')?.classList.add('selected');
    ThemeManager.resetToSystemPreference();
}

const setLight = () => {
    allDarkTheme();
    document.querySelector('#light_theme')?.classList.add('selected');
    ThemeManager.changeColorScheme("light");
}

const setDark = () => {
    allDarkTheme();
    document.querySelector('#dark_theme')?.classList.add('selected');
    ThemeManager.changeColorScheme("dark");
}

const allDarkLang = () => {
    document.querySelector('.settings-item.lingua.selected')?.classList.remove('selected');
}

const setDefaultLang = () => {
    allDarkLang();
    document.querySelector('#def-lang')?.classList.add('selected');
    if (state !== getDefaultLang())
        changeLang();
}

const setIta = () => {
    allDarkLang();
    document.querySelector('#ita-lang')?.classList.add('selected');
    if (state !== 'it')
        changeLang();
}

const setEng = () => {
    allDarkLang();
    document.querySelector('#eng-lang')?.classList.add('selected');
    if(state !== 'en')
        changeLang();
}

const set = (tema, lingua) => {
    switch (tema) {
        case 'dark':
            setDark();
            break;
        case 'light':
            setLight();
            break;
        default:
            setDefault();
    }
    switch (lingua) {
        case 'it':
            setIta();
            break;
        case 'en':
            setEng();
            break;
        default:
            setDefaultLang();
    }
}
const setInit = () => {
    set(ThemeManager.getCurrentScheme(), getLangFromURL())
}

document.addEventListener("DOMContentLoaded", setInit);