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
    }
}

function getTesto(key) {
    return traduzioni[state][key] ?? key;
}



/* -------------------------------------------------------------------------- */
/*                                DO NOT TOUCH                                */
/* -------------------------------------------------------------------------- */

function getDefaultLang() {
    return navigator.language.substring(0, 2) === "it" ? "it" : "en";
}

let state = localStorage.getItem("lang") || getDefaultLang();

function stateSet(newState) {
    localStorage.setItem("lang", newState);
    state = newState;
}
function stateGet() {
    return localStorage.getItem("lang");
}

function aggiornaIconaLingua() {
    const knob = document.getElementById('lang-knob');
    if (!knob) return;
    knob.classList.toggle('en', state === 'en');
}

function aggiornaInterfaccia() {
    state = stateGet() || getDefaultLang();

    if (!stateGet()) stateSet(state);

    const elementi = document.querySelectorAll('[data-key]');
    elementi.forEach(el => {
        const chiave = el.getAttribute('data-key');
        const testoTradotto = traduzioni[state][chiave];
        
        if (testoTradotto !== undefined) {
            if (el.tagName === 'IMG') {
                el.alt = testoTradotto;
            } else {
                el.textContent = testoTradotto;
            }
        }
    });
    aggiornaIconaLingua();
}

/* -------------------------------------------------------------------------- */
/*                            Cambiamenti di stato                            */
/* -------------------------------------------------------------------------- */
function defaultLang() {
    stateSet(getDefaultLang());
    aggiornaInterfaccia();
    return true;
}
function changeLangTo(_state) {
    if (_state !== "it" && _state !== "en") {
        defaultLang();
        return;
    }
    stateSet(_state);
    aggiornaInterfaccia();
}
function changeLang() {
    changeLangTo(state === "it" ? "en" : "it");
}

document.addEventListener("DOMContentLoaded", aggiornaInterfaccia);