/* -------------------------------------------------------------------------- */
/*                          GESTIONE LINGUA (i18n)                             */
/* -------------------------------------------------------------------------- */
/*  I dati delle traduzioni NON vivono più qui: sono suddivisi per sezione     */
/*  in src/i18n/*.js (ui, home, castello, luoghi, personaggi, about,           */
/*  settings), caricati PRIMA di questo file. Ogni voce ha la forma:           */
/*      chiave: { it: "...", en: "..." }                                       */
/*  con `en` vuoto dove la traduzione non è ancora pronta.                     */
/*  I file di sezione confluiscono in window.T.                                */
/* -------------------------------------------------------------------------- */

const traduzioni = window.T || {};

if (Object.keys(traduzioni).length === 0) {
    console.warn('[i18n] window.T vuoto: mancano i file src/i18n/*.js prima di database_testo.js');
}

/* -------------------------------------------------------------------------- */
/*                          GESTIONE LINGUA                                   */
/* -------------------------------------------------------------------------- */

const LanguageManager = (() => {
    const validLangs = ['it', 'en'];
    const STORAGE_KEY = 'user-lang';

    /** Lingua del browser, usata quando non c'è una preferenza salvata. */
    function getBrowserLang() {
        return navigator.language.startsWith('it') ? 'it' : 'en';
    }

    /** Preferenza salvata in localStorage, o null se non presente/valida. */
    function getSavedLang() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return validLangs.includes(saved) ? saved : null;
        } catch (e) {
            return null;
        }
    }

    /** Fonte unica di verità: localStorage, altrimenti la lingua del browser */
    let state = getSavedLang() || getBrowserLang();

    /**
     * True se l'utente ha scelto esplicitamente una lingua (salvata),
     * false se sta semplicemente seguendo la lingua del browser ("Default").
     */
    function hasExplicitLang() {
        return getSavedLang() !== null;
    }

    /** True se la chiave ha un testo per la lingua corrente (anche vuoto). */
    function hasKey(key) {
        return traduzioni[key]?.[state] !== undefined;
    }

    /** Ritorna la traduzione della chiave per la lingua corrente. */
    function getTesto(key) {
        return traduzioni[key]?.[state] ?? key;
    }

    function persistAndUpdate() {
        try {
            localStorage.setItem(STORAGE_KEY, state);
        } catch (e) {
            console.warn('Impossibile salvare le preferenze lingua:', e);
        }
        aggiornaInterfaccia();
    }

    /**
     * Rimuove la preferenza esplicita salvata e torna a seguire la lingua
     * del browser. Usata dal pulsante "Default" delle impostazioni.
     */
    function clearLangPreference() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn('Impossibile rimuovere le preferenze lingua:', e);
        }
        state = getBrowserLang();
        aggiornaInterfaccia();
    }

    /** Alterna tra italiano e inglese (usata dal toggle della navbar). */
    function changeLang() {
        state = state === "it" ? "en" : "it";
        persistAndUpdate();
    }

    /**
     * Imposta la lingua direttamente senza fare toggle.
     * Usata dalle impostazioni: fissa sempre una preferenza esplicita salvata,
     * anche se il valore coincide con quello già mostrato.
     * @param {'it'|'en'} lang
     */
    function setLang(lang) {
        if (lang !== 'it' && lang !== 'en') return;
        if (state === lang && hasExplicitLang()) return;
        state = lang;
        persistAndUpdate();
    }

    /**
     * Naviga a una pagina (eventualmente con #ancora). La lingua vive in
     * localStorage, non nell'URL: non serve più aggiustare nulla, quindi
     * un normale <a href="pagina.html"> funziona esattamente come questa
     * funzione, senza differenze né race condition su nessuna pagina.
     */
    function navigateTo(page) {
        location.href = page;
    }

    /**
     * Aggiorna la lingua dell'HTML, il titolo e tutti gli elementi [data-key].
     * Gli <input> con placeholder e le <img> ricevono il testo negli attributi.
     */
    function aggiornaInterfaccia() {
        document.documentElement.lang = state;
        // Usa un titolo dedicato per pagina se <title data-key="..."> è presente,
        // altrimenti mantiene il comportamento esistente (titolo generico homepage).
        const titleKey = document.querySelector('title')?.dataset.key || "titolo";
        document.title = getTesto(titleKey);

        document.querySelectorAll('[data-key]').forEach(el => {
            const testo = getTesto(el.getAttribute('data-key'));
            if (el.tagName === 'IMG') {
                el.alt = testo;
            } else if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = testo;
            } else {
                el.innerHTML = testo;
            }
        });

        // Aggiorna visivamente il toggle
        const knob = document.getElementById('lang-knob');
        knob?.classList.toggle('en', state === 'en');
    }

    /** @returns {'it'|'en'} La lingua corrente */
    function getCurrentLang() {
        return state;
    }

    return {
        init: aggiornaInterfaccia,
        getTesto,
        hasKey,
        getCurrentLang,
        hasExplicitLang,
        changeLang,
        setLang,
        clearLangPreference,
        navigateTo
    };
})();

// API usate dagli onclick inline nell'HTML
window.changeLang = LanguageManager.changeLang;
window.navigateTo = LanguageManager.navigateTo;
// Coerente con ThemeManager/TextSizeManager: disponibile anche come proprietà
window.LanguageManager = LanguageManager;

document.addEventListener("DOMContentLoaded", LanguageManager.init);
