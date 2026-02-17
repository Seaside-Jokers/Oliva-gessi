const ThemeManager = (() => {
    const colorScheme = {
        light: {
            bg_dark: "hsl(30 58% 88%)";
            bg: hsl(30 100% 94%);
            bg_light: hsl(30 100% 99%);
            text: hsl(17 100% 4%);
            text_muted: hsl(32 47% 25%);
            highlight: hsl(31 100% 97%);
            border: hsl(31 26% 47%);
            border_muted: hsl(31 31% 59%);
            primary: hsl(37 100% 17%);
            secondary: hsl(206 82% 26%);
            danger: hsl(9 25% 41%);
            warning: hsl(51 29% 33%);
            success: hsl(148 24% 35%);
            info: hsl(217 26% 42%);
        }
    };

    let currentColorScheme = null;
    const STORAGE_KEY = 'user-color-scheme';
    const listeners = [];

    /**
     * Estrae il livello di contrasto dallo schema corrente
     * @param {string} scheme - Nome dello schema (es. 'dark-high-contrast')
     * @returns {string} Il livello di contrasto ('', 'medium-contrast', 'high-contrast')
     */
    function getContrastLevel(scheme) {
        if (scheme.includes('high-contrast')) return 'high-contrast';
        if (scheme.includes('medium-contrast')) return 'medium-contrast';
        return '';
    }

    /**
     * Ottiene lo schema colore preferito dal sistema operativo
     * @returns {string} 'dark' o 'light'
     */
    function getBrowserColorScheme() {
        if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
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
        
        // Applica ogni colore come variabile CSS
        for (const [key, value] of Object.entries(colors)) {
            const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            root.style.setProperty(`--colors-${cssVarName}`, value);
        }

        // Notifica i listener del cambio tema
        notifyListeners(currentColorScheme);
    }

    /**
     * Cambia lo schema colore
     * @param {string} scheme - Nome dello schema da applicare
     * @returns {boolean} True se il cambio è avvenuto con successo
     */
    function changeColorScheme(scheme) {
        if (!colorScheme[scheme]) {
            console.error(`Schema colore non valido: ${scheme}`);
            return false;
        }
        
        currentColorScheme = scheme;
        updateThemeColors();
        
        // Salva la preferenza in localStorage
        try {
            localStorage.setItem(STORAGE_KEY, scheme);
        } catch (e) {
            console.warn('Impossibile salvare le preferenze tema:', e);
        }
        
        return true;
    }

    /**
     * Alterna tra modalità chiara e scura mantenendo il livello di contrasto
     */
    function toggleLightDark() {
        const isDark = currentColorScheme.startsWith('dark');
        const contrastLevel = getContrastLevel(currentColorScheme);
        
        const newScheme = isDark 
            ? (contrastLevel ? `light-${contrastLevel}` : 'light')
            : (contrastLevel ? `dark-${contrastLevel}` : 'dark');
        
        changeColorScheme(newScheme);
    }

    /**
     * Imposta lo schema colore con livello di contrasto opzionale
     * @param {string} scheme - 'light' o 'dark'
     * @param {string} contrastLevel - '', 'medium-contrast' o 'high-contrast'
     */
    function setColorScheme(scheme, contrastLevel = '') {
        const fullScheme = contrastLevel ? `${scheme}-${contrastLevel}` : scheme;
        changeColorScheme(fullScheme);
    }

    /**
     * Registra un listener per i cambiamenti di tema
     * @param {Function} callback - Funzione chiamata quando il tema cambia
     * @returns {Function} Funzione per rimuovere il listener
     */
    function addThemeChangeListener(callback) {
        if (typeof callback !== 'function') {
            console.error('Il listener deve essere una funzione');
            return () => {};
        }
        
        listeners.push(callback);
        
        // Restituisce funzione per rimuovere il listener
        return () => {
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }

    /**
     * Notifica tutti i listener del cambio tema
     * @param {string} newScheme - Il nuovo schema applicato
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
        
        const systemScheme = getBrowserColorScheme();
        changeColorScheme(systemScheme);
    }

    /**
     * Ottiene tutti gli schemi disponibili
     * @returns {string[]} Array con i nomi di tutti gli schemi disponibili
     */
    function getAvailableSchemes() {
        return Object.keys(colorScheme);
    }

    /**
     * Verifica se lo schema corrente è scuro
     * @returns {boolean} True se il tema corrente è scuro
     */
    function isDarkMode() {
        return currentColorScheme?.startsWith('dark') ?? false;
    }

    /**
     * Inizializza il sistema di gestione temi
     */
    function init() {
        // 1. Cerca una preferenza salvata
        let savedScheme = null;
        try {
            savedScheme = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            console.warn('Impossibile leggere le preferenze tema:', e);
        }

        // 2. Usa quella salvata se valida, altrimenti usa quella del sistema
        const initialScheme = savedScheme && colorScheme[savedScheme] 
            ? savedScheme 
            : getBrowserColorScheme();
        
        changeColorScheme(initialScheme);

        // 3. Ascolta i cambiamenti di preferenza di sistema
        const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
        if (mediaQuery) {
            mediaQuery.addEventListener('change', (e) => {
                // Aggiorna solo se non c'è una preferenza salvata dall'utente
                try {
                    const hasSavedPreference = localStorage.getItem(STORAGE_KEY);
                    if (!hasSavedPreference) {
                        const systemScheme = e.matches ? 'dark' : 'light';
                        const contrastLevel = getContrastLevel(currentColorScheme);
                        setColorScheme(systemScheme, contrastLevel);
                    }
                } catch (err) {
                    console.warn('Errore nella gestione del cambio tema di sistema:', err);
                }
            });
        }
    }

    // Espone l'API pubblica
    return {
        init,
        changeColorScheme,
        toggleLightDark,
        setColorScheme,
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