var calConfig;
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
    $('#slot3').gCalFlow({
        calid: calid,
        apikey: "AIzaSyCae639_0w0PW-L_QBlvlw2VTVNWmTtSNk",
        maxitem: numberEvents
    });
}
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Hey developers! If you're interested to contribute, I gladly accept pull requests at https://github.com/hawkins/start-page/ ! :) -hawkins")
    $('#slot2input').focus();

    //// Read Google Calendar
    // Load Google Calendar ID from chrome.storage
    chrome.storage.sync.get("calConfig", function (result) {
        for (key in result) {
            calConfig = result[key];
            $('#calendar-id').val(calConfig);
        };
        // If we found calConfig, set up gCalFlow
        if (!calConfig) {
            // Open the popup to set up calendar
            $('#btn-calendar').click();
        } else {
            // Configure Google calendar
            loadCalendar();
        }
    });


    //// Check for first-time setup
    // Check whether new version is installed
    chrome.runtime.onInstalled.addListener(function(details){
        if(details.reason == "install"){
            console.log("Thank you so much for installing my simple start page Chrome extension! :) -hawkins");
            $('#btn-calendar').click();
        }else if(details.reason == "update"){
            var thisVersion = chrome.runtime.getManifest().version;
            console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
            console.log("Thanks so much for your continued support!! :) -hawkins");
        }
    });
    // Now load link settings
    loadSettings();
});

$('#slot2form').submit(function(ev) {
    setTimeout(function() {
        close();
    }, 1);
});

// Define last clicked link for use in "passing" as parameter to popup form
var lastClickedLinkAddress;
var lastClickedLinkTitle;
var lastClickedHeader;

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        // Context menu tried to open, so lets stop it and instead reconfigure a link
        // But let's only let it work on anchors
        if ('A' == e.path[0].tagName) {
            e.preventDefault();
            // console.log(e.path[0]);
            if (hasClass(e.path[0].parentElement, "gcf-title")) {
                // Open the popup to set up calendar
                $('#btn-calendar').click();
                return;
            }
            // Since we're not a descendent of slot3, open link configuration
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
} else {
    document.attachEvent('oncontextmenu', function() {
        alert("You've tried to open context menu");
        window.event.returnValue = false;
    });
}

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
            alert('Google Calendar ID is a required field');
            return false;
        }
    },
    submitted: function() {
        // Save the calendar ID in chrome.storage
        var calConfig = $('#calendar-id').val();
        chrome.storage.sync.set({"calConfig": calConfig}, function() {
            console.log("Saved calendar to chrome.storage.");
            $('#calendar-id').val(calConfig);
        });
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
