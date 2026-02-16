const ThemeManager = (() => {
    const colorScheme = {
        "light": {
            "primary": "hsl(50, 76%, 24%)",
            "surfaceTint": "hsl(50, 76%, 24%)",
            "onPrimary": "hsl(0, 0%, 100%)",
            "primaryContainer": "hsl(48, 89%, 75%)",
            "onPrimaryContainer": "hsl(51, 100%, 16%)",
            "secondary": "hsl(47, 23%, 33%)",
            "onSecondary": "hsl(0, 0%, 100%)",
            "secondaryContainer": "hsl(46, 60%, 84%)",
            "onSecondaryContainer": "hsl(48, 30%, 24%)",
            "tertiary": "hsl(139, 21%, 33%)",
            "onTertiary": "hsl(0, 0%, 100%)",
            "tertiaryContainer": "hsl(134, 51%, 85%)",
            "onTertiaryContainer": "hsl(141, 28%, 24%)",
            "error": "hsl(0, 75%, 42%)",
            "onError": "hsl(0, 0%, 100%)",
            "errorContainer": "hsl(6, 100%, 92%)",
            "onErrorContainer": "hsl(356, 100%, 29%)",
            "background": "hsl(39, 100%, 97%)",
            "onBackground": "hsl(44, 22%, 10%)",
            "surface": "hsl(39, 100%, 97%)",
            "onSurface": "hsl(44, 22%, 10%)",
            "surfaceVariant": "hsl(42, 38%, 87%)",
            "onSurfaceVariant": "hsl(47, 14%, 26%)",
            "outline": "hsl(46, 9%, 45%)",
            "outlineVariant": "hsl(43, 20%, 75%)",
            "shadow": "hsl(0, 0%, 0%)",
            "scrim": "hsl(0, 0%, 0%)",
            "inverseSurface": "hsl(45, 13%, 18%)",
            "inverseOnSurface": "hsl(40, 57%, 93%)",
            "inversePrimary": "hsl(48, 60%, 65%)",
            "primaryFixed": "hsl(48, 89%, 75%)",
            "onPrimaryFixed": "hsl(48, 100%, 7%)",
            "primaryFixedDim": "hsl(48, 60%, 65%)",
            "onPrimaryFixedVariant": "hsl(51, 100%, 16%)",
            "secondaryFixed": "hsl(46, 60%, 84%)",
            "onSecondaryFixed": "hsl(48, 78%, 7%)",
            "secondaryFixedDim": "hsl(46, 34%, 73%)",
            "onSecondaryFixedVariant": "hsl(48, 30%, 24%)",
            "tertiaryFixed": "hsl(134, 51%, 85%)",
            "onTertiaryFixed": "hsl(147, 100%, 6%)",
            "tertiaryFixedDim": "hsl(135, 29%, 74%)",
            "onTertiaryFixedVariant": "hsl(141, 28%, 24%)",
            "surfaceDim": "hsl(39, 24%, 84%)",
            "surfaceBright": "hsl(39, 100%, 97%)",
            "surfaceContainerLowest": "hsl(0, 0%, 100%)",
            "surfaceContainerLow": "hsl(40, 68%, 94%)",
            "surfaceContainer": "hsl(40, 49%, 92%)",
            "surfaceContainerHigh": "hsl(42, 37%, 89%)",
            "surfaceContainerHighest": "hsl(42, 30%, 87%)"
        },
        "light-medium-contrast": {
            "primary": "hsl(51, 100%, 13%)",
            "surfaceTint": "hsl(50, 76%, 24%)",
            "onPrimary": "hsl(0, 0%, 100%)",
            "primaryContainer": "hsl(49, 61%, 30%)",
            "onPrimaryContainer": "hsl(0, 0%, 100%)",
            "secondary": "hsl(49, 38%, 17%)",
            "onSecondary": "hsl(0, 0%, 100%)",
            "secondaryContainer": "hsl(48, 20%, 38%)",
            "onSecondaryContainer": "hsl(0, 0%, 100%)",
            "tertiary": "hsl(143, 39%, 17%)",
            "onTertiary": "hsl(0, 0%, 100%)",
            "tertiaryContainer": "hsl(139, 18%, 39%)",
            "onTertiaryContainer": "hsl(0, 0%, 100%)",
            "error": "hsl(357, 100%, 23%)",
            "onError": "hsl(0, 0%, 100%)",
            "errorContainer": "hsl(2, 68%, 48%)",
            "onErrorContainer": "hsl(0, 0%, 100%)",
            "background": "hsl(39, 100%, 97%)",
            "onBackground": "hsl(44, 22%, 10%)",
            "surface": "hsl(39, 100%, 97%)",
            "onSurface": "hsl(48, 36%, 5%)",
            "surfaceVariant": "hsl(42, 38%, 87%)",
            "onSurfaceVariant": "hsl(46, 17%, 19%)",
            "outline": "hsl(44, 12%, 30%)",
            "outlineVariant": "hsl(45, 10%, 41%)",
            "shadow": "hsl(0, 0%, 0%)",
            "scrim": "hsl(0, 0%, 0%)",
            "inverseSurface": "hsl(45, 13%, 18%)",
            "inverseOnSurface": "hsl(40, 57%, 93%)",
            "inversePrimary": "hsl(48, 60%, 65%)",
            "primaryFixed": "hsl(49, 61%, 30%)",
            "onPrimaryFixed": "hsl(0, 0%, 100%)",
            "primaryFixedDim": "hsl(51, 94%, 20%)",
            "onPrimaryFixedVariant": "hsl(0, 0%, 100%)",
            "secondaryFixed": "hsl(48, 20%, 38%)",
            "onSecondaryFixed": "hsl(0, 0%, 100%)",
            "secondaryFixedDim": "hsl(49, 25%, 29%)",
            "onSecondaryFixedVariant": "hsl(0, 0%, 100%)",
            "tertiaryFixed": "hsl(139, 18%, 39%)",
            "onTertiaryFixed": "hsl(0, 0%, 100%)",
            "tertiaryFixedDim": "hsl(139, 23%, 29%)",
            "onTertiaryFixedVariant": "hsl(0, 0%, 100%)",
            "surfaceDim": "hsl(41, 16%, 76%)",
            "surfaceBright": "hsl(39, 100%, 97%)",
            "surfaceContainerLowest": "hsl(0, 0%, 100%)",
            "surfaceContainerLow": "hsl(40, 68%, 94%)",
            "surfaceContainer": "hsl(42, 37%, 89%)",
            "surfaceContainerHigh": "hsl(39, 26%, 85%)",
            "surfaceContainerHighest": "hsl(41, 19%, 81%)"
        },
        "light-high-contrast": {
            "primary": "hsl(50, 100%, 10%)",
            "surfaceTint": "hsl(50, 76%, 24%)",
            "onPrimary": "hsl(0, 0%, 100%)",
            "primaryContainer": "hsl(50, 100%, 17%)",
            "onPrimaryContainer": "hsl(0, 0%, 100%)",
            "secondary": "hsl(49, 47%, 13%)",
            "onSecondary": "hsl(0, 0%, 100%)",
            "secondaryContainer": "hsl(48, 28%, 25%)",
            "onSecondaryContainer": "hsl(0, 0%, 100%)",
            "tertiary": "hsl(146, 52%, 13%)",
            "onTertiary": "hsl(0, 0%, 100%)",
            "tertiaryContainer": "hsl(141, 27%, 25%)",
            "onTertiaryContainer": "hsl(0, 0%, 100%)",
            "error": "hsl(357, 100%, 19%)",
            "onError": "hsl(0, 0%, 100%)",
            "errorContainer": "hsl(356, 100%, 30%)",
            "onErrorContainer": "hsl(0, 0%, 100%)",
            "background": "hsl(39, 100%, 97%)",
            "onBackground": "hsl(44, 22%, 10%)",
            "surface": "hsl(39, 100%, 97%)",
            "onSurface": "hsl(0, 0%, 0%)",
            "surfaceVariant": "hsl(42, 38%, 87%)",
            "onSurfaceVariant": "hsl(0, 0%, 0%)",
            "outline": "hsl(48, 19%, 15%)",
            "outlineVariant": "hsl(47, 13%, 27%)",
            "shadow": "hsl(0, 0%, 0%)",
            "scrim": "hsl(0, 0%, 0%)",
            "inverseSurface": "hsl(45, 13%, 18%)",
            "inverseOnSurface": "hsl(0, 0%, 100%)",
            "inversePrimary": "hsl(48, 60%, 65%)",
            "primaryFixed": "hsl(50, 100%, 17%)",
            "onPrimaryFixed": "hsl(0, 0%, 100%)",
            "primaryFixedDim": "hsl(50, 100%, 12%)",
            "onPrimaryFixedVariant": "hsl(0, 0%, 100%)",
            "secondaryFixed": "hsl(48, 28%, 25%)",
            "onSecondaryFixed": "hsl(0, 0%, 100%)",
            "secondaryFixedDim": "hsl(49, 41%, 16%)",
            "onSecondaryFixedVariant": "hsl(0, 0%, 100%)",
            "tertiaryFixed": "hsl(141, 27%, 25%)",
            "onTertiaryFixed": "hsl(0, 0%, 100%)",
            "tertiaryFixedDim": "hsl(145, 43%, 16%)",
            "onTertiaryFixedVariant": "hsl(0, 0%, 100%)",
            "surfaceDim": "hsl(41, 13%, 71%)",
            "surfaceBright": "hsl(39, 100%, 97%)",
            "surfaceContainerLowest": "hsl(0, 0%, 100%)",
            "surfaceContainerLow": "hsl(40, 57%, 93%)",
            "surfaceContainer": "hsl(42, 30%, 87%)",
            "surfaceContainerHigh": "hsl(42, 21%, 82%)",
            "surfaceContainerHighest": "hsl(41, 16%, 76%)"
        },
        "dark": {
            "primary": "hsl(48, 60%, 65%)",
            "surfaceTint": "hsl(48, 60%, 65%)",
            "onPrimary": "hsl(50, 100%, 11%)",
            "primaryContainer": "hsl(51, 100%, 16%)",
            "onPrimaryContainer": "hsl(48, 89%, 75%)",
            "secondary": "hsl(46, 34%, 73%)",
            "onSecondary": "hsl(49, 42%, 15%)",
            "secondaryContainer": "hsl(48, 30%, 24%)",
            "onSecondaryContainer": "hsl(46, 60%, 84%)",
            "tertiary": "hsl(135, 29%, 74%)",
            "onTertiary": "hsl(146, 47%, 15%)",
            "tertiaryContainer": "hsl(141, 28%, 24%)",
            "onTertiaryContainer": "hsl(134, 51%, 85%)",
            "error": "hsl(6, 100%, 84%)",
            "onError": "hsl(357, 100%, 21%)",
            "errorContainer": "hsl(356, 100%, 29%)",
            "onErrorContainer": "hsl(6, 100%, 92%)",
            "background": "hsl(48, 31%, 6%)",
            "onBackground": "hsl(42, 30%, 87%)",
            "surface": "hsl(48, 31%, 6%)",
            "onSurface": "hsl(42, 30%, 87%)",
            "surfaceVariant": "hsl(47, 14%, 26%)",
            "onSurfaceVariant": "hsl(43, 20%, 75%)",
            "outline": "hsl(44, 9%, 55%)",
            "outlineVariant": "hsl(47, 14%, 26%)",
            "shadow": "hsl(0, 0%, 0%)",
            "scrim": "hsl(0, 0%, 0%)",
            "inverseSurface": "hsl(42, 30%, 87%)",
            "inverseOnSurface": "hsl(45, 13%, 18%)",
            "inversePrimary": "hsl(50, 76%, 24%)",
            "primaryFixed": "hsl(48, 89%, 75%)",
            "onPrimaryFixed": "hsl(48, 100%, 7%)",
            "primaryFixedDim": "hsl(48, 60%, 65%)",
            "onPrimaryFixedVariant": "hsl(51, 100%, 16%)",
            "secondaryFixed": "hsl(46, 60%, 84%)",
            "onSecondaryFixed": "hsl(48, 78%, 7%)",
            "secondaryFixedDim": "hsl(46, 34%, 73%)",
            "onSecondaryFixedVariant": "hsl(48, 30%, 24%)",
            "tertiaryFixed": "hsl(134, 51%, 85%)",
            "onTertiaryFixed": "hsl(147, 100%, 6%)",
            "tertiaryFixedDim": "hsl(135, 29%, 74%)",
            "onTertiaryFixedVariant": "hsl(141, 28%, 24%)",
            "surfaceDim": "hsl(48, 31%, 6%)",
            "surfaceBright": "hsl(45, 11%, 21%)",
            "surfaceContainerLowest": "hsl(47, 39%, 5%)",
            "surfaceContainerLow": "hsl(44, 22%, 10%)",
            "surfaceContainer": "hsl(49, 19%, 11%)",
            "surfaceContainerHigh": "hsl(45, 15%, 15%)",
            "surfaceContainerHighest": "hsl(46, 13%, 19%)"
        },
        "dark-medium-contrast": {
            "primary": "hsl(48, 81%, 73%)",
            "surfaceTint": "hsl(48, 60%, 65%)",
            "onPrimary": "hsl(49, 100%, 9%)",
            "primaryContainer": "hsl(49, 44%, 44%)",
            "onPrimaryContainer": "hsl(0, 0%, 0%)",
            "secondary": "hsl(46, 52%, 81%)",
            "onSecondary": "hsl(48, 56%, 11%)",
            "secondaryContainer": "hsl(47, 18%, 52%)",
            "onSecondaryContainer": "hsl(0, 0%, 0%)",
            "tertiary": "hsl(134, 44%, 83%)",
            "onTertiary": "hsl(147, 69%, 10%)",
            "tertiaryContainer": "hsl(137, 15%, 53%)",
            "onTertiaryContainer": "hsl(0, 0%, 0%)",
            "error": "hsl(7, 100%, 90%)",
            "onError": "hsl(358, 100%, 16%)",
            "errorContainer": "hsl(4, 100%, 64%)",
            "onErrorContainer": "hsl(0, 0%, 0%)",
            "background": "hsl(48, 31%, 6%)",
            "onBackground": "hsl(42, 30%, 87%)",
            "surface": "hsl(48, 31%, 6%)",
            "onSurface": "hsl(0, 0%, 100%)",
            "surfaceVariant": "hsl(47, 14%, 26%)",
            "onSurfaceVariant": "hsl(43, 31%, 84%)",
            "outline": "hsl(42, 14%, 67%)",
            "outlineVariant": "hsl(44, 9%, 55%)",
            "shadow": "hsl(0, 0%, 0%)",
            "scrim": "hsl(0, 0%, 0%)",
            "inverseSurface": "hsl(42, 30%, 87%)",
            "inverseOnSurface": "hsl(45, 15%, 15%)",
            "inversePrimary": "hsl(50, 100%, 17%)",
            "primaryFixed": "hsl(48, 89%, 75%)",
            "onPrimaryFixed": "hsl(46, 100%, 4%)",
            "primaryFixedDim": "hsl(48, 60%, 65%)",
            "onPrimaryFixedVariant": "hsl(51, 100%, 13%)",
            "secondaryFixed": "hsl(46, 60%, 84%)",
            "onSecondaryFixed": "hsl(46, 100%, 4%)",
            "secondaryFixedDim": "hsl(46, 34%, 73%)",
            "onSecondaryFixedVariant": "hsl(49, 38%, 17%)",
            "tertiaryFixed": "hsl(134, 51%, 85%)",
            "onTertiaryFixed": "hsl(143, 100%, 4%)",
            "tertiaryFixedDim": "hsl(135, 29%, 74%)",
            "onTertiaryFixedVariant": "hsl(143, 39%, 17%)",
            "surfaceDim": "hsl(48, 31%, 6%)",
            "surfaceBright": "hsl(43, 11%, 25%)",
            "surfaceContainerLowest": "hsl(40, 50%, 2%)",
            "surfaceContainerLow": "hsl(44, 21%, 10%)",
            "surfaceContainer": "hsl(49, 15%, 14%)",
            "surfaceContainerHigh": "hsl(45, 13%, 18%)",
            "surfaceContainerHighest": "hsl(42, 11%, 23%)"
        },
        "dark-high-contrast": {
            "primary": "hsl(47, 100%, 86%)",
            "surfaceTint": "hsl(48, 60%, 65%)",
            "onPrimary": "hsl(0, 0%, 0%)",
            "primaryContainer": "hsl(48, 57%, 63%)",
            "onPrimaryContainer": "hsl(44, 100%, 3%)",
            "secondary": "hsl(46, 89%, 89%)",
            "onSecondary": "hsl(0, 0%, 0%)",
            "secondaryContainer": "hsl(46, 32%, 71%)",
            "onSecondaryContainer": "hsl(44, 100%, 3%)",
            "tertiary": "hsl(134, 80%, 90%)",
            "onTertiary": "hsl(0, 0%, 0%)",
            "tertiaryContainer": "hsl(135, 28%, 72%)",
            "onTertiaryContainer": "hsl(140, 100%, 3%)",
            "error": "hsl(8, 100%, 96%)",
            "onError": "hsl(0, 0%, 0%)",
            "errorContainer": "hsl(7, 100%, 82%)",
            "onErrorContainer": "hsl(358, 100%, 7%)",
            "background": "hsl(48, 31%, 6%)",
            "onBackground": "hsl(42, 30%, 87%)",
            "surface": "hsl(48, 31%, 6%)",
            "onSurface": "hsl(0, 0%, 100%)",
            "surfaceVariant": "hsl(47, 14%, 26%)",
            "onSurfaceVariant": "hsl(0, 0%, 100%)",
            "outline": "hsl(42, 62%, 92%)",
            "outlineVariant": "hsl(42, 18%, 74%)",
            "shadow": "hsl(0, 0%, 0%)",
            "scrim": "hsl(0, 0%, 0%)",
            "inverseSurface": "hsl(42, 30%, 87%)",
            "inverseOnSurface": "hsl(0, 0%, 0%)",
            "inversePrimary": "hsl(50, 100%, 17%)",
            "primaryFixed": "hsl(48, 89%, 75%)",
            "onPrimaryFixed": "hsl(0, 0%, 0%)",
            "primaryFixedDim": "hsl(48, 60%, 65%)",
            "onPrimaryFixedVariant": "hsl(46, 100%, 4%)",
            "secondaryFixed": "hsl(46, 60%, 84%)",
            "onSecondaryFixed": "hsl(0, 0%, 0%)",
            "secondaryFixedDim": "hsl(46, 34%, 73%)",
            "onSecondaryFixedVariant": "hsl(46, 100%, 4%)",
            "tertiaryFixed": "hsl(134, 51%, 85%)",
            "onTertiaryFixed": "hsl(0, 0%, 0%)",
            "tertiaryFixedDim": "hsl(135, 29%, 74%)",
            "onTertiaryFixedVariant": "hsl(143, 100%, 4%)",
            "surfaceDim": "hsl(48, 31%, 6%)",
            "surfaceBright": "hsl(46, 8%, 30%)",
            "surfaceContainerLowest": "hsl(0, 0%, 0%)",
            "surfaceContainerLow": "hsl(49, 19%, 11%)",
            "surfaceContainer": "hsl(45, 13%, 18%)",
            "surfaceContainerHigh": "hsl(45, 11%, 22%)",
            "surfaceContainerHighest": "hsl(46, 10%, 26%)"
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