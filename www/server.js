const AppBuilder = require('./app');
const http = require('http');
const logger = require('winston'); 

class ServerBuilder {
    //Server builder to inject the dal classes
    static build(userDAL, articleDAL) {
        const app = AppBuilder.build(userDAL, articleDAL);

        // Create HTTP server.
        const server = http.createServer(app);

        return {
            server: server,
            app: app,
        };
    }

    static start(app) {
        // Get port from environment and start express
        const port = process.env.PORT || '8080';
        app.listen(port, function () {
            logger.info(`Challenge server starting on port ${port}...`);
        });        
    }
}

module.exports = ServerBuilder;
