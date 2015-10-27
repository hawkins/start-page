document.addEventListener("DOMContentLoaded", function(event) {
    $('#slot2input').focus();
    $('#slot3').gCalFlow({
        calid: calConfig.calid,
        maxitem: 3
    });
});

document.addEventListener("submit", function closetab() {
    setTimeout(function() {
        close();
    }, 1);
});
