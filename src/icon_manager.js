class IconEl extends HTMLElement {
    async connectedCallback() {
        const src = this.getAttribute('src');
        if (!src) return;
        const res  = await fetch(src);
        const text = await res.text();
        this.innerHTML = text;
        // Propaga le classi all'SVG interno
        this.querySelector('svg')?.setAttribute('class', 'icone-svg');
    }
}
customElements.define('icon-el', IconEl);