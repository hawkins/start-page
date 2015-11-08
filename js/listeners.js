document.addEventListener("DOMContentLoaded", function(event) {
    $('#slot2input').focus();
    $('#slot3').gCalFlow({
        calid: calConfig.calid,
        apikey: "AIzaSyCae639_0w0PW-L_QBlvlw2VTVNWmTtSNk",
        maxitem: 3
    });
});

document.addEventListener("submit", function closetab() {
    setTimeout(function() {
        close();
    }, 1);
});
