const TextSizeManager = (() => {
    const STORAGE_KEY = 'user-text-size';
    const BASE_SIZE = 8; // px — deve combaciare con --default-size in style.css
    const scales = { normal: 1, large: 1.15, xlarge: 1.3 };

    /**
     * Applica la scala visivamente, senza toccare localStorage.
     * @param {'normal'|'large'|'xlarge'} sizeKey
     */
    function applyScale(sizeKey) {
        const scale = scales[sizeKey] ?? 1;
        document.documentElement.style.setProperty('--default-size', `${BASE_SIZE * scale}px`);
    }

    /**
     * Imposta e salva la dimensione scelta dall'utente.
     * @param {'normal'|'large'|'xlarge'} sizeKey
     * @returns {boolean} True se il valore era valido
     */
    function setSize(sizeKey) {
        if (!(sizeKey in scales)) return false;
        applyScale(sizeKey);
        try {
            localStorage.setItem(STORAGE_KEY, sizeKey);
        } catch (e) {
            console.warn('Impossibile salvare la dimensione del testo:', e);
        }
        return true;
    }

    /**
     * Rimuove la preferenza salvata e torna alla dimensione base.
     */
    function resetToDefault() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn('Impossibile rimuovere la preferenza di dimensione:', e);
        }
        applyScale('normal');
    }

    /**
     * True se l'utente ha esplicitamente scelto una dimensione diversa da quella base.
     * @returns {boolean}
     */
    function hasUserPreference() {
        try {
            return localStorage.getItem(STORAGE_KEY) !== null;
        } catch (e) {
            return false;
        }
    }

    /**
     * @returns {'normal'|'large'|'xlarge'} La dimensione attualmente salvata (o 'normal' di default)
     */
    function getCurrentSize() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved && saved in scales ? saved : 'normal';
        } catch (e) {
            return 'normal';
        }
    }

    function init() {
        applyScale(getCurrentSize());
    }

    return {
        init,
        setSize,
        resetToDefault,
        hasUserPreference,
        getCurrentSize
    };
})();

window.TextSizeManager = TextSizeManager;

// Inizializza automaticamente quando il DOM è pronto (stesso pattern di ThemeManager)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', TextSizeManager.init);
} else {
    TextSizeManager.init();
}
