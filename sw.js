/* -------------------------------------------------------------------------- */
/*                    SERVICE WORKER: OFFLINE + CACHE                          */
/* -------------------------------------------------------------------------- */
/*  Strategie:                                                                 */
/*  - Navigazioni: network-first con fallback alla cache (e alla home).        */
/*  - Risorse (css, js, font, immagini, svg): cache-first con rifornimento.   */
/*  Per aggiornare la cache in produzione, basta cambiare VERSION.            */
/* -------------------------------------------------------------------------- */

const VERSION = 'oliva-gessi-v3';

const CORE = [
    '/',
    '/index.html',
    '/storia.html',
    '/castello.html',
    '/luoghi.html',
    '/personaggi.html',
    '/about-us.html',
    '/settings.html',
    '/manifest.webmanifest',
    '/src/style.css',
    '/src/lang_guard.js',
    '/src/i18n/ui.js',
    '/src/i18n/home.js',
    '/src/i18n/castello.js',
    '/src/i18n/luoghi.js',
    '/src/i18n/personaggi.js',
    '/src/i18n/about.js',
    '/src/i18n/settings.js',
    '/src/database_testo.js',
    '/src/color_scheme.js',
    '/src/text_size.js',
    '/src/sidebar.js',
    '/src/layout.js',
    '/src/search.js',
    '/src/homepage.js',
    '/src/icon_manager.js',
    '/src/settings.js',
    '/assets/icon.svg',
    '/assets/favicon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(VERSION)
            // addAll fallirebbe tutto se anche una sola risorsa mancasse:
            // con Promise.allSettled le risorse valide vengono comunque cacheate
            .then(cache => Promise.allSettled(CORE.map(url => cache.add(url))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;
    // Non mettere in cache gli script di analytics di Vercel
    if (url.pathname.startsWith('/_vercel/')) return;

    // Navigazioni: prima la rete (per avere sempre l'ultima versione),
    // poi la cache; offline si ripiega sull'ultima copia o sulla home.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(res => {
                    // Cache solo risposte valide: mai pagine 404 o errori
                    if (res.ok) {
                        const copy = res.clone();
                        caches.open(VERSION).then(cache => cache.put(request, copy));
                    }
                    return res;
                })
                .catch(() =>
                    caches.match(request).then(cached => cached || caches.match('/'))
                )
        );
        return;
    }

    // Risorse statiche: cache-first con rifornimento in background
    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;
            return fetch(request).then(res => {
                if (res.ok) {
                    const copy = res.clone();
                    caches.open(VERSION).then(cache => cache.put(request, copy));
                }
                return res;
            });
        })
    );
});
