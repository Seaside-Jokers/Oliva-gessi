const traduzioni = {
    "it": {
        titolo: "Oliva gessi",
    },
    "en": {
        titolo: "Oliva gessi",
    }
}

var state = "it";

function getTesto(key) {
    return traduzioni[state][key];
}

function aggiornaInterfaccia() {
    const elementi = document.querySelectorAll('[data-key]');
    
    elementi.forEach(el => {
        const chiave = el.getAttribute('data-key');
        const testoTradotto = getTesto(chiave);
        
        if (testoTradotto) {
            el.textContent = testoTradotto;
        }
    });
}

function changeStateTo(_state) {
    if(_state !== "it" && _state !== "en") {
        _state = "it";
    }
    state = _state;
    
}
function changeState() {
    if(state === "it") {
        state = "en";
    } else {
        state = "it";
    }
    aggiornaInterfaccia();
}