var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {
    document.getElementById("submit-config").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementsByClassName('config-form')[0].submit();
    });
});