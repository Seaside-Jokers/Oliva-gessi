const traduzioni = {
    "it": {
        titolo: "Oliva gessi",
    },
    en: {
        titolo: "Oliva gessi",
    }
}

class database {
    constructor() {
        this.state = traduzioni.it;
    }
    getContent(key) {
        return this.state[key];
    }
}