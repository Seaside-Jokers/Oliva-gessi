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
var state = navigator.language.substring(0, 2) === "en" 
    ? "en" 
    : "it"; // Fallback a italiano se la lingua del browser non è inglese o non è riconosciuta

function aggiornaInterfaccia() {
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
function defaultState() {
    navigator.language.substring(0, 2) === "en" 
            ? _state = "en" 
            : _state = "it";
}
function changeStateTo(_state) {
    if(state === )
    if(_state !== "it" && _state !== "en") {
        navigator.language.substring(0, 2) === "en" 
            ? _state = "en" 
            : _state = "it"; // Fallback a italiano se la lingua del browser non è inglese o non è riconosciuta
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