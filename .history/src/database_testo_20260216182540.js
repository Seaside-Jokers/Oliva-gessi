const traduzioni = {
    "it": {
        titolo: "Vieni a conoscere Oliva gessi!",
    },
    "en": {
        titolo: "Get to know Oliva gessi!",
    }
}



/* -------------------------------------------------------------------------- */
/*                                DO NOT TOUCH                                */
/* -------------------------------------------------------------------------- */
var state =  getDefaultLang();

function aggiornaInterfaccia() {
    // Funzione che aggiorna tutti i testi dell'interfaccia in base allo stato attuale
    const elementi = document.querySelectorAll('[data-key]');
    
    elementi.forEach(el => {
        const chiave = el.getAttribute('data-key');
        const testoTradotto = traduzioni[state][chiave];
        
        if (testoTradotto) {
            el.textContent = testoTradotto;
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