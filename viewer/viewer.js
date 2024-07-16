window.addEventListener('DOMContentLoaded', function () {
    let display_text = document.getElementById('display_text');
    display_text.textContent = decodeURI(location.hash.substring(1)).replaceAll("<br>","\n")
});
