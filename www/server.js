const app = require('./app');
const http = require('http');
const logger = require('winston'); 

// Create HTTP server.
const server = http.createServer(app);

// Get port from environment and start express
const port = process.env.PORT || '8080';
app.listen(port, function () {
    logger.info(`Challenge server starting on port ${port}...`);
});

module.exports = server;
