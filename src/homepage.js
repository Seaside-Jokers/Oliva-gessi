function clampTesti() {
    if (!document.querySelector('.foto-blocco')) return;
    document.querySelectorAll('.blocco').forEach(blocco => {
        const img    = blocco.querySelector('.foto-blocco');
        const testo  = blocco.querySelector('.testo-blocco');
        const titolo = blocco.querySelector('.titolo-blocco');
        const btn    = blocco.querySelector('.read-more-button');
        if (!img || !testo) return;

        // Altezza reale della foto (rispetta aspect-ratio e zoom)
        const imgH = img.getBoundingClientRect().height;

        // Spazio occupato da titolo e pulsante (margini inclusi)
        const titleH = titolo ? titolo.getBoundingClientRect().height
                                + parseFloat(getComputedStyle(titolo).marginTop)
                                + parseFloat(getComputedStyle(titolo).marginBottom)
                              : 0;
        const btnH   = btn    ? btn.getBoundingClientRect().height
                                + parseFloat(getComputedStyle(btn).marginTop)
                                + parseFloat(getComputedStyle(btn).marginBottom)
                              : 0;

        // Padding del container
        const contStyle = getComputedStyle(testo.parentElement);
        const padV = parseFloat(contStyle.paddingTop) + parseFloat(contStyle.paddingBottom);

        const disponibile = imgH - titleH - btnH - padV
                            - parseFloat(getComputedStyle(testo).marginTop)
                            - parseFloat(getComputedStyle(testo).marginBottom);

        const lineH = parseFloat(getComputedStyle(testo).lineHeight);
        const righe = Math.max(1, Math.floor(disponibile / lineH));

        testo.style.webkitLineClamp = righe;
        testo.style.lineClamp       = righe;
    });
}

// Ricalcola ad ogni resize (zoom incluso) e al caricamento immagini
window.addEventListener('resize', clampTesti);
document.querySelectorAll('.foto-blocco').forEach(img => {
    img.addEventListener('load', clampTesti);
    if (img.complete) clampTesti();
});
document.addEventListener('DOMContentLoaded', clampTesti);