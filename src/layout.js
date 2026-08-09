/* -------------------------------------------------------------------------- */
/*         LAYOUT: NAVBAR + SIDEBAR generati da un'unica fonte               */
/* -------------------------------------------------------------------------- */
/*  Il markup di navbar, clicker e sidebar era copiato in ogni pagina HTML.  */
/*  Ora viene generato qui e iniettato nel contenitore #layout-root.         */
/* -------------------------------------------------------------------------- */

(function () {
    const page = location.pathname.split('/').pop() || 'index.html';
    const isIndex = page === '' || page === 'index.html';

    // Traduzioni per gli aria-label: su telefono il CSS nasconde le etichette
    // testuali della navbar (modalità solo icone), quindi servono qui.
    const t = (key) => LanguageManager.getTesto(key);

    // Nella homepage la navbar mostra "Team", nelle altre "Pagina principale"
    const navSecondButton = isIndex
        ? `<button class="btn-navbar" type="button" onclick="navigateTo('about-us.html')" aria-label="${t('about')}" title="${t('about')}">
            <icon-el src="assets/about-us.svg"></icon-el>
            <span data-key="about" class="nav-data">Il team</span>
        </button>`
        : `<button class="btn-navbar" type="button" onclick="navigateTo('index.html')" aria-label="${t('homepage')}" title="${t('homepage')}">
            <icon-el src="assets/home.svg"></icon-el>
            <span data-key="homepage" class="nav-data">Pagina principale</span>
        </button>`;

    const html = `
    <nav class="navbar">
        <!-- Menu -->
        <button class="btn-navbar" type="button" onclick="toggleMenu()" aria-label="${t('home')}" title="${t('home')}">
            <icon-el src="assets/menu.svg"></icon-el>
            <span data-key="home" class="nav-data">Menu</span>
        </button>
        ${navSecondButton}
        <!-- Ricerca -->
        <button class="btn-navbar" type="button" onclick="toggleSearch()" aria-label="${t('search_button')}" title="${t('search_button')}">
            <icon-el src="assets/search.svg"></icon-el>
            <span data-key="search_button" class="nav-data">Cerca</span>
        </button>
        <!-- Cambio lingua (a destra) -->
        <button class="btn-navbar lang-button" type="button" id="cambio-lingua" onclick="changeLang()" aria-label="${t('language')}" title="${t('language')}">
            <span class="lang-toggle-data">IT</span>
            <span class="lang-toggle">
                <span class="lang-knob" id="lang-knob"></span>
            </span>
            <span class="lang-toggle-data">EN</span>
        </button>
    </nav>
    <!-- Strato trasparente che permette di chiudere il menu cliccando fuori -->
    <div class="clicker" onclick="closeMenu()"></div>
    <!-- Menu laterale vero e proprio -->
    <div class="sidebar" id="sidebar" aria-hidden="true">
        <!-- Chiudi il menu -->
        <button class="sidebar-button" type="button" onclick="closeMenu()">
            <icon-el src="assets/close.svg" class="large"></icon-el>
            <span data-key="close_menu" class="side-data">Chiudi</span>
        </button>
        <!-- Homepage -->
        <button class="sidebar-button" type="button" onclick="navigateTo('index.html')">
            <icon-el src="assets/home.svg" class="large"></icon-el>
            <span data-key="homepage" class="side-data">Pagina principale</span>
        </button>
        <!-- About us -->
        <button class="sidebar-button" type="button" onclick="navigateTo('about-us.html')">
            <icon-el src="assets/about-us.svg" class="large"></icon-el>
            <span data-key="about" class="side-data">Il team</span>
        </button>
        <!-- Impostazioni -->
        <button class="sidebar-button" type="button" onclick="navigateTo('settings.html')">
            <icon-el src="assets/settings.svg" class="large"></icon-el>
            <span data-key="settings" class="side-data">Impostazioni</span>
        </button>
        <!-- Ricerca -->
        <button class="sidebar-button" type="button" onclick="toggleSearch()">
            <icon-el src="assets/search.svg" class="large"></icon-el>
            <span data-key="search_button" class="side-data">Cerca</span>
        </button>
        <details>
            <!-- Le varie pagine del file -->
            <summary data-key="cerca_pagina" class="side-data">Cerca la pagina</summary>
            <button class="sidebar-button-small" type="button" onclick="navigateTo('storia.html')">
                <span class="side-detail" data-key="storia_summary">Storia</span>
            </button>
            <button class="sidebar-button-small" type="button" onclick="navigateTo('castello.html')">
                <span class="side-detail" data-key="castello_summary">Il castello</span>
            </button>
            <button class="sidebar-button-small" type="button" onclick="navigateTo('luoghi.html')">
                <span class="side-detail" data-key="luoghi_summary">Luoghi storici</span>
            </button>
            <button class="sidebar-button-small" type="button" onclick="navigateTo('personaggi.html')">
                <span class="side-detail" data-key="personaggi_summary">Personaggi storici</span>
            </button>
        </details>
    </div>`;

    const root = document.getElementById('layout-root');
    if (root) root.innerHTML = html;

    // Service worker (PWA): registrazione solo in produzione (http/https,
    // escluso localhost per non servire asset cacheati durante lo sviluppo)
    const isLocal = ['localhost', '127.0.0.1'].includes(location.hostname);
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !isLocal) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch(() => {});
        });
    }
})();
