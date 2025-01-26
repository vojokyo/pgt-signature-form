const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let drawing = false;

// Start drawing when mouse is pressed
canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
});

// Stop drawing when mouse is released
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseleave', () => drawing = false);

// Draw on canvas when mouse moves
canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
});

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

    // Check if signature pad is empty
    if (isCanvasBlank(canvas)) {
        alert('Please draw your signature before submitting.');
        return;
    }

    const signatureData = canvas.toDataURL('image/png'); // Convert canvas to base64 image

fetch('https://script.google.com/macros/s/AKfycbw2lD9oQy_GEiHgqp6mLwqTxZy9U_UqD4dxcwtAuASbe5AHxUZe_ERAe74ifuu0lNw6/exec', {
    method: 'POST',
    mode: 'no-cors',  // Bypass CORS restrictions
    body: JSON.stringify({ name: name, signature: signatureData }),
    headers: { 'Content-Type': 'application/json' }
})
.then(response => {
    alert('Signature submitted successfully! (CORS mode no-cors applied)');
    clearSignature();
    document.getElementById('name').value = '';
})
.catch(error => console.error('Error:', error));

}

// Function to check if canvas is blank
function isCanvasBlank(canvas) {
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() === blank.toDataURL();
}
