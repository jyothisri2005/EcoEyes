// Access the camera and display it in the video element
function openCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.error("Error accessing webcam: ", error);
            });
    }
}

// Capture the image from the webcam and draw it on the canvas
function captureImage() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

// Handle form submission (You can use this to save the image and dropdown value)
document.getElementById('issue-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    const issueDropdown = document.getElementById('issue-dropdown').value;
    const imageFile = document.getElementById('upload-image').files[0];

    if (imageFile) {
        formData.append('image', imageFile);
    }

    // If the user captured an image, you can also append it to the form data
    const canvas = document.getElementById('canvas');
    const dataUrl = canvas.toDataURL('image/png'); // Capture image from canvas
    if (dataUrl) {
        formData.append('camera-image', dataUrl);
    }

    formData.append('issue', issueDropdown);

    // Optionally, send the data to the server
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Redirect or update UI based on server response
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
