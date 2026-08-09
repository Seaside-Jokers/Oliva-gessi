/* -------------------------------------------------------------------------- */
/*                                UTILITY                                     */
/* -------------------------------------------------------------------------- */

/**
 * Evidenzia un solo bottone tra quelli della stessa categoria.
 * Sostituisce i vecchi pattern clear+highlight duplicati.
 * @param {string} cssClass - classe delle .settings-item (es. "tema")
 * @param {string} id - id del bottone da evidenziare (es. "#def_theme")
 */
const setSelected = (cssClass, id) => {
    document.querySelectorAll(`.settings-item.${cssClass}`).forEach(btn => {
        const selected = btn.id === id.slice(1);
        btn.classList.toggle('selected', selected);
        btn.setAttribute('aria-pressed', String(selected));
    });
};

/* -------------------------------------------------------------------------- */
/*                                   TEMA                                     */
/* -------------------------------------------------------------------------- */

const setDefault = () => {
    ThemeManager.resetToSystemPreference();
    setSelected('tema', '#def_theme');
};

const setLight = () => {
    ThemeManager.changeColorScheme("light");
    setSelected('tema', '#light_theme');
};

const setDark = () => {
    ThemeManager.changeColorScheme("dark");
    setSelected('tema', '#dark_theme');
};

/* -------------------------------------------------------------------------- */
/*                                  LINGUA                                    */
/* -------------------------------------------------------------------------- */

/**
 * Aggiorna visivamente il bottone selezionato in base alla lingua corrente.
 * Chiamato anche quando il toggle della navbar cambia lingua dall'esterno.
 */
const syncLinguaButtons = () => {
    let id;
    if (!LanguageManager.hasExplicitLang()) id = '#def-lang';
    else if (LanguageManager.getCurrentLang() === 'it') id = '#ita-lang';
    else id = '#eng-lang';
    setSelected('lingua', id);
};

const setDefaultLang = () => {
    LanguageManager.clearLangPreference();
    syncLinguaButtons();
};

const setIta = () => {
    LanguageManager.setLang('it');
    syncLinguaButtons();
};

const setEng = () => {
    LanguageManager.setLang('en');
    syncLinguaButtons();
};

/* -------------------------------------------------------------------------- */
/*                              DIMENSIONE TESTO                              */
/* -------------------------------------------------------------------------- */

const sizeIds = { normal: '#size-normal', large: '#size-large', xlarge: '#size-xlarge' };

const syncDimensioneButtons = () => {
    setSelected('dimensione', sizeIds[TextSizeManager.getCurrentSize()] ?? sizeIds.normal);
};

const setSizeNormal = () => {
    TextSizeManager.setSize('normal');
    setSelected('dimensione', sizeIds.normal);
};

const setSizeLarge = () => {
    TextSizeManager.setSize('large');
    setSelected('dimensione', sizeIds.large);
};

const setSizeXLarge = () => {
    TextSizeManager.setSize('xlarge');
    setSelected('dimensione', sizeIds.xlarge);
};

/* -------------------------------------------------------------------------- */
/*                            RIPRISTINA TUTTO                                */
/* -------------------------------------------------------------------------- */

const resetAllSettings = () => {
    if (!window.confirm(LanguageManager.getTesto('reset_settings_confirm'))) return;
    setDefault();
    LanguageManager.clearLangPreference();
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
        setSelected('tema', ThemeManager.getCurrentScheme() === 'dark' ? '#dark_theme' : '#light_theme');
    } else {
        setSelected('tema', '#def_theme');
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
