/* -------------------------------------------------------------------------- */
/*                            GUARDIA LINGUA (click)                          */
/* -------------------------------------------------------------------------- */
/*  BUG: gli <a href="pagina.html"> interni ricevono il parametro ?lang= solo */
/*  quando database_testo.js ha finito di girare (syncInternalLinks, legata  */
/*  a DOMContentLoaded / al cambio lingua). Se l'utente clicca un link prima  */
/*  che questo accada - pagina ancora in caricamento, connessione lenta,     */
/*  mobile - il link viene seguito con l'href "grezzo" dell'HTML e la        */
/*  lingua si perde. Capita "a volte" proprio perché dipende dai tempi di    */
/*  caricamento.                                                              */
/*                                                                              */
/*  FIX: invece di fidarsi dell'href già riscritto, intercettiamo il click e  */
/*  ricalcoliamo l'URL corretto al momento stesso del click, con la stessa   */
/*  logica di LanguageManager.navigateTo() (quella che sappiamo funzionare   */
/*  sempre, perché usata dai pulsanti onclick di navbar/sidebar). Questo     */
/*  script NON è deferred e va incluso per primo in <head>, così il listener */
/*  è attivo ancora prima che il resto della pagina/degli script sia pronto. */
/* -------------------------------------------------------------------------- */
(function () {
    function getExplicitLang() {
        const lang = new URLSearchParams(location.search).get('lang');
        return (lang === 'it' || lang === 'en') ? lang : null;
    }

    document.addEventListener('click', function (event) {
        // Rispetta modificatori (nuova scheda, ecc.), tasti diversi dal
        // sinistro e gestori che hanno già gestito il click (es. onclick).
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const a = event.target.closest && event.target.closest('a[href]');
        if (!a) return;

        const href = a.getAttribute('href');
        if (!href) return;
        // Ignora link esterni, ancore pure, mailto/tel/javascript
        if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(href)) return;
        if (/^(mailto:|tel:|javascript:)/i.test(href)) return;
        if (href.startsWith('#')) return;

        const hashIndex = href.indexOf('#');
        let path = hashIndex === -1 ? href : href.slice(0, hashIndex);
        const hash = hashIndex === -1 ? '' : href.slice(hashIndex);

        const queryIndex = path.indexOf('?');
        if (queryIndex !== -1) path = path.slice(0, queryIndex);
        if (!/\.html$/i.test(path)) return; // solo pagine .html del sito

        const lang = getExplicitLang();
        const target = lang ? `${path}?lang=${lang}${hash}` : `${path}${hash}`;

        event.preventDefault();
        location.href = target;
    }, true);
})();
