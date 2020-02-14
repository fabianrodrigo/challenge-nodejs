//Configure error handling
require('./utils/errors');

//Configure logger
require('./utils/log');

//Configure connection to Mongo
require('./utils/db');

//Build the user and article dals
const UserDAL = require('./components/users/dal').UserDAL;
const ArticleDAL = require('./components/articles/dal').ArticleDAL;
const userDAL = new UserDAL();
const articleDAL = new ArticleDAL();

//Get the server builder
const ServerBuilder = require('./www');

//Build the app and the server
const builtServer = ServerBuilder.build(userDAL, articleDAL);

//Start the app
ServerBuilder.start(builtServer.app);
