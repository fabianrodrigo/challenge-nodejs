const app = require('./app');
const http = require('http');

// Create HTTP server.
const server = http.createServer(app);

// Get port from environment and start express
const port = process.env.PORT || '8080';
app.listen(port, function () {
    console.log(`Challenge server starting on port ${port}...`);
});
