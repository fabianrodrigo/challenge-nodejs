const mongoose = require('mongoose');
const logger = require('winston');

// Get connection string from environment
const connectionString = process.env.CONNECTIONSTRING;
if (connectionString === undefined) {
    throw new Error("CONNECTIONSTRING environment variable not defined.");
}

// Get pool size from environment
const poolSize = (process.env.POOLSIZE || '100')*1;

const options = {
    useUnifiedTopology: true,            // Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
    useNewUrlParser: true,               // Current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
    poolSize: poolSize,                  // Maintain up to 'poolSize' socket connections
    bufferMaxEntries: 0,                 // If not connected, return errors immediately rather than waiting for reconnect
    useFindAndModify: false,             // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true` by default, you need to set it to false.
    connectTimeoutMS: 10000,             // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000,              // Close sockets after 45 seconds of inactivity
    family: 4,                           // Use IPv4
}

//Connecting to mongo db using a connection pool for high availability
mongoose.connect(connectionString, options).then(
    () => { 
        logger.info('Connection pool started...');
    },
    err => {
        logger.error(err);
    }
);
