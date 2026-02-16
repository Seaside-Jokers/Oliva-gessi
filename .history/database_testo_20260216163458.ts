const traduzioni : any = {
    "it": {
        titolo: "Oliva gessi",
    },
    "en": {
        titolo: "Oliva gessi",
    }
}

class database {
    state : string;
    constructor() {
        this.state = "it";
    }
    getContent(key : string) : string {
        return traduzioni[this.state][key];
    }
    changeState() : void {
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