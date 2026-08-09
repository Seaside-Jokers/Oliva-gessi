/* -------------------------------------------------------------------------- */
/*                      PALETTE DI RICERCA (Ctrl+K)                           */
/* -------------------------------------------------------------------------- */

const SearchPalette = (() => {
    // Indice: ogni voce associa una pagina alle chiavi i18n da indicizzare.
    // I testi vengono risolti al volo con getTesto, quindi la ricerca
    // segue automaticamente la lingua corrente.
    const INDEX = [
        { url: 'index.html',      titleKey: 'homepage',        keys: ['homepage', 'intestazione_titolo', 'intestazione_contenuto', 'title_1', 'testo_1', 'title_2', 'testo_2', 'title_3', 'testo_3', 'title_4', 'testo_4'] },
        { url: 'storia.html',     titleKey: 'storia_summary',  keys: ['storia_summary', 'title_1', 'testo_1'] },
        { url: 'castello.html',   titleKey: 'castello_summary', keys: ['castello_summary', 'title_2', 'testo_2'] },
        { url: 'luoghi.html',     titleKey: 'luoghi_summary',  keys: ['luoghi_summary', 'title_3', 'testo_3'] },
        { url: 'personaggi.html', titleKey: 'personaggi_summary', keys: ['personaggi_summary', 'title_4', 'testo_4'] },
        { url: 'about-us.html',   titleKey: 'about',           keys: ['about', 'about_team_title', 'about_team', 'title_1_about', 'testo_1_about', 'title_2_about', 'testo_2_about', 'title_3_about', 'testo_3_about', 'title_4_about', 'testo_4_about', 'title_5_about', 'testo_5_about'] },
        { url: 'settings.html',   titleKey: 'settings',        keys: ['settings', 'cambio_colore', 'settings_theme_hint', 'sys_default', 'light_mode', 'dark_mode', 'cambio_lingua', 'settings_lang_hint', 'lang_default', 'ita', 'eng', 'cambio_dimensione', 'settings_size_hint', 'size_normal', 'size_large', 'size_xlarge', 'reset_settings'] }
    ];

    let results = [];
    let activeIndex = -1;

    const root = document.createElement('div');
    root.className = 'search-overlay closed';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.innerHTML = `
        <div class="search-panel">
            <div class="search-bar">
                <icon-el src="assets/search.svg"></icon-el>
                <input type="search" id="search-input" data-key="search_placeholder" placeholder="..." autocomplete="off" spellcheck="false" aria-label="search_placeholder">
                <button type="button" class="search-close" aria-label="close">×</button>
            </div>
            <ul id="search-results" role="listbox"></ul>
            <p class="search-hint" data-key="search_hint">...</p>
        </div>`;
    document.body.appendChild(root);

    const input = root.querySelector('#search-input');
    const list = root.querySelector('#search-results');
    const closeBtn = root.querySelector('.search-close');

    /** Normalizza il testo: minuscolo e senza accenti (per cercare "perche"). */
    const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const escapeHtml = (s) => s.replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    function getResults(query) {
        const terms = normalize(query).split(/\s+/).filter(Boolean);
        if (!terms.length) return [];
        return INDEX.map(entry => {
            const title = normalize(LanguageManager.getTesto(entry.titleKey));
            const texts = entry.keys.map(k => LanguageManager.getTesto(k)).filter(Boolean);
            const body = normalize(texts.join(' '));
            const titleHits = terms.filter(t => title.includes(t)).length;
            const bodyHits = terms.filter(t => body.includes(t)).length;
            return {
                entry, texts,
                hits: titleHits + bodyHits,
                titleHits, bodyHits,
                firstIdx: body.indexOf(terms[0])
            };
        })
        .filter(r => r.hits > 0)
        // Il titolo della pagina ha priorità sulla descrizione:
        // prima i match nel titolo, poi quelli nel corpo, poi chi
        // contiene il termine più in alto (pagina dedicata > homepage)
        .sort((a, b) =>
            b.titleHits - a.titleHits ||
            b.bodyHits - a.bodyHits ||
            a.firstIdx - b.firstIdx)
        .slice(0, 8);
    }

    function snippet(texts, query) {
        const terms = normalize(query).split(/\s+/).filter(Boolean);
        const firstTerm = terms[0];
        const text = texts.find(t => normalize(t).includes(firstTerm)) || texts[0] || '';
        const clean = text.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim();
        return clean.length > 100 ? clean.slice(0, 100).trim() + '…' : clean;
    }

    function render(query) {
        results = getResults(query);
        activeIndex = results.length ? 0 : -1;

        if (!results.length) {
            const message = query.trim()
                ? `${LanguageManager.getTesto('search_no_results')}“${escapeHtml(query.trim())}”`
                : '';
            list.innerHTML = message ? `<li class="search-empty">${message}</li>` : '';
            return;
        }

        list.innerHTML = results.map((r, i) => `
            <li>
                <button type="button" class="search-result${i === activeIndex ? ' active' : ''}" data-index="${i}" role="option" aria-selected="${i === activeIndex}">
                    <span class="search-result-title">${escapeHtml(LanguageManager.getTesto(r.entry.titleKey))}</span>
                    <span class="search-result-snippet">${escapeHtml(snippet(r.texts, query))}</span>
                </button>
            </li>`).join('');
    }

    function navigateToResult() {
        const target = results[activeIndex];
        if (!target) return;
        close();
        LanguageManager.navigateTo(target.entry.url);
    }

    function open() {
        root.classList.remove('closed');
        // Traduce placeholder e aria-label (il resto è gestito da [data-key])
        input.placeholder = LanguageManager.getTesto('search_placeholder');
        input.setAttribute('aria-label', LanguageManager.getTesto('search_placeholder'));
        render('');
        input.value = '';
        input.focus();
    }

    function close() {
        root.classList.add('closed');
    }

    function toggle() {
        if (root.classList.contains('closed')) open();
        else close();
    }

    /* ---- Eventi ---- */
    input.addEventListener('input', () => render(input.value));

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (results.length) {
                activeIndex = (activeIndex + 1) % results.length;
                render(input.value);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (results.length) {
                activeIndex = (activeIndex - 1 + results.length) % results.length;
                render(input.value);
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            navigateToResult();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            close();
        }
    });

    list.addEventListener('click', (e) => {
        const btn = e.target.closest('.search-result');
        if (!btn) return;
        activeIndex = Number(btn.dataset.index);
        navigateToResult();
    });

    root.addEventListener('mousedown', (e) => {
        if (e.target === root) close();
    });

    // Esc chiude anche quando il focus non è nell'input (es. su un risultato)
    root.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });

    closeBtn.addEventListener('click', close);

    // Scorciatoia globale: Ctrl+K / Cmd+K
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            toggle();
        }
    });

    return { toggle };
})();

window.toggleSearch = () => SearchPalette.toggle();
