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
var state = "it";
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
function changeStateTo(_state) {
    if(_state !== "it" && _state !== "en") {
        navigator.language.substring(0, 2) === "en" ? 
            _state = "en" 
            : _state = "it";
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