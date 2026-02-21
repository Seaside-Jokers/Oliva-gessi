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
    return traduzioni[state][key] || key;
}



/* -------------------------------------------------------------------------- */
/*                                DO NOT TOUCH                                */
/* -------------------------------------------------------------------------- */
state.set = function(newState) {
    localStorage.setItem("lang", newState);
}
state.get() {
    statelocalStorage.getItem("lang");
}

function aggiornaIconaLingua() {
    const knob = document.getElementById('lang-knob');
    if (!knob) return;
    knob.classList.toggle('en', state === 'en');
}

function aggiornaInterfaccia() {
    const elementi = document.querySelectorAll('[data-key]');
    
    elementi.forEach(el => {
        const chiave = el.getAttribute('data-key');
        const testoTradotto = traduzioni[state][chiave];
        
        if (testoTradotto) {
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