const canvas = document.getElementById("signatureCanvas");
const signaturePad = new SignaturePad(canvas);


function submitForm() {
    // Get the data from the signature pad and the name input
    const signatureData = signaturePad.toDataURL(); // Assuming you're using SignaturePad
    const name = document.getElementById('name').value; // Get the value of the 'name' input field

    // Check if the name is entered, if not, alert the user
    if (!name) {
        alert("Name is required!");
        return;
    }

    // Prepare the data to be sent in the request
    const formData = new FormData();
    formData.append('signatureData', signatureData);
    formData.append('name', name);

    // Send the form data to your Google Apps Script endpoint with no-cors mode
    fetch('https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_URL/exec', {
        method: 'POST',
        body: formData,
        mode: 'no-cors',  // Bypass CORS for now (handle without detailed response)
    })
    .then(response => {
        console.log('Form submitted successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
