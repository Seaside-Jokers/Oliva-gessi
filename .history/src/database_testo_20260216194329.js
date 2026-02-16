const traduzioni = {
    "it": {
        titolo: "Vieni a conoscere Oliva gessi!",
        home: "Hom",
        about: "Chi siamo",
        contact: "Contatti"
    },
    "en": {
        titolo: "Get to know Oliva gessi!",
        home: "Home",
        about: "About us",
        contact: "Contact"
    }
}

function getTesto(key) {
    return traduzioni[state][key] || key;
}



/* -------------------------------------------------------------------------- */
/*                                DO NOT TOUCH                                */
/* -------------------------------------------------------------------------- */
var state =  getDefaultLang();

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
    if(navigator.language.substring(0, 2) === "en")
        return "en";

    return "it";
}
function defaultState() {
    state = getDefaultLang();
    aggiornaInterfaccia();
    return true;
}
function changeStateTo(_state) {
    if(_state !== "it" && _state !== "en") {
        defaultState();
        return;
    }
    state = _state;
    aggiornaInterfaccia();
}
function changeState() {
    if(state === "it") 
        changeStateTo("en");
    else
        changeStateTo("it");
}

document.addEventListener("DOMContentLoaded", aggiornaInterfaccia);