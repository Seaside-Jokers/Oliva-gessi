class IconEl extends HTMLElement {
    connectedCallback() {
        const src = this.getAttribute('src');
        if (!src) return;

        const observer = new IntersectionObserver((entries, obs) => {
            if (!entries[0].isIntersecting) return;
            obs.disconnect();
            this.#load(src);
        }, { rootMargin: '200px' }); // inizia a caricare 200px prima che sia visibile

        observer.observe(this);
    }

    async #load(src) {
        const res = await fetch(src);
        const text = await res.text();
        this.innerHTML = text;
        this.querySelector('svg')?.setAttribute('class', 'icone-svg');
    }
}
customElements.define('icon-el', IconEl);