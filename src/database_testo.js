const traduzioni = {
    "it": {
        /* UI */
        titolo: "Vieni a conoscere Oliva Gessi!",
        home: "Home",
        about: "Il team",
        language: "Cambia lingua",
        /* Menu */
        close_menu: "Chiudi",
        cerca_pagina: "Cerca la pagina",
        settings: "Impostazioni",
        homepage: "Pagina principale",
        read_more: "Leggi di più...",
        /* Homepage */
        title_1: "Oliva Gessi",
        testo_1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, lorem tincidunt finibus pellentesque, tellus ex porttitor purus, vel egestas erat metus et turpis. Nunc laoreet ante enim, vel elementum justo fringilla at. Fusce id ex non risus euismod auctor. In vitae accumsan nisi. Proin venenatis iaculis risus, a hendrerit nisl facilisis non. Nam convallis nibh et est lobortis auctor. Vestibulum neque nisl, finibus sed dapibus sit amet, varius sit amet ex. Nullam dapibus vehicula orci, id sodales libero volutpat vel. Vivamus nisi leo, mattis ut est convallis, pharetra ornare ipsum. Fusce elementum velit at massa mattis rutrum. Curabitur tincidunt consectetur nibh, in molestie urna ullamcorper sed. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        title_2: "Nome e cognome",
        testo_2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, lorem tincidunt finibus pellentesque, tellus ex porttitor purus, vel egestas erat metus et turpis. Nunc laoreet ante enim, vel elementum justo fringilla at. Fusce id ex non risus euismod auctor. In vitae accumsan nisi. Proin venenatis iaculis risus, a hendrerit nisl facilisis non. Nam convallis nibh et est lobortis auctor. Vestibulum neque nisl, finibus sed dapibus sit amet, varius sit amet ex. Nullam dapibus vehicula orci, id sodales libero volutpat vel. Vivamus nisi leo, mattis ut est convallis, pharetra ornare ipsum. Fusce elementum velit at massa mattis rutrum. Curabitur tincidunt consectetur nibh, in molestie urna ullamcorper sed. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        /* Impostazioni */
        cambio_colore: "Cambia tema",
        sys_default: "Default",
        light_mode: "Chiaro",
        dark_mode: "Scuro",

    },
    "en": {
        /* UI */
        titolo: "Get to know Oliva Gessi!",
        home: "Home",
        about: "The team",
        language: "Change language",
        /* Menu */
        close_menu: "Close menu",
        cerca_pagina: "Search the page",
        settings: "Settings",
        homepage: "Main page",
        read_more: "Read more...",
        /* Homepage */
        title_1: "Oliva Gessi",
        testo_1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, lorem tincidunt finibus pellentesque, tellus ex porttitor purus, vel egestas erat metus et turpis. Nunc laoreet ante enim, vel elementum justo fringilla at. Fusce id ex non risus euismod auctor. In vitae accumsan nisi. Proin venenatis iaculis risus, a hendrerit nisl facilisis non. Nam convallis nibh et est lobortis auctor. Vestibulum neque nisl, finibus sed dapibus sit amet, varius sit amet ex. Nullam dapibus vehicula orci, id sodales libero volutpat vel. Vivamus nisi leo, mattis ut est convallis, pharetra ornare ipsum. Fusce elementum velit at massa mattis rutrum. Curabitur tincidunt consectetur nibh, in molestie urna ullamcorper sed. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        title_2: "Name And Surname",
        testo_2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, lorem tincidunt finibus pellentesque, tellus ex porttitor purus, vel egestas erat metus et turpis. Nunc laoreet ante enim, vel elementum justo fringilla at. Fusce id ex non risus euismod auctor. In vitae accumsan nisi. Proin venenatis iaculis risus, a hendrerit nisl facilisis non. Nam convallis nibh et est lobortis auctor. Vestibulum neque nisl, finibus sed dapibus sit amet, varius sit amet ex. Nullam dapibus vehicula orci, id sodales libero volutpat vel. Vivamus nisi leo, mattis ut est convallis, pharetra ornare ipsum. Fusce elementum velit at massa mattis rutrum. Curabitur tincidunt consectetur nibh, in molestie urna ullamcorper sed. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        /* Impostazioni */
        cambio_colore: "Change theme",
        sys_default: "Default",
        light_mode: "Light",
        dark_mode: "Dark",
    }
}

function getTesto(key) {
    return traduzioni[state][key] ?? key;
}

/* -------------------------------------------------------------------------- */
/*                              GESTIONE LINGUA                               */
/* -------------------------------------------------------------------------- */

function getLangFromURL() {
    const lang = new URLSearchParams(window.location.search).get('lang');
    return (lang === 'it' || lang === 'en') ? lang : null;
}

function getDefaultLang() {
    return navigator.language.startsWith("it") ? "it" : "en";
}

function updateURLWithLang(lang) {
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lang);
    window.history.replaceState({ lang }, document.title, `${window.location.pathname}?${params}`);
}

// Fonte unica di verità: URL, altrimenti browser
let state = getLangFromURL() ?? getDefaultLang();

/* -------------------------------------------------------------------------- */
/*                           AGGIORNAMENTO UI                                 */
/* -------------------------------------------------------------------------- */

function aggiornaInterfaccia() {
    document.documentElement.lang = state;
    document.title = getTesto("titolo");

    document.querySelectorAll('[data-key]').forEach(el => {
        const testo = getTesto(el.getAttribute('data-key'));
        if (el.tagName === 'IMG') {
            el.alt = testo;
        } else {
            el.textContent = testo;
        }
    });

    // Aggiorna visivamente il toggle
    const knob = document.getElementById('lang-knob');
    knob?.classList.toggle('en', state === 'en');
}

/* -------------------------------------------------------------------------- */
/*                              CAMBIO LINGUA                                 */
/* -------------------------------------------------------------------------- */

function changeLang() {
    state = state === "it" ? "en" : "it";
    updateURLWithLang(state);
    aggiornaInterfaccia();
}

function navigateTo(page) {
    location.href = `${page}?lang=${state}`;
}

document.addEventListener("DOMContentLoaded", aggiornaInterfaccia);