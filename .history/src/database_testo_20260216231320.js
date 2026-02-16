const traduzioni = {
    "it": {
        titolo: "Vieni a conoscere Oliva gessi!",
        home: "Home",
        about: "Chi siamo",
        language: "Cambia lingua",
        current_language: "IT",
    },
    "en": {
        titolo: "Get to know Oliva gessi!",
        home: "Home",
        about: "About us",
        language: "Change language",
        current_language: "EN",
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

// !ERROR
// ?QUESTION
//// 
