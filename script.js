const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let drawing = false;

// Handle mouse events (for PC)
canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
});
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
});

// Handle touch events (for mobile)
canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    drawing = true;
    const touch = event.touches[0];
    ctx.beginPath();
    ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    if (!drawing) return;
    const touch = event.touches[0];
    ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    ctx.stroke();
});

canvas.addEventListener('touchend', () => drawing = false);

// Clear the signature pad
function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Submit the signature
function submitSignature() {
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert('Please enter your name.');
        return;
    }

    if (isCanvasBlank(canvas)) {
        alert('Please draw your signature before submitting.');
        return;
    }

    const signatureData = canvas.toDataURL('image/png');

fetch('https://script.google.com/macros/s/AKfycbzdpIT8CJWGZfU-V_36qW-K6rkwOrJPiMUWYdHtpN9U-tVutwOni_lQcE9PuWDP19i_/exec', {
    method: 'POST',
    mode: 'no-cors',  // Change from 'cors' to 'no-cors'
    body: JSON.stringify({ name: name, signature: signatureData }),
    headers: { 'Content-Type': 'application/json' }
})
.then(response => {
    alert('Signature submitted! Please check the spreadsheet.');
    clearSignature();
    document.getElementById('name').value = '';
})
.catch(error => console.error('Error:', error));

}

// Check if the canvas is blank
function isCanvasBlank(canvas) {
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() === blank.toDataURL();
}
