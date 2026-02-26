const ThemeManager = (() => {
    const validSchemes = ['light', 'dark'];
    const STORAGE_KEY = 'user-color-scheme';
    const listeners = [];
    let currentColorScheme = null;

    /**
     * Ottiene lo schema colore preferito dal sistema operativo
     * @returns {'light'|'dark'}
     */
    function getBrowserColorScheme() {
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    /**
     * Applica il tema impostando data-theme sull'elemento root
     * Le variabili CSS vengono gestite interamente dal foglio di stile
     */
    function updateThemeColors() {
        document.documentElement.setAttribute('data-theme', currentColorScheme);
        notifyListeners(currentColorScheme);
    }

    /**
     * Cambia lo schema colore
     * @param {'light'|'dark'} scheme
     * @returns {boolean} True se il cambio è avvenuto con successo
     */
    function changeColorScheme(scheme) {
        if (!validSchemes.includes(scheme)) {
            console.error(`Schema colore non valido: "${scheme}". Valori accettati: ${validSchemes.join(', ')}`);
            return false;
        }

        currentColorScheme = scheme;
        updateThemeColors();

        try {
            localStorage.setItem(STORAGE_KEY, scheme);
        } catch (e) {
            console.warn('Impossibile salvare le preferenze tema:', e);
        }

        return true;
    }

    /**
     * Alterna tra modalità chiara e scura
     */
    function toggleLightDark() {
        console.log('toggleLightDark called! Current:', currentColorScheme);
        changeColorScheme(currentColorScheme === 'dark' ? 'light' : 'dark');
    }

    /**
     * Collega il toggle a un elemento del DOM tramite selettore CSS.
     * Può essere chiamato manualmente se il DOM viene costruito dopo l'init.
     * @param {string} selector - es. '#theme-toggle'
     */
    function bindToggleButton(selector = '#theme-toggle') {
        const btn = document.querySelector(selector);
        if (!btn) {
            console.warn(`ThemeManager: nessun elemento trovato per il selettore "${selector}"`);
            return;
        }
        // Rimuove listener precedenti per evitare duplicati in caso di re-bind
        btn.removeEventListener('click', toggleLightDark);
        btn.addEventListener('click', toggleLightDark);
    }

    /**
     * Registra un listener per i cambiamenti di tema
     * @param {Function} callback - Chiamata con il nuovo schema come argomento
     * @returns {Function} Funzione per rimuovere il listener
     */
    function addThemeChangeListener(callback) {
        if (typeof callback !== 'function') {
            console.error('Il listener deve essere una funzione');
            return () => {};
        }

        listeners.push(callback);

        return () => {
            const index = listeners.indexOf(callback);
            if (index > -1) listeners.splice(index, 1);
        };
    }

    /**
     * Notifica tutti i listener del cambio tema
     * @param {string} newScheme
     */
    function notifyListeners(newScheme) {
        listeners.forEach(callback => {
            try {
                callback(newScheme);
            } catch (e) {
                console.error('Errore nel listener del tema:', e);
            }
        });
    }

    /**
     * Resetta le preferenze salvate e torna allo schema di sistema
     */
    function resetToSystemPreference() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn('Impossibile rimuovere le preferenze salvate:', e);
        }

        changeColorScheme(getBrowserColorScheme());
    }

    /**
     * Verifica se lo schema corrente è scuro
     * @returns {boolean}
     */
    function isDarkMode() {
        return currentColorScheme === 'dark';
    }

    /**
     * Inizializza il sistema di gestione temi
     */
    function init() {
        console.log('ThemeManager: Initializing...');
        let savedScheme = null;
        try {
            savedScheme = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            console.warn('Impossibile leggere le preferenze tema:', e);
        }

        const initialScheme = savedScheme && validSchemes.includes(savedScheme)
            ? savedScheme
            : getBrowserColorScheme();

        console.log('ThemeManager: Initial scheme:', initialScheme);
        changeColorScheme(initialScheme);

        // Collega automaticamente il pulsante con id="theme-toggle" or "theme-toggle-btn"
        bindToggleButton('#theme-toggle');
        bindToggleButton('#theme-toggle-btn');

        // Segue i cambiamenti di sistema solo se l'utente non ha una preferenza salvata
        window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            try {
                if (!localStorage.getItem(STORAGE_KEY)) {
                    changeColorScheme(e.matches ? 'dark' : 'light');
                }
            } catch (err) {
                console.warn('Errore nella gestione del cambio tema di sistema:', err);
            }
        });
        
        console.log('ThemeManager: Init complete. Current scheme:', currentColorScheme);
    }

    return {
        init,
        changeColorScheme,
        toggleLightDark,
        bindToggleButton,
        getCurrentScheme: () => currentColorScheme,
        isDarkMode,
        addThemeChangeListener,
        resetToSystemPreference
    };
})();

// Expose functions to global scope FIRST, before any DOM is ready
// This ensures they're available for onclick handlers
window.changeColorScheme = ThemeManager.changeColorScheme;
window.toggleLightDark = ThemeManager.toggleLightDark;
window.getCurrentScheme = ThemeManager.getCurrentScheme;
window.isDarkMode = ThemeManager.isDarkMode;

// Inizializza automaticamente quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ThemeManager.init);
} else {
    ThemeManager.init();
}