document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('signature-pad');
    
    // Check if SignaturePad is loaded
    if (typeof SignaturePad === 'undefined') {
        console.error("SignaturePad library not loaded. Check the script link in index.html.");
        return;
    }
    
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'white',  
        penColor: 'black'          
    });

    // Resize the canvas for responsiveness
    function resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = 300 * ratio;  
        canvas.getContext("2d").scale(ratio, ratio);
        signaturePad.clear();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Clear signature function
    window.clearSignature = function () {
        signaturePad.clear();
    };

    // Submit form function
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

        const signatureData = signaturePad.toDataURL();

        fetch('https://script.google.com/macros/s/AKfycbwj5bRdlvT7pVUcMojpdOzOvAiAqQPfqEcacqhpKKQiL2-1q_MUbuJLIEJndpDj8_oEfw/exec', {
            method: 'POST',
            body: new FormData(form),
            mode: 'no-cors'  // Add this line to bypass CORS restrictions
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
