const traduzioni = {
    "it": {
        titolo: "Oliva gessi",
    },
    "en": {
        titolo: "Oliva gessi",
    }
}

var state = "it";

function changeStateTo(_state) {
    if(_state !== "it" && _state !== "en") {
        _state = "it";
    }
    state = _state;
}
function changeState() {
    if(state === "it") {
        state = "en";
    } else {
        state = "it";
    }
}

function getTesto(key) {
    return traduzioni[state][key];
}