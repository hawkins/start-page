//// Define global variables
// Calendar config
var calConfig;
// Define last clicked link for use in "passing" as parameter to popup form
var lastClickedLinkAddress;
var lastClickedLinkTitle;
var lastClickedHeader;

//// Define Helper Functions
// hasClass is from http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
// Configure Google calendar
function loadCalendar(calid, numberEvents) {
    // Default parameters
    if (calid === undefined) {
        calid = calConfig;
    }
    if (numberEvents === undefined) {
        numberEvents = 3;
    }
    // Load the calendar now
    $('#calendar').gCalFlow({
        calid: calid,
        apikey: "AIzaSyCae639_0w0PW-L_QBlvlw2VTVNWmTtSNk",
        maxitem: numberEvents
    });
}
// Shorten link addresses
function shortenLink(link, MAX_LENGTH) {
    // Define a maximum length of link
    if (MAX_LENGTH == null) {
        MAX_LENGTH = 32;
    }
    // Remove prefixes
    var removals = ["http://", "https://", "www."];
    var i = 0;
    for (i = 0; i < removals.length; i++) {
        var current = removals[i];
        if (link.indexOf(current) > -1) {
            link = link.substring(link.indexOf(current) + current.length);
        }
    }
    //// Remove all but last suffix
    // Test with regex
    var re = /\/([^\/])*\/([^\/])*\//;
    if (re.test(link)) {
        // URL can be shortened
        // Remove trailing '/'
        if (link[link.length-1] == '/') {
            link = link.substring(0, link.length - 1);
        }
        // Define variables
        var set = link.split("/");
        var max = set.length - 1;
        var done = 0;
        var index = 1;
        console.log("Set:" + set);
        // Reduce the URL until short enough or out of options
        while (done == 0) {
            // Assemble URL
            link = set.join("/");
            if (link.length <= MAX_LENGTH) {
                // URL is short enough
                done = 1;
            } else {
                // URL is too long
                if (index < max) {
                    // Reduce a segment
                    set[index++] = "...";
                } else {
                    // Out of segments to reduce! Break but leave done at 0
                    break;
                }
            }
        }
        // Further reduce URL if necessary
        index = 1;
        max -= 1;
        while (done == 0) {
            // Assemble URL
            link = set.join("/");
            if (link.length <= MAX_LENGTH) {
                // URL is short enough
                done = 1;
            } else {
                // URL is too long
                if (index < max) {
                    // Remove a segment
                    set.splice(index++, 1);
                } else {
                    // Out of segments to remove!!
                    break;
                }
            }
        }
    }
    return link;
}

//// Begin listeners
// Document on load
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Hey developers! If you're interested to contribute, I love to see pull requests at https://github.com/hawkins/start-page/ ! :) -hawkins")
    $('#searchinput').focus();

    //// Read Google Calendar
    // Try to load Google Calendar ID from chrome.storage
    try {
        chrome.storage.sync.get("calConfig", function (result) {
            for (key in result) {
                calConfig = result[key];
                $('#calendar-id').val(calConfig);
            };
            // If we found calConfig, set up gCalFlow
            if (!calConfig) {
                // Open the popup to set up calendar
                // $('#btn-calendar').click();
            } else {
                // Configure Google calendar
                loadCalendar(calConfig);
            }
        });
    }
    // If failed (because not in Chrome Extension), load from local storage
    catch (err) {
        var calConfig = localStorage["calConfig"];
        console.log("Loaded calendar ID:" + calConfig);
        $('#calendar-id').val(calConfig);
        // If we found calConfig, set up gCalFlow
        if (!calConfig) {
            // Open the calendar setup popup
            // $('#btn-calendar').click();
        } else {
            // Configure Google calendar
            loadCalendar(calConfig);
        }
    }



    //// Check for first-time setup
    // Check whether new version is installed
    try {
        chrome.runtime.onInstalled.addListener(function(details){
            var thisVersion = chrome.runtime.getManifest().version;
            if (details.reason == "install"){
                // Build strings
                var installationNotice = "Thank you so much for supporting my simple start page Chrome extension! :) -hawkins";
                var currentVersionNotice = "You've just installed version " + thisVersion;
                var noticeBoardStatus = installationNotice.concat("<br>").concat(currentVersionNotice);
                // Log installation notices to console
                console.log(installationNotice);
                console.log(currentVersionNotice);
                // Write update notice to #notice
                document.getElementById("notice").innerHTML = noticeBoardStatus;
                // Open calendar configuration
                $('#btn-calendar').click();
            } else if(details.reason == "update") {
                // Build strings
                var updateNotice = "Updated from " + details.previousVersion + " to " + thisVersion + "!";
                var continuedSupport = "Thanks so much for your continued support!! :) -Hawkins";
                var noticeBoardStatus = updateNotice.concat("<br>").concat(continuedSupport);
                // Log updates in console
                console.log(updateNotice);
                console.log(continuedSupport);
                // Write update notice to #notice
                document.getElementById("notice").innerHTML = noticeBoardStatus;
            }
        });
    }
    catch (err) {
        console.warn("Failed to load chrome extension version");
        var noticeBoardStatus = "To install Simple Start Page,<br><a href=\"https://goo.gl/95jal3\">download the Chrome extesion.</a>";
        // Write update notice to #notice
        document.getElementById("notice").innerHTML = noticeBoardStatus;
    }

    // Now load link settings
    loadSettings();
});

