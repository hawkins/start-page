var saveLinks = {};
var saveTitles = {};
var saveHeaders = {};

function saveSettings() {
    console.log("Saving...");
    // Save links
    for (i = 1; i <= 12; i++) {
        // Define variables
        var id = "#l" + i.toString()
        var linkid = "l" + i.toString() + "link";
        var titleid = "l" + i.toString() + "title";
        //// Write in these dicts
        // Ensure http:// is in links
        if ($(id).attr("href").indexOf("http://") < 0 && $(id).attr("href").indexOf("https://") < 0 ) {
            $(id).attr("href", "http://"+$(id).attr("href"));
        }
        // Add to save variables
        saveLinks[linkid] = $(id).attr("href");
        saveTitles[titleid] = $(id).html();
    }
    // Save Headers
    for (i = 1; i <= 3; i++) {
        // Define Variables
        var headerKey = "header" + i.toString();
        var headerID = "#" + headerKey;
        // Add to saveHeaders
        saveHeaders[headerKey] = $(headerID).text();
    }

    console.log(saveLinks, saveTitles, saveHeaders);

    // Save in chrome.storage or localStorage
    try {
        chrome.storage.sync.set(saveLinks, function () {
            if (chrome.extension.lastError) {
                console.warn('An error occurred: ' + chrome.extension.lastError.message);
                console.warn("Please let the developer know at https://github.com/hawkins/start-page/issues");
            }
        });
        chrome.storage.sync.set(saveTitles, function () {
            if (chrome.extension.lastError) {
                console.warn('An error occurred: ' + chrome.extension.lastError.message);
                console.warn("Please let the developer know at https://github.com/hawkins/start-page/issues");
            }
        });
        chrome.storage.sync.set(saveHeaders, function () {
            if (chrome.extension.lastError) {
                console.warn('An error occurred: ' + chrome.extension.lastError.message);
                console.warn("Please let the developer know at https://github.com/hawkins/start-page/issues");
            }
        });
    }
    catch (err) {
        // localStorage["saveLinks"] = saveLinks;
        // localStorage["saveTitles"] = saveTitles;
        // localStorage["saveHeaders"] = saveHeaders;
        for (key in saveLinks) {
            localStorage[key] = saveLinks[key];
        }
        for (key in saveTitles) {
            localStorage[key] = saveTitles[key];
        }
        for (key in saveHeaders) {
            localStorage[key] = saveHeaders[key];
        }
    }
}

function loadSettings() {
    // Load links
    for (var i = 1; i <= 12; i++) {
        // Define variables
        var id = "#l" + i.toString()
        var linkid = "l" + i.toString() + "link";
        var titleid = "l" + i.toString() + "title";
        var linkRe = /l\d+/; // Regular expression for detecting ID
        // Load from these keys
        try {
            chrome.storage.sync.get(linkid, function (result) {
                // Update the link now
                for (linkid in result) {
                    // console.log("Loaded: ");
                    // console.log(result[linkid]);
                    $("#"+linkRe.exec(linkid)).attr("href", result[linkid]);
                };
            });
            chrome.storage.sync.get(titleid, function (result) {
                // Set the title now
                for (titleid in result) {
                    // console.log("Loaded: ");
                    // console.log(result[titleid]);
                    $("#"+linkRe.exec(linkid)).text(result[titleid]);
                };
            });
        }
        catch (err) {
            $("#"+linkRe.exec(linkid)).attr("href", localStorage[linkid]);
            $("#"+linkRe.exec(linkid)).text(localStorage[titleid]);
        }
    };
    // Load headers
    for (var i = 1; i <= 3; i++) {
        var headerKey = "header" + i.toString();
        var headerID = "#" + headerKey;
        var headerRe = /header\d+/; // Regular expression for detecting ID
        // Load from these keys
        try {
            chrome.storage.sync.get(headerKey, function (result) {
                // Update the link now
                for (key in result) {
                    $("div h2#" + headerRe.exec(key)).text(result[key]);
                };
            });
        }
        catch (err) {
            $("div h2#" + headerRe.exec(headerID)).text(localStorage[headerKey]);
        }
    };
}
