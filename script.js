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

    fetch('https://script.google.com/macros/s/AKfycbyqp0FfprBz4gHrTURD9UX5mt4BZjse2Rj93VnBrCieqaWjszSGh9tE54fd8Bt1ijyo/exec', {
        method: 'POST',
        body: JSON.stringify({ name: name, signature: signatureData }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert(`Signature saved as ${data.fileName}`);
            clearSignature();
            document.getElementById('name').value = '';
        } else {
            alert('Error submitting signature.');
        }
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
