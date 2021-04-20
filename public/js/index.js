// Get the express library
const express = require('express');

// Create a web server
const app = express();

// Serve static files from the frontend sub folder
app.use(express.static('frontend'));

// Start the web server on port 3000
app.listen(3000, () => console.log('Listening on port 3000'));