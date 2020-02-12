//Call the express module to configure the web service
const express = require('express');

//Call the body parser to add support to json body parsing
const bodyParser = require('body-parser');

//Call all routers of all components
const usersRouters = require('../components/articles/routers');
const articlesRouters = require('../components/users/routers');

const app = express();

app.use(bodyParser.json());

//Define the authorization validation
const authMiddleware = require('./middlewares/auth');
app.use(authMiddleware);

app.use('/api/users', usersRouters.default);
app.use('/api/articles', articlesRouters.default);

module.exports = app