// Add remaining isteners
if (document.addEventListener) {
    // Right click
    document.addEventListener('contextmenu', function(e) {
        // Context menu tried to open, so lets stop it and instead reconfigure a link
        // But let's only let it work on specific parts of the page
        if ('calendar' == e.path[0].id) {
            e.preventDefault();
            $('#btn-calendar').click();
            return;
        }
        if ('A' == e.path[0].tagName) {
            // Check if we clicked the GCF Title
            if (hasClass(e.path[0].parentElement, "gcf-title")) {
                // Open the popup to set up calendar
                e.preventDefault();
                $('#btn-calendar').click();
                return;
            }
            // If this is not a grandchild of linkdiv
            if (e.path[0].parentElement.parentElement.id != "linkdiv") {
                // Then do nothing
                return;
            } else {
                console.log(e.path[0].parentElement.parentElement.id)
                e.preventDefault();
            }
            // Since we're not a descendent of calendar, open link configuration
            lastClickedLink = e.path[0];
            // Load the link's href and text into the popup
            // console.log(lastClickedLink);
            $("#link-title").val(lastClickedLink.innerHTML);
            $("#link-address").val(lastClickedLink.href);
            // Now open the popup
            $("#btn-link").click();
        }
        if ('H2' == e.path[0].tagName) {
            e.preventDefault();
            lastClickedHeader = e.path[0];
            $('#header-name').val(lastClickedHeader.innerHTML)
            $('#btn-header').click();
        }
    }, false);
    // Left click
    document.addEventListener('click', function(e) {
        // Linkdiv menu
        if (hasClass(e.path[0], 'menu')) {
            e.preventDefault();
            var linkdivMenuOverlay = e.path[0].parentElement.getElementsByClassName("overlay")[0];
            var index = 0;
            // Toggle menu
            if (!linkdivMenuOverlay.style.display) {
                // Reveal menu
                e.path[0].parentElement.getElementsByClassName("overlay")[0].style.display = "inline";
                e.path[0].style.color = "#EEE";
                for (index = 0; index < e.path[0].parentElement.getElementsByClassName("menuitem").length; index++) {
                    e.path[0].parentElement.getElementsByClassName("menuitem")[index].style.display = "inline";
                }
            } else {
                // Hide menu
                e.path[0].parentElement.getElementsByClassName("overlay")[0].style.display = null;
                e.path[0].style.color = "#777";
                for (index = 0; index < e.path[0].parentElement.getElementsByClassName("menuitem").length; index++) {
                    e.path[0].parentElement.getElementsByClassName("menuitem")[index].style.display = null;
                }
            }
        }
    });
} else {
    document.attachEvent('oncontextmenu', function() {
        console.warn("Uh oh! Your browser was unable to substitute event listeners! If you're seeing this, please open an issue at http://www.github.com/hawkins/start-page/issues");
        window.event.returnValue = false;
    });
}

// Add left click listeners


// Quick Link Configuration
$('#popupform1').PopupForm({
    openPopupButton: $('#btn-link')[0],
    formTitle: 'Edit Quick Link',

    validateStepOne: function (container) {
        if($('#link-address').val().length > 0) {
            return true;
        } else {
            alert('Link address is a required field');
            return false;
        }
    },
    submitted: function() {
        // Now swap link address
        lastClickedLink.setAttribute("href", $("#link-address").val());
        // Swap title, if given
        if($('#link-title').val().length > 0) {
            lastClickedLink.text = $("#link-title").val();
        } else {
            lastClickedLink.text = shortenLink($("#link-address").val());
        }
        saveSettings(); // Update settings saved in chrome.storage
    },
    submitSuccess: function(data) {
        console.log('Form submitted successfully.')
    },
    submitFailed: function(xhr) {
        console.log('Form submit failed.')
    },
    closed: function() {
        console.log('Form closed.')
    }
});
// Google Calendar Configuration
$('#popupform2').PopupForm({
    openPopupButton: $('#btn-calendar')[0],
    formTitle: 'Edit Google Calendar',

    validateStepOne: function (container) {
        if($('#calendar-id').val().length > 0) {
            return true;
        } else {
            alert('Google Calendar ID is a required field. Set to \"0\" to disable Google Calendar.');
            return false;
        }
    },
    submitted: function() {
        // Save the calendar ID in chrome.storage or localStorage
        var calConfig = $('#calendar-id').val();
        try {
            chrome.storage.sync.set({"calConfig": calConfig}, function() {
                console.log("Saved calendar to chrome.storage.");
                $('#calendar-id').val(calConfig);
            });
        }
        catch (err) {
            localStorage["calConfig"] = calConfig;
            console.log("Saved calendar to localStorage");
            $('#calendar-id').val(calConfig);
        }
        // Now load the calendar with that ID
        loadCalendar($('#calendar-id').val());
    },
    submitSuccess: function(data) {
        console.log('Form submitted successfully.')
    },
    submitFailed: function(xhr) {
        console.log('Form submit failed.')
    },
    closed: function() {
        console.log('Form closed.')
        $('#calendar-id').val(calConfig);
    }
});
// Header customization popup
$('#popupform3').PopupForm({
    openPopupButton: $('#btn-header')[0],
    formTitle: 'Edit Header Name',

    validateStepOne: function (container) {
        if($('#header-name').val().length > 0) {
            return true;
        } else {
            alert('Header name is a required field');
            return false;
        }
    },
    submitted: function() {
        // Save the calendar ID in chrome.storage
        var newHeaderName = $('#header-name').val().toString();
        var headerID = lastClickedHeader.id.toString();
        var saveHeader = {headerID: newHeaderName};
        $("div h2#"+headerID).text(newHeaderName);
        saveSettings();
    },
    submitSuccess: function(data) {
        console.log('Form submitted successfully.')
    },
    submitFailed: function(xhr) {
        console.log('Form submit failed.')
    },
    closed: function() {
        console.log('Form closed.')
    }
});
