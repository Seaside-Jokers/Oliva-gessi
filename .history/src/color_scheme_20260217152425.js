const ThemeManager = (() => {
    const colorScheme = {
        light: {
            bg_dark: 'hsl(30 58% 88%)',
            bg: 'hsl(30 100% 94%)',
            bg_light: 'hsl(30 100% 99%)',
            text: 'hsl(17 100% 4%)',
            text_muted: 'hsl(32 47% 25%)',
            highlight: 'hsl(31 100% 97%)',
            border: 'hsl(31 26% 47%)',
            border_muted: 'hsl(31 31% 59%)',
            primary: 'hsl(37 100% 17%)',
            secondary: 'hsl(206 82% 26%)',
            danger: 'hsl(9 25% 41%)',
            warning: 'hsl(51 29% 33%)',
            success: 'hsl(148 24% 35%)',
            info: 'hsl(217 26% 42%)',
        },
        dark: {
            bg_dark: 'hsl(18 100% 1%)',
            bg: 'hsl(25 93% 4%)',
            bg_light: 'hsl(31 65% 7%)',
            text: 'hsl(31 100% 92%)',
            text_muted: 'hsl(31 39% 67%)',
            highlight: 'hsl(31 33% 36%)',
            border: 'hsl(32 47% 25%)',
            border_muted: 'hsl(34 84% 14%)',
            primary: 'hsl(31 62% 64%)',
            secondary: 'hsl(209 77% 71%)',
            danger: 'hsl(9 31% 65%)',
            warning: 'hsl(52 22% 56%)',
            success: 'hsl(147 21% 58%)',
            info: 'hsl(217 34% 65%)',
        }
    };

    let currentColorScheme = null;
    const STORAGE_KEY = 'user-color-scheme';
    const listeners = [];

    /**
     * Converte una chiave snake_case in kebab-case per le variabili CSS
     * es. "bg_dark" → "--colors-bg-dark", "text_muted" → "--colors-text-muted"
     * @param {string} key
     * @returns {string}
     */
    function toCssVarName(key) {
        return `--colors-${key.replaceAll('_', '-')}`;
    }

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
     * Aggiorna le variabili CSS con i colori dello schema corrente
     */
    function updateThemeColors() {
        const colors = colorScheme[currentColorScheme];
        if (!colors) {
            console.error(`Impossibile trovare i colori per lo schema: ${currentColorScheme}`);
            return;
        }

        const root = document.documentElement;
        for (const [key, value] of Object.entries(colors)) {
            root.style.setProperty(toCssVarName(key), value);
        }

        notifyListeners(currentColorScheme);
    }

    /**
     * Cambia lo schema colore
     * @param {'light'|'dark'} scheme
     * @returns {boolean} True se il cambio è avvenuto con successo
     */
    function changeColorScheme(scheme) {
        if (!colorScheme[scheme]) {
            console.error(`Schema colore non valido: "${scheme}". Valori accettati: ${Object.keys(colorScheme).join(', ')}`);
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
     * Ottiene tutti gli schemi disponibili
     * @returns {string[]}
     */
    function getAvailableSchemes() {
        return Object.keys(colorScheme);
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

        const initialScheme = savedScheme && colorScheme[savedScheme]
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
        getAvailableSchemes,
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