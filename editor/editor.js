function sync_preview(){
    let preview_text = document.getElementById('preview_text');
    preview_text.textContent = String(form_textarea_value.value).replace("", "")

    let text_counter = document.getElementById('text_counter');
    text_counter.textContent = [...String(form_textarea_value.value)].length;
}

function open_new_window(address) {
    const text = String(form_textarea_value.value);
    let textArray = text.split('\n');
    let newText = textArray.join('<br>');
    link = address + "#" + newText;
    window.open(link, null);
}

window.addEventListener('pageshow', function () {
    sync_preview();
});

const form_textarea_value = document.forms.edit_form.edit_form_textarea;
form_textarea_value.addEventListener('input', () => {
    sync_preview();
})


const button_edit_qr = document.getElementById("button_edit_qr");
button_edit_qr.addEventListener('click', () => {
    open_new_window("../qr/qr.html")
});

const button_preview_qr = document.getElementById("button_preview_qr");
button_preview_qr.addEventListener('click', () => {
    open_new_window("../viewer/viewer.html")
});