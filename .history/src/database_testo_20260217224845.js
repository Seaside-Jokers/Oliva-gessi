const traduzioni = {
    "it": {
        /* UI */
        titolo: "Vieni a conoscere Oliva Gessi!",
        home: "Home",
        about: "Chi siamo",
        language: "Cambia lingua",
        current_language: "IT",
        /* Menu */
        close_menu: "Chiudi",
        cerca_pagina: "Cerca la pagina",
        /* Homepage */
        alt_img1: "Placeholder per la foto del primo blocco",
        title_1: "Oliva Gessi",
        testo_1: "", // TODO
    },
    "en": {
        /* UI */
        titolo: "Get to know Oliva Gessi!",
        home: "Home",
        about: "About us",
        language: "Change language",
        current_language: "EN",
        /* Menu */
        close_menu: "Close menu",
        cerca_pagina: "Search the page",
        /* Homepage */
        alt_img1: "Placeholder for the photo of the first block",
        title_1: "Oliva Gessi",
        
    }
}

function getTesto(key) {
    return traduzioni[state][key] || key;
}



/* -------------------------------------------------------------------------- */
/*                                DO NOT TOUCH                                */
/* -------------------------------------------------------------------------- */
let state =  getDefaultLang();

function aggiornaInterfaccia() {
    const elementi = document.querySelectorAll('[data-key]');
    
    elementi.forEach(el => {
        const chiave = el.getAttribute('data-key');
        const testoTradotto = traduzioni[state][chiave];
        
        if (testoTradotto) {
            if (el.tagName === 'IMG') {
                el.alt = testoTradotto;
            } else {
                // Altrimenti aggiorna il testo normale
                el.textContent = testoTradotto;
            }
        }
    });
}

/* -------------------------------------------------------------------------- */
/*                            Cambiamenti di stato                            */
/* -------------------------------------------------------------------------- */
function getDefaultLang() {
    if(navigator.language.substring(0, 2) === "it")
        return "it";

    return "en";
}
function defaultLang() {
    state = getDefaultLang();
    aggiornaInterfaccia();
    return true;
}
function changeLangTo(_state) {
    if(_state !== "it" && _state !== "en") {
        defaultLang();
        return;
    }
    state = _state;
    aggiornaInterfaccia();
}
function changeLang() {
    if(state === "it") 
        changeLangTo("en");
    else
        changeLangTo("it");
}

document.addEventListener("DOMContentLoaded", aggiornaInterfaccia);