const traduzioni = {
    "it": {
        titolo: "Oliva gessi",
    },
    "en": {
        titolo: "Oliva gessi",
    }
}

class database {
    constructor() {
        this.state = "it";
    }
    getContent(key) {
        return traduzioni[this.state][key];
    }
    changeState() {
        if (this.state === "it") 
    }
}