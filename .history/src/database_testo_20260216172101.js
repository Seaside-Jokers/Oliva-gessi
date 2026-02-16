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
var state =  () ;

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
        ? state = "en" 
        : state = "it"; // Fallback a italiano se la lingua del browser non è inglese o non è riconosciuta
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