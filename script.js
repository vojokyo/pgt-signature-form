// Select canvas and input elements
const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('name');

let drawing = false;

// Function to start drawing
canvas.addEventListener('mousedown', () => {
    drawing = true;
    ctx.beginPath();
});

// Function to stop drawing
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

// Function to draw on canvas
canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.stroke();
});

// Function to clear the signature pad
function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to submit the signature
function submitSignature() {
    const name = nameInput.value.trim();
    if (!name) {
        alert('Please enter your name.');
        return;
    }

    const signatureData = canvas.toDataURL('image/png');
    fetch('https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_URL/exec', {
        method: 'POST',
        body: JSON.stringify({ name: name, signature: signatureData }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                alert('Signature submitted successfully!');
                clearSignature();
                nameInput.value = '';
            } else {
                alert('Error submitting signature.');
            }
        })
        .catch(error => console.error('Error:', error));
}
