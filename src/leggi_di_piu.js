/* -------------------------------------------------------------------------- */
/*                    "LEGGI DI PIÙ" — TESTI LUNGHI                           */
/* -------------------------------------------------------------------------- */
/*  Sui blocchi di contenuto (storia, castello, luoghi, personaggi, about-us) */
/*  i testi possono diventare molto lunghi, specialmente su telefono. Quando  */
/*  l'altezza naturale di un paragrafo supera SOGLIA * altezza dello schermo, */
/*  lo tronchiamo con una dissolvenza in fondo (via CSS mask, indipendente    */
/*  dal colore di sfondo/tema) e aggiungiamo un pulsante "Leggi di più" che,  */
/*  cliccato, rivela il resto del testo — stile WhatsApp, in un solo verso    */
/*  (non si ricollassa più una volta espanso).                                */
/*                                                                              */
/*  Esclusa l'homepage: lì i blocchi ".testo-blocco" sono le anteprime già    */
/*  gestite da homepage.js (clampTesti), che rimandano ad altre pagine.       */
/* -------------------------------------------------------------------------- */

const LeggiDiPiu = (() => {
    const SOGLIA = 2 / 3; // frazione dell'altezza dello schermo oltre la quale si tronca
    const SELETTORE_TESTI = '.testo-blocco[data-key], .testo-blocco-about[data-key]';
    const CLASSE_COLLASSATO = 'leggi-di-piu-collassato';
    const CLASSE_BOTTONE = 'leggi-di-piu-btn';

    /** Testo del pulsante, tradotto (chiave i18n dedicata "leggi_tutto"). */
    function testoBottone() {
        return (window.LanguageManager && typeof LanguageManager.getTesto === 'function')
            ? LanguageManager.getTesto('leggi_tutto')
            : 'Leggi tutto';
    }

    function creaBottone() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `read-more-button ${CLASSE_BOTTONE}`;
        btn.textContent = testoBottone();
        return btn;
    }

    /** Rimuove il troncamento in modo definitivo (l'utente ha scelto di leggere tutto). */
    function espandi(el, btn) {
        el.dataset.leggiDiPiuEspanso = '1';
        el.classList.remove(CLASSE_COLLASSATO);
        el.style.maxHeight = '';
        btn.remove();
    }

    /** Valuta un singolo blocco di testo: tronca, aggiorna o rimuove il pulsante. */
    function valuta(el) {
        // Testi introduttivi (breve intestazione di pagina): mai troncati.
        if (el.closest('.intestazione')) return;
        // Se l'utente ha già espanso questo blocco, non ritoccarlo.
        if (el.dataset.leggiDiPiuEspanso === '1') return;

        const bottoneEsistente = el.nextElementSibling?.classList.contains(CLASSE_BOTTONE)
            ? el.nextElementSibling
            : null;

        // Rimuove temporaneamente il limite per misurare l'altezza naturale reale.
        el.classList.remove(CLASSE_COLLASSATO);
        el.style.maxHeight = '';
        const altezzaNaturale = el.scrollHeight;
        const soglia = Math.round(window.innerHeight * SOGLIA);

        if (altezzaNaturale > soglia) {
            el.classList.add(CLASSE_COLLASSATO);
            el.style.maxHeight = `${soglia}px`;

            const btn = bottoneEsistente || creaBottone();
            btn.textContent = testoBottone();
            btn.onclick = () => espandi(el, btn);
            if (!bottoneEsistente) el.insertAdjacentElement('afterend', btn);
        } else if (bottoneEsistente) {
            // Il testo ora entra senza troncamento (es. cambio lingua con testo più corto).
            bottoneEsistente.remove();
        }
    }

    function valutaTutti() {
        document.querySelectorAll(SELETTORE_TESTI).forEach(valuta);
    }

    /**
     * Se la pagina è stata aperta con un'ancora (es. link interno a
     * "storia.html#sto_title_4"), il browser scorre alla destinazione PRIMA
     * che questo script tronchi i testi sopra di essa. Troncandoli, i blocchi
     * si accorciano e l'ancora si sposta più in alto, finendo nascosta sotto
     * la navbar fissa. Qui la si riallinea dopo aver applicato i troncamenti.
     * (scroll-margin-top su .titolo-blocco tiene comunque conto della navbar).
     */
    function correggiAncoraggio() {
        if (!location.hash) return;
        let target;
        try {
            target = document.querySelector(location.hash);
        } catch (e) {
            return; // hash non valido come selettore CSS
        }
        target?.scrollIntoView({ block: 'start' });
    }

    // Debounce: resize, cambio lingua e caricamento font possono scattare a raffica.
    let timeoutId = null;
    function valutaConDebounce() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(valutaTutti, 120);
    }

    function init() {
        // Homepage esclusa: gestita interamente da homepage.js.
        if (document.querySelector('.foto-blocco')) return;

        valutaTutti();
        correggiAncoraggio();

        // Rotazione schermo, ridimensionamento finestra, zoom.
        window.addEventListener('resize', valutaConDebounce);

        // Il font (Playfair/Montserrat) può caricarsi dopo il primo render,
        // cambiando l'altezza delle righe: ricalcola quando è pronto, poi
        // riallinea di nuovo l'eventuale ancora (stesso motivo di sopra).
        if (document.fonts?.ready) {
            document.fonts.ready.then(() => {
                valutaTutti();
                correggiAncoraggio();
            });
        }

        // Cambio lingua dal toggle in navbar: il testo tradotto ha una
        // lunghezza diversa e va ricontrollato. changeLang() è l'unico punto
        // da cui parte il cambio lingua "a caldo" (vedi database_testo.js).
        const cambioLinguaOriginale = window.changeLang;
        if (typeof cambioLinguaOriginale === 'function') {
            window.changeLang = function (...args) {
                const risultato = cambioLinguaOriginale.apply(this, args);
                valutaConDebounce();
                return risultato;
            };
        }
    }

    return { init };
})();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', LeggiDiPiu.init);
} else {
    LeggiDiPiu.init();
}
