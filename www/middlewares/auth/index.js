const errors = require('../../errors.js');
const logger = require('winston'); 

//Check if the authorization environment variable is defined, if not crash
const auth = process.env.AUTHORIZATION;
if (auth === undefined) {
    throw new Error("AUTHORIZATION environment variable not defined.");
}

//Define the authorization middleware
const authMiddleware = function(req, res, next) {    
    if (req.headers.authorization !== auth) {
      logger.verbose(`Unauthorized access using ${req.headers.authorization}`)
      return res.status(403).json(errors.not_authorized);
    }

    next();
};

module.exports = authMiddleware;