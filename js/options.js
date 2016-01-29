
function saveSettings() {
    for (i = 1; i <= 12; i++) {
        // Define variables
        var id = "#l" + i.toString()
        var linkid = "l" + i.toString() + "link";
        var titleid = "l" + i.toString() + "title";
        // Prepare to save in these dicts
        var saveLink = {}
        save[linkid] = $(id).attr("href");
        var saveTitle = {}
        saveTitle[titleid] = $(id).html();
        // Save in chrome.storage
        chrome.storage.sync.set(saveLink, function () {
            chrome.storage.sync.get(linkid, function (result) {
                console.log("save: ");
                console.log(result[linkid])
            });
        });
        chrome.storage.sync.set(saveTitle, function () {
            chrome.storage.sync.get(titleid, function (result) {
                console.log("save: ");
                console.log(result[titleid])
            });
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
        chrome.storage.sync.get(linkid, function (result) {
            // Update the link now
            console.log("Loaded: ");
            console.log(result[linkid])
            $(id).attr("href", result[linkid])
        });
        chrome.storage.sync.get(titleid, function (result) {
            // Set the title now
            console.log("Loaded: ");
            console.log(result[titleid]);
            $(id).innerHTML = result[titleid];
        });
    }
}
