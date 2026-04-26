/* -------------------------------------------------------------------------- */
/*                                   TEMA                                     */
/* -------------------------------------------------------------------------- */

const clearTemaSelected = () => {
    document.querySelector('.settings-item.tema.selected')?.classList.remove('selected');
};

const setDefault = () => {
    clearTemaSelected();
    document.querySelector('#def_theme')?.classList.add('selected');
    ThemeManager.resetToSystemPreference();
};

const setLight = () => {
    clearTemaSelected();
    document.querySelector('#light_theme')?.classList.add('selected');
    ThemeManager.changeColorScheme("light");
};

const setDark = () => {
    clearTemaSelected();
    document.querySelector('#dark_theme')?.classList.add('selected');
    ThemeManager.changeColorScheme("dark");
};

/* -------------------------------------------------------------------------- */
/*                                  LINGUA                                    */
/* -------------------------------------------------------------------------- */

const clearLinguaSelected = () => {
    document.querySelector('.settings-item.lingua.selected')?.classList.remove('selected');
};

/**
 * Aggiorna visivamente il bottone selezionato in base alla lingua corrente.
 * Chiamato anche quando il toggle della navbar cambia lingua dall'esterno.
 */
const syncLinguaButtons = () => {
    clearLinguaSelected();
    const lang = state;
    const defaultLang = getDefaultLang();
    if (lang === defaultLang) {
        document.querySelector('#def-lang')?.classList.add('selected');
    } else if (lang === 'it') {
        document.querySelector('#ita-lang')?.classList.add('selected');
    } else if (lang === 'en') {
        document.querySelector('#eng-lang')?.classList.add('selected');
    }
};

const setDefaultLang = () => {
    setLang(getDefaultLang());
    syncLinguaButtons();
};

const setIta = () => {
    setLang('it');
    syncLinguaButtons();
};

const setEng = () => {
    setLang('en');
    syncLinguaButtons();
};

/* -------------------------------------------------------------------------- */
/*                                    INIT                                    */
/* -------------------------------------------------------------------------- */

const setInit = () => {
    // Tema
    switch (ThemeManager.getCurrentScheme()) {
        case 'dark':  setDark();    break;
        case 'light': setLight();   break;
        default:      setDefault(); break;
    }
    // Lingua: legge dall'URL, poi decide quale bottone evidenziare
    syncLinguaButtons();

    // Ascolta i cambi lingua dal toggle navbar, così i bottoni restano sincronizzati
    document.getElementById('lang-knob')?.closest('button')
        ?.addEventListener('click', syncLinguaButtons);
};

document.addEventListener("DOMContentLoaded", setInit);