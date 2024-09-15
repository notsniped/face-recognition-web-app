// Set webcam properties
Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});

// Attach webcam to the #webcam-container div
Webcam.attach('#webcam-container');

// Log the version of ml5.js to console
console.log('ml5 version:', ml5.version);

// Load the model from Teachable Machine
const modelURL = "https://teachablemachine.withgoogle.com/models/iZHhp-9v-/model.json";
let classifier;

ml5.imageClassifier(modelURL)
    .then(loadedModel => {
        classifier = loadedModel;
        console.log('Model Loaded');
    })
    .catch(error => console.error('Error loading the model:', error));

// Function to capture an image
function captureImage() {
    Webcam.snap(function(data_uri) {
        // Display the captured image
        document.getElementById('snapshot').src = data_uri;
    });
}

// Function to identify the image
function identifyImage() {
    if (!classifier) {
        console.error('Model is not loaded yet.');
        return;
    }

    const imgElement = document.getElementById('snapshot');
    classifier.classify(imgElement)
        .then(results => {
            console.log(results);
            // Display results
            const recognizedName = results[0].label;
            const recognitionAccuracy = (results[0].confidence * 100).toFixed(2) + '%';

            document.getElementById('recognized-name').innerText = 'Name: ' + recognizedName;
            document.getElementById('recognition-accuracy').innerText = 'Accuracy: ' + recognitionAccuracy;
        })
        .catch(error => console.error('Error in identification:', error));
}
