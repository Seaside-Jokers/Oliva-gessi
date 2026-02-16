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
        if (this.state === "it") {
            this.state = "en";
        }
        else {
            this.state = "it";
        }
    }
    changeState(state) {
        if (state !== "it" && state !== "en") {
            state = "it";
        }
        this.state = state;
    }
}