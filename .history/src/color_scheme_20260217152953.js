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
        changeColorScheme(currentColorScheme === 'dark' ? 'light' : 'dark');
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
        let savedScheme = null;
        try {
            savedScheme = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            console.warn('Impossibile leggere le preferenze tema:', e);
        }

        const initialScheme = savedScheme && validSchemes.includes(savedScheme)
            ? savedScheme
            : getBrowserColorScheme();

        changeColorScheme(initialScheme);

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
    }

    return {
        init,
        changeColorScheme,
        toggleLightDark,
        getCurrentScheme: () => currentColorScheme,
        isDarkMode,
        addThemeChangeListener,
        resetToSystemPreference
    };
})();

// Inizializza automaticamente quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ThemeManager.init);
} else {
    ThemeManager.init();
}