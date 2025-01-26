const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let drawing = false;

// Start drawing
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

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

    const signatureData = canvas.toDataURL('image/png');

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
