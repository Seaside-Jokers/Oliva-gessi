/* -------------------------------------------------------------------------- */
/*                                   TEMA                                     */
/* -------------------------------------------------------------------------- */

const clearTemaSelected = () => {
    document.querySelectorAll('.settings-item.tema').forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
    });
};

const highlightTema = (id) => {
    clearTemaSelected();
    const btn = document.querySelector(id);
    btn?.classList.add('selected');
    btn?.setAttribute('aria-pressed', 'true');
};

const setDefault = () => {
    ThemeManager.resetToSystemPreference();
    highlightTema('#def_theme');
};

const setLight = () => {
    ThemeManager.changeColorScheme("light");
    highlightTema('#light_theme');
};

const setDark = () => {
    ThemeManager.changeColorScheme("dark");
    highlightTema('#dark_theme');
};

/* -------------------------------------------------------------------------- */
/*                                  LINGUA                                    */
/* -------------------------------------------------------------------------- */

const clearLinguaSelected = () => {
    document.querySelectorAll('.settings-item.lingua').forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
    });
};

/**
 * Aggiorna visivamente il bottone selezionato in base alla lingua corrente.
 * Chiamato anche quando il toggle della navbar cambia lingua dall'esterno.
 */
const syncLinguaButtons = () => {
    clearLinguaSelected();
    let id;
    if (!hasExplicitLang()) id = '#def-lang';
    else if (state === 'it') id = '#ita-lang';
    else if (state === 'en') id = '#eng-lang';
    const btn = document.querySelector(id);
    btn?.classList.add('selected');
    btn?.setAttribute('aria-pressed', 'true');
};

const setDefaultLang = () => {
    clearLangPreference();
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
/*                              DIMENSIONE TESTO                              */
/* -------------------------------------------------------------------------- */

const clearDimensioneSelected = () => {
    document.querySelectorAll('.settings-item.dimensione').forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
    });
};

const highlightDimensione = (id) => {
    clearDimensioneSelected();
    const btn = document.querySelector(id);
    btn?.classList.add('selected');
    btn?.setAttribute('aria-pressed', 'true');
};

const sizeIds = { normal: '#size-normal', large: '#size-large', xlarge: '#size-xlarge' };

const syncDimensioneButtons = () => {
    highlightDimensione(sizeIds[TextSizeManager.getCurrentSize()] ?? sizeIds.normal);
};

const setSizeNormal = () => {
    TextSizeManager.setSize('normal');
    highlightDimensione(sizeIds.normal);
};

const setSizeLarge = () => {
    TextSizeManager.setSize('large');
    highlightDimensione(sizeIds.large);
};

const setSizeXLarge = () => {
    TextSizeManager.setSize('xlarge');
    highlightDimensione(sizeIds.xlarge);
};

/* -------------------------------------------------------------------------- */
/*                            RIPRISTINA TUTTO                                */
/* -------------------------------------------------------------------------- */

const resetAllSettings = () => {
    if (!window.confirm(getTesto('reset_settings_confirm'))) return;
    setDefault();
    clearLangPreference();
    syncLinguaButtons();
    TextSizeManager.resetToDefault();
    syncDimensioneButtons();
};

/* -------------------------------------------------------------------------- */
/*                                    INIT                                    */
/* -------------------------------------------------------------------------- */

const setInit = () => {
    // Tema: evidenzia solo il bottone corretto, senza toccare la preferenza
    // salvata. Se l'utente non ha mai scelto esplicitamente chiaro/scuro,
    // il tema segue il sistema ed è "Default" a prescindere dal colore
    // effettivamente applicato in quel momento.
    if (ThemeManager.hasUserPreference()) {
        highlightTema(ThemeManager.getCurrentScheme() === 'dark' ? '#dark_theme' : '#light_theme');
    } else {
        highlightTema('#def_theme');
    }
    // Lingua: legge dall'URL, poi decide quale bottone evidenziare
    syncLinguaButtons();
    // Dimensione testo: evidenzia in base alla preferenza salvata (o "Normale")
    syncDimensioneButtons();

    // Ascolta i cambi lingua dal toggle navbar, così i bottoni restano sincronizzati
    document.getElementById('lang-knob')?.closest('button')
        ?.addEventListener('click', syncLinguaButtons);
};

document.addEventListener("DOMContentLoaded", setInit);