const canvas = document.getElementById('signature-pad');
const signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'white',  // Ensures clear background
    penColor: 'black'          // Signature color
});

// Resize the canvas to fit its container
function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = 300 * ratio;  // Fixed height for uniformity
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear();  // Reset after resizing
}

// Resize canvas when the window is resized
window.addEventListener("resize", resizeCanvas);
resizeCanvas();  // Initial call to set size

// Function to clear the signature
function clearSignature() {
    signaturePad.clear();
}

// Function to submit the form data
function submitForm() {
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert('Please enter your name.');
        return;
    }
    if (signaturePad.isEmpty()) {
        alert('Please provide a signature.');
        return;
    }

    const signatureData = signaturePad.toDataURL();

    // Send data to Google Apps Script Web App
    fetch('https://script.google.com/macros/s/AKfycbzMmjTgtWvUAPpRXRG26is5104SmsrnoeeJOQ2wNjIGY7_hoFZmijJa3A7nEy29mc2CDQ/exec', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            signature: signatureData
        }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => alert('Submitted successfully!'))
    .catch(error => alert('Submission failed: ' + error));
}

