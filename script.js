// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('signature-pad');
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'white',  // Clear background
        penColor: 'black'          // Pen color
    });

    // Resize canvas to fit its container dynamically
    function resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = 300 * ratio;  // Fixed height for uniformity
        canvas.getContext("2d").scale(ratio, ratio);
        signaturePad.clear();  // Reset signature after resizing
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();  // Initial call to adjust canvas size

    // Clear the signature canvas
    window.clearSignature = function () {
        signaturePad.clear();
    };

    // Form submission function
    window.submitForm = function () {
        const name = document.getElementById('name').value.trim();
        
        if (!name) {
            alert('Please enter your name.');
            return;
        }

        if (signaturePad.isEmpty()) {
            alert('Please provide a signature.');
            return;
        }

        const signatureData = signaturePad.toDataURL();  // Convert signature to image URL

        fetch('https://script.google.com/macros/s/AKfycbzMmjTgtWvUAPpRXRG26is5104SmsrnoeeJOQ2wNjIGY7_hoFZmijJa3A7nEy29mc2CDQ/exec', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                signature: signatureData
            }),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.text())
        .then(data => {
            alert('Submitted successfully!');
            clearSignature();
        })
        .catch(error => alert('Submission failed: ' + error));
    };
});
