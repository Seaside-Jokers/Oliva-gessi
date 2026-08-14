/* -------------------------------------------------------------------------- */
/*  TRADUZIONI · HOMEPAGE E INTESTAZIONI (usata anche da storia/luoghi/personaggi)                                             */
/*  File: src/i18n/home.js                                                          */
/* -------------------------------------------------------------------------- */
/*  Formato: una chiave unica per voce → { it, en }.                                   */
/*  Dove la traduzione inglese non è ancora pronta il campo resta vuoto ("").          */
/* -------------------------------------------------------------------------- */

window.T = Object.assign(window.T || {}, {
    intestazione_titolo: { it: "Benvenuti a Oliva Gessi!", en: "Welcome to Oliva Gessi!" },
    intestazione_contenuto: { it: "Scoprite con noi Oliva Gessi, borgo suggestivo dalla sua storia millenaria e tradizioni uniche", en: "Discover with us the captivating village of Oliva Gessi, with its millenary history and unique traditions" },
    title_1: { it: "Storia del comune", en: "History of the town" },
    testo_1: {
        it: "Oliva Gessi, piccolo paradiso sulle colline dell'Oltrepò Pavese, è un comune dalle radici antichissime: risale " +
            "al periodo romano o, secondo alcune testimonianze, perfino preromano.<br>Attraverso i secoli, il borgo ha " +
            "vissuto stagioni storiche cruciali, forgiando tradizioni che sopravvivono ancora oggi.<br>Il suo nome unico è " +
            "l'unione di due parti, ognuna delle quali racconta un pezzo di storia: Oliva, probabilmente dall'olivo " +
            "secolare che si trova davanti alla parrocchia, e Gessi, dalle cave di gesso situate in prossimità del " +
            "borgo.<br>La prima prova scritta proviene dal 972, quando l'imperatore Ottone I donò Oliva alla nuora, che a " +
            "sua volta la cederà a un monastero. Nel periodo dei feudi il paese farà parte del dominio di Montalto, " +
            "passando sotto le mani di varie famiglie, di cui ricordiamo in particolare la famiglia Isimbardi.",
        en: "Oliva Gessi, a small paradise nestled in the hills of Oltrepò Pavese, is a village with ancient roots dating " +
            "back to the Roman era or, according to some records, even pre-Roman times. Throughout the centuries, the " +
            "village has witnessed crucial historical periods, forging traditions that still live on today.<br>Its unique " +
            "name is a blend of two parts, each telling a piece of its history: Oliva, likely named after the centuries-old " +
            "olive tree standing before the parish church, and Gessi, from the gypsum (gesso) quarries located near the " +
            "village.<br>The first written evidence dates back to 972, when Emperor Otto I gifted Oliva to his " +
            "daughter-in-law, who later bequeathed it to a monastery. During the feudal era, the village became part of the " +
            "Montalto domain, passing through the hands of various noble families, most notably the Isimbardi family.",
    },
    title_2: { it: "Il castello", en: "The castle" },
    testo_2: {
        it: "Il castello di Oliva Gessi è il cuore antico del borgo: le sue origini risalgono al Medioevo e già nei " +
            "registri inquisitoriali del XIII secolo se ne trovano tracce legate a vicende oscure e affascinanti, come i " +
            "processi a Ottone Vilano.<br>Tra il Seicento e l'Ottocento la famiglia Isimbardi trasformò la fortezza in una " +
            "raffinata residenza signorile, simbolo del potere di una casata che guidò l'economia agricola del territorio " +
            "fino al Novecento.<br>Oggi il castello domina ancora il paese dalle colline dell'Oltrepò Pavese, testimone " +
            "silenzioso di secoli di storia.",
        en: "The castle of Oliva Gessi is the ancient heart of the village: its origins date back to the Middle Ages, and " +
            "traces of it already appear in the 13th-century inquisitorial records, linked to dark and fascinating events " +
            "such as the trials of Ottone Vilano.<br>Between the 17th and 19th centuries, the Isimbardi family transformed " +
            "the fortress into a refined noble residence, a symbol of the power of a lineage that led the local " +
            "agricultural economy until the 20th century.<br>Today the castle still overlooks the village from the hills of " +
            "Oltrepò Pavese, a silent witness to centuries of history.",
    },
    alt_img_castello: { it: "Il castello di Oliva Gessi", en: "The castle of Oliva Gessi" },
    alt_img1: { it: "Luigi Versiglia", en: "Luigi Versiglia" },
    title_3: { it: "Luoghi storici", en: "Historical landmarks" },
    testo_3: {
        it: "Tra le colline dell'Oltrepò Pavese, Oliva Gessi è un borgo dalla storia estremamente ricca, nato attorno a un " +
            "castello già attestato nel Medioevo e citato nei registri inquisitoriali del XIII secolo.<br>Tra il Seicento e " +
            "l'Ottocento gli Isimbardi trasformarono il paese in un centro rurale armonioso.<br>Qui si intrecciano vicende " +
            "come i casi inquisitoriali di Ottone Vilano e il rogo di Benvenuta, accanto alla figura di Luigi " +
            "Versiglia.<br>Il paese conserva simboli identitari come il Voltò, il giardino all'italiana, la chiesa di San " +
            "Martino (riedificata nel 1682) e il teatro parrocchiale del 1926, cuore della vita comunitaria.<br>Intorno, le " +
            "colline vitate e i terreni gessosi, sfruttati fin dall'età romana e valorizzati anche da Abramo De Benedetti, " +
            "raccontano una tradizione millenaria.",
        en: "Set among the hills of Oltrepò Pavese, Oliva Gessi is a village with an extremely rich history, born around a " +
            "castle already attested in the Middle Ages and mentioned in the 13th-century inquisitorial records.<br>Between " +
            "the 17th and 19th centuries, the Isimbardi family turned the village into a harmonious rural center.<br>Tales " +
            "of dark events intertwine here, such as the inquisitorial cases of Ottone Vilano and the burning of " +
            "Benvenuta, alongside the figure of Luigi Versiglia.<br>The village preserves iconic landmarks such as the " +
            "Voltò archway, the Italian-style garden, the Church of San Martino (rebuilt in 1682) and the parish theater of " +
            "1926, the heart of community life.<br>All around, the vine-covered hills and the gypsum-rich lands, exploited " +
            "since Roman times and enhanced by Abramo De Benedetti, tell a story of millenary tradition.",
    },
    title_4: { it: "Personaggi storici", en: "Historical characters" },
    testo_4: {
        it: "Oliva Gessi affonda le sue origini nel X secolo con Ottone I di Sassonia, che dopo aver consolidato il potere " +
            "imperiale e rafforzato il legame con la Chiesa, nel 972 donò il territorio alla nuora Teofano, segnandone la " +
            "prima attestazione e l'ingresso nei beni ecclesiastici.<br>Nei secoli successivi il borgo passò sotto varie " +
            "dominazioni, tra cui i Belcredi, influenti nell'Oltrepò Pavese grazie a incarichi politici e proprietà, e gli " +
            "Isimbardi, che trasformarono il castello in residenza e svilupparono l'agricoltura fino alla loro estinzione " +
            "nel Novecento.<br>Il paese diede i natali a Luigi Versiglia, martire in Cina nel 1930. Tra Otto e Novecento " +
            "Abramo De Benedetti introdusse innovazioni, ma la sua esperienza si concluse con la morte del figlio nella " +
            "Seconda guerra mondiale.",
        en: "Oliva Gessi traces its origins back to the 10th century with Otto I of Saxony, who, after consolidating " +
            "imperial power and strengthening his ties with the Church, donated the territory to his daughter-in-law " +
            "Theophanu in 972, marking its first attestation and its entry into ecclesiastical holdings.<br>In the " +
            "following centuries, the village passed under various dominations, including the Belcredi — influential in " +
            "Oltrepò Pavese thanks to political offices and properties — and the Isimbardi, who turned the castle into a " +
            "residence and developed agriculture until their extinction in the 20th century.<br>The village was the " +
            "birthplace of Luigi Versiglia, martyred in China in 1930. Between the 19th and 20th centuries, Abramo De " +
            "Benedetti introduced innovations, but his experience ended with the death of his son during World War II.",
    },
});
