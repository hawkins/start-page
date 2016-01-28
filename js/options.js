
function saveSettings() {
    for (i = 1; i <= 12; i++) {
        // Define variables
        var id = "#l" + i.toString()
        var linkid = "l" + i.toString() + "link";
        var titleid = "l" + i.toString() + "title";
        // Now save in these keys
        chrome.storage.local.set({linkid: $(id).attr("href")}, function () {
            console.log("Saved " + linkid + " " + $(id).attr("href"));
        });
        chrome.storage.local.set({titleid: $(id).innerHTML}, function () {
            console.log("Saved " + titleid);
        });

    }
}

function loadSettings() {
    for (var i = 1; i <= 12; i++) {
        // Define variables
        var id = "#l" + i.toString()
        var linkid = "l" + i.toString() + "link";
        var titleid = "l" + i.toString() + "title";
        // Load from these keys
        chrome.storage.local.get(linkid, function (result) {
            // Set the link now
            console.log(result)
            console.log(result[linkid])
            $(id).attr("href", result[linkid])
        });
        chrome.storage.local.get(titleid, function (result) {
            // Set the title now
            $(id).innerHTML = result;
        });
    }
    // for (i = 0; i < a.length; i++) {
    //     select = $(a[i]);
    //     var link = localStorage[links[i]];
    //     if (link.indexOf("http://") <= -1){
    //         link = "http://"+link;
    //     }
    //     select.prop("href", link);
    //     select.text(localStorage[labels[i]]);
    // }
}
