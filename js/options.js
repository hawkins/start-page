var saveLinks = {};
var saveTitles = {};
var saveHeaders = {};
var currentSavePatternVersion = 1.3;
var savePatternVersion = checkForLegacy(); // Check for legacy save pattern

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

    // // Debug
    // console.log("Saving connections (DEBUG)");
    // var collections = {
    //     'col_1': {
    //         'Google': 'https://www.google.com/'
    //     },
    //     'col_2': {
    //         'a': 'b.com'
    //     },
    //     'col_3': {
    //         'c': 'd'
    //     }
    // };
    // console.log(collections);
    // chrome.storage.sync.set({'collections': collections}, function () {
    //     if (chrome.extension.lastError) {
    //         alert(chrome.extension.lastError);
    //         console.warn('An error occurred: ' + chrome.extension.lastError.message);
    //         console.warn("Please let the developer know at https://github.com/hawkins/start-page/issues");
    //     }
    // });
}

function loadSettings() {
    // Load all user settings from chrome storage

    if (savePatternVersion && savePatternVersion != currentSavePatternVersion) {
        // Outdate save pattern version in use
        console.warn('Save pattern version outdated. Found:', savePatternVersion, '. Was expecting: ', currentSavePatternVersion);
        convertFromLegacy(savePatternVersion);
    } else {
        // Up-to-date save pattern version in use, so load settings as normal
        // TODO
    }

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
        // Load from these keys
        try {
            chrome.storage.sync.get(headerKey, function (result) {
                // Update the link now
                for (key in result) {
                    $("div h2#" + key).text(result[key]);
                };
            });
        }
        catch (err) {
            $("div h2#" + headerID).text(localStorage[headerKey]);
        }
    };

    // Debug
    chrome.storage.sync.get('collections', function (result) {
        console.log(result)
    });
}

function checkForLegacy() {
    // Check for legacy save patterns and return version if found to be outdated

    // Define version variable
    var savePatternVersion = 0.0;

    // Check for 1.0 save pattern
    chrome.storage.sync.get('l1link', function(result) {
        // If l1link was found in chrome storage
        if (result['l1link']) {
            // Version 1.0 save pattern found
            console.warn('Found save pattern version', 1.0);
            savePatternVersion = 1.0;

            // Convert from legacy
            convertFromLegacy(savePatternVersion);
        } else {
            savePatternVersion = 1.3;
        }
    });

    // Finally, return the version
    return savePatternVersion;
}

function convertFromLegacy(version) {
    // Convert from specified version to current version save pattern

    if (version == 1.0) {
        // Convert to 1.3
        var collections = [];
        // Headers
        for (var i = 1; i <= 3; i++) {
            var headerKey = "header" + i.toString();
            // Load from these keys
            chrome.storage.sync.get(headerKey, function (result) {
                for (key in result) {
                    // Create an empty dictionary in collections with this name
                    console.log(result[key]);
                    collections.push([result[key]]);
                };
                console.log(collections);
            });
        };
        // TODO Links
        for (var i = 1; i <= 12; i++) {
            // Define variables
            var linkid = "l" + i.toString() + "link";
            var titleid = "l" + i.toString() + "title";
            var linkRe = /l\d+/; // Regular expression for detecting ID
            // Load from these keys
            chrome.storage.sync.get(titleid, function (resultOfTitle) {
                for (titlekey in resultOfTitle) {
                    chrome.storage.sync.get(linkid, function (resultOfLink) {
                        for (linkkey in resultOfLink) {
                            if (linkkey.replace(/^.*(\d+).*$/i,'$1') < 5) {
                                // Write to first collection
                                collections[0].push({titlekey: resultOfLink});
                            } else if (linkkey.replace(/^.*(\d+).*$/i,'$1') < 9) {
                                // Write to second collection
                                collections[1].push({titlekey: resultOfLink});
                            } else {
                                // Write to third collection
                                collections[2].push({titlekey: resultOfLink});
                            }
                            console.log(collections);
                        };
                    });
                    // if (key.replace(/^.*(\d+).*$/i,'$1') < 5) {
                    //     // Write to first collection
                    //
                    // } else if (key.replace(/^.*(\d+).*$/i,'$1') < 9) {
                    //     // Write to second collection
                    // } else {
                    //     // Write to third collection
                    // }
                };
            });
            // chrome.storage.sync.get(linkid, function (result) {
            //     for (key in result) {
            //         if (key.replace(/^.*(\d+).*$/i,'$1') < 5) {
            //             // Write to first collection
            //         } else if (key.replace(/^.*(\d+).*$/i,'$1') < 9) {
            //             // Write to second collection
            //         } else {
            //             // Write to third collection
            //         }
            //     };
            // });
        };
    }
}
