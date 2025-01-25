const canvas = document.getElementById('signature-pad');
const signaturePad = new SignaturePad(canvas);

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
    fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec', {
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
