document.addEventListener("DOMContentLoaded", function(event) {
    $('#slot2input').focus();
    $('#slot3').gCalFlow({
        calid: calConfig.calid,
        apikey: "AIzaSyCae639_0w0PW-L_QBlvlw2VTVNWmTtSNk",
        maxitem: 3
    });
    chrome.storage.sync.set({'value': 12}, function() {
        chrome.storage.sync.get("value", function(data) {
            console.log("data", data["value"]);
        });
    });
    // Now load link settings
    loadSettings();
    document.getElementById("save").addEventListener("click", function(){
        saveSettings();
    });
});

$('#slot2form').submit(function(ev) {
    setTimeout(function() {
        close();
    }, 1);
});

// Define last clicked link for use in "passing" as parameter to popup form
var lastClickedLink;

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        // alert("You've tried to open context menu"); //here you draw your own menu
        lastClickedLink = e.path[0];
        console.log(lastClickedLink);
        e.preventDefault();
        $("#btn-link").click();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function() {
        alert("You've tried to open context menu");
        window.event.returnValue = false;
    });
}

$('#popupform1').PopupForm({
    openPopupButton: $('#btn-link')[0],
    formTitle: 'Edit Quick Link',

    validateStepOne: function (container) {
        // Or used validation plugin: http://jqueryvalidation.org/
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
