const logger = require('winston');
const errors = require('../../errors.js');

//Error handling middleware to respond to malformed json requests.
function errorHandler(err, req, res, next) {
    logger.error(`error handler middleware => ${err}`);
    if (err instanceof SyntaxError) {
      res.status(400).json(errors.malformed_json);
    } else {
      res.status(500).json(errors.unknown_error);
    }  
}

module.exports = errorHandler;