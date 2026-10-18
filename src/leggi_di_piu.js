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
    const TOLLERANZA_FOTO = 0.2; // testo affiancato alla foto: tolleranza come frazione dell'altezza della foto
    const SELETTORE_TESTI = '.testo-blocco[data-key], .testo-blocco-about[data-key]';
    const CLASSE_COLLASSATO = 'leggi-di-piu-collassato';
    const CLASSE_BOTTONE = 'leggi-di-piu-btn';
    const CLASSE_BLOCCO_ESPANSO = 'blocco-espanso';

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
        // Il blocco passa alla disposizione "estesa": il testo scorre attorno alla foto.
        el.closest('.blocco')?.classList.add(CLASSE_BLOCCO_ESPANSO);
        el.style.maxHeight = '';
        btn.remove();
    }

    /**
     * Foto laterale del blocco (float sinistra/destra), se presente. Con la foto
     * sopra il titolo (telefono, foto orizzontali) non c'è float: nessuna.
     */
    function fotoLaterale(el) {
        const blocco = el.closest('.blocco');
        const img = blocco?.querySelector('img.foto-blocco');
        if (!img) return null;
        // A fianco: float (foto verticali, esteso) oppure blocco flex (compresso, da computer).
        const aFianco = getComputedStyle(img).float !== 'none' || getComputedStyle(blocco).display === 'flex';
        return aFianco ? img : null;
    }

    /**
     * Altezza massima del testo quando è affiancato alla foto: il testo
     * resta accanto alla foto fino al suo bordo inferiore, più una piccola
     * tolleranza (un testo "appena più lungo" resta tutto a lato). Restituisce
     * null se la foto non è ancora caricata e misurabile.
     */
    function sogliaAffiancata(img, el) {
        if (!img.complete || img.naturalHeight === 0) return null;
        const imgR = img.getBoundingClientRect();
        const testoR = el.getBoundingClientRect();
        const lineaPx = parseFloat(getComputedStyle(el).lineHeight) || parseFloat(getComputedStyle(el).fontSize) * 1.5;
        const tolleranza = Math.max(imgR.height * TOLLERANZA_FOTO, lineaPx * 2);
        // Il pulsante "Leggi tutto" sta sotto il testo: anche lui deve restare a fianco della foto.
        const spazioBottone = altezzaBottone(el);
        return Math.max(Math.round(imgR.bottom - testoR.top + tolleranza - spazioBottone), Math.round(lineaPx * 3));
    }

    /** Altezza (con margini) del pulsante "Leggi tutto", misurata inserendolo e rimuovendolo subito. */
    function altezzaBottone(el) {
        const btn = creaBottone();
        el.insertAdjacentElement('afterend', btn);
        const stile = getComputedStyle(btn);
        const altezza = btn.offsetHeight + parseFloat(stile.marginTop) + parseFloat(stile.marginBottom);
        btn.remove();
        return altezza;
    }

    /** Valuta un singolo blocco di testo: tronca, aggiorna o rimuove il pulsante. */
    function valuta(el) {
        // Testi introduttivi (breve intestazione di pagina): mai troncati.
        if (el.closest('.intestazione')) return;
        // Se l'utente ha già espanso questo blocco, non ritoccarlo.
        if (el.dataset.leggiDiPiuEspanso === '1') return;

        const img = fotoLaterale(el);
        // Foto laterale non ancora caricata: si valuta quando arriva (vedi init).
        if (img && !img.complete) return;

        const bottoneEsistente = el.nextElementSibling?.classList.contains(CLASSE_BOTTONE)
            ? el.nextElementSibling
            : null;

        // Rimuove temporaneamente il limite per misurare l'altezza naturale reale.
        el.classList.remove(CLASSE_COLLASSATO);
        el.style.maxHeight = '';
        const altezzaNaturale = el.scrollHeight;
        const soglia = img
            ? sogliaAffiancata(img, el)
            : Math.round(window.innerHeight * SOGLIA);
        if (soglia === null) return;

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
        // Homepage esclusa: gestita interamente da homepage.js. Le pagine di
        // contenuto (.pagina-contenuto) hanno foto, ma usano questo script.
        if (document.querySelector('.foto-blocco') && !document.querySelector('.pagina-contenuto')) return;

        valutaTutti();
        correggiAncoraggio();

        // Rotazione schermo, ridimensionamento finestra, zoom.
        window.addEventListener('resize', valutaConDebounce);

        // Le foto laterali cambiano altezza quando arrivano: ricalcola al load.
        document.querySelectorAll('.pagina-contenuto .foto-blocco').forEach((img) => {
            img.addEventListener('load', valutaConDebounce);
        });

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
