var saveLinks = {};
var saveTitles = {};
function saveSettings() {
    console.log("Saving...");
    for (i = 1; i <= 12; i++) {
        // Define variables
        var id = "#l" + i.toString()
        var linkid = "l" + i.toString() + "link";
        var titleid = "l" + i.toString() + "title";
        // Write in these dicts
        // Ensure http:// is in links
        if ($(id).attr("href").indexOf("http://") < 0 && $(id).attr("href").indexOf("https://") < 0 ) {
            $(id).attr("href", "http://"+$(id).attr("href"));
        }
        saveLinks[linkid] = $(id).attr("href");
        saveTitles[titleid] = $(id).html();

        // // Save in chrome.storage
        // chrome.storage.sync.set(saveLinks, function () {
        //     if (chrome.extension.lastError) {
        //         alert('An error occurred: ' + chrome.extension.lastError.message);
        //     }
        //     chrome.storage.sync.get(linkid, function (result) {
        //         console.log("save: ");
        //         console.log(result);
        //         console.log(result[linkid])
        //     });
        // });
        // chrome.storage.sync.set(saveTitles, function () {
        //     if (chrome.extension.lastError) {
        //         alert('An error occurred: ' + chrome.extension.lastError.message);
        //     }
        //     chrome.storage.sync.get(titleid, function (result) {
        //         console.log("save: ");
        //         console.log(result);
        //         console.log(result[titleid])
        //     });
        // });
    }
    console.log(saveLinks, saveTitles);
    // Save in chrome.storage
    chrome.storage.sync.set(saveLinks, function () {
        if (chrome.extension.lastError) {
            console.log('An error occurred: ' + chrome.extension.lastError.message);
            console.log("Please let the developer know at https://github.com/hawkins/start-page/issues");
        }
    });
    chrome.storage.sync.set(saveTitles, function () {
        if (chrome.extension.lastError) {
            console.log('An error occurred: ' + chrome.extension.lastError.message);
            console.log("Please let the developer know at https://github.com/hawkins/start-page/issues");
        }
    });
}

function loadSettings() {
    for (var i = 1; i <= 12; i++) {
        // Define variables
        var id = "#l" + i.toString()
        var linkid = "l" + i.toString() + "link";
        var titleid = "l" + i.toString() + "title";
        var re = /l\d+/; // Regular expression for detecting ID
        // Load from these keys
        chrome.storage.sync.get(linkid, function (result) {
            // Update the link now
            for (linkid in result) {
                // console.log("Loaded: ");
                // console.log(result[linkid]);
                $("#"+re.exec(linkid)).attr("href", result[linkid]);
            };
        });
        chrome.storage.sync.get(titleid, function (result) {
            // Set the title now
            for (titleid in result) {
                // console.log("Loaded: ");
                // console.log(result[titleid]);
                $("#"+re.exec(linkid)).text(result[titleid]);
            };
        });
    }
}
