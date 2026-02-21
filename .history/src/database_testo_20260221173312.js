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
        alt_img1: "Placeholder per la foto del primo blocco",
        title_1: "Oliva Gessi",
        testo_1: "", // TODO
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
        alt_img1: "Placeholder for the photo of the first block",
        title_1: "Oliva Gessi",
        testo_1: "", // TODO
    }
}

function getTesto(key) {
    return traduzioni[state][key] ?? key; // ?? invece di || per non saltare le stringhe vuote
}



/* -------------------------------------------------------------------------- */
/*                                DO NOT TOUCH                                */
/* -------------------------------------------------------------------------- */

function getDefaultLang() { // ← spostata prima di state, per sicurezza
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
        
        // Fix: !== undefined invece di if (testoTradotto), così gestisce anche le stringhe vuote
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