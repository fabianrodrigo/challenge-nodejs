const winston = require('winston');

// Get log level from environment and configure winston
const level = process.env.LOG_LEVEL || 'info';
winston.add(new winston.createLogger({
  level: level,
  transports: [
    new (winston.transports.Console)()
  ]
}));
