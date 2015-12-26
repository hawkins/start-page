var headers = ["b1h", "b2h", "b3h"];
var a = ["b1a1", "b1a2", "b1a3", "b1a4", "b2a1", "b2a2", "b2a3", "b2a4", "b3a1", "b3a2", "b3a3", "b3a4"];
var labels = ["b1a1label", "b1a2label", "b1a3label", "b1a4label", "b2a1label", "b2a2label", "b2a3label", "b2a4label", "b3a1label", "b3a2label", "b3a3label", "b3a4label"];
var links = ["b1a1link", "b1a2link", "b1a3link", "b1a4link", "b2a1link", "b2a2link", "b2a3link", "b2a4link", "b3a1link", "b3a2link", "b3a3link", "b3a4link"];
var select;

function saveSettings() {
    for (i = 0; i < headers.length; i++) {
        select = $(headers[i]);
        localStorage[headers[i]] = select.val();
    }
    for (i = 0; i < labels.length; i++) {
        select = $(labels[i]);
        localStorage[labels[i]] = select.val();
    }
    for (i = 0; i < links.length; i++) {
        select = $(links[i]);
        localStorage[links[i]] = select.val();
    }
}

function loadSettings() {
    for (i = 0; i < headers.length; i++) {
        $(headers[i]).text(localStorage[headers[i]]);
    }
    for (i = 0; i < a.length; i++) {
        select = $(a[i]);
        var link = localStorage[links[i]];
        if (link.indexOf("http://") <= -1){
            link = "http://"+link;
        }
        select.prop("href", link);
        select.text(localStorage[labels[i]]);
    }
}
