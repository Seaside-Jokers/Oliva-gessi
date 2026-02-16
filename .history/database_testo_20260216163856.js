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
    if(_state != "it" && _state != "en") {
    state = _state;
}
