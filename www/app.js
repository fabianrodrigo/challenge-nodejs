//Call the express module to configure the web service
const express = require('express');

//Call the body parser to add support to json body parsing
const bodyParser = require('body-parser');

//Call all router builders of all components
const ArticleRouterBuilder = require('../components/articles/routers').ArticleRouterBuilder;
const UserRouterBuilder = require('../components/users/routers').UserRouterBuilder;

class AppBuilder {

    static build(userDAL, articleDAL) {
        const app = express();

        app.set("env", "production"); // This prevent the body parser to throws parsig exceptions
        app.use(bodyParser.json());
        
        //Define the authorization validation
        const authMiddleware = require('./middlewares/auth');
        app.use(authMiddleware);

        //Define the error handling
        const errorMiddleware = require('./middlewares/error');
        app.use(errorMiddleware);

        app.use('/api/users', UserRouterBuilder.build(userDAL));
        app.use('/api/articles', ArticleRouterBuilder.build(userDAL, articleDAL));
        
        return app;
    }
}

module.exports = AppBuilder;
