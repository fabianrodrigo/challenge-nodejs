const logger = require('winston');

//The unhandled exceptions are logged and then the process exits
process.on('uncaughtException', (err) => {
    logger.error(new Error(err));
    process.exit(1);
});

//The unhandled rejections are logged and then the process exits
process.on('unhandledRejection', (err) => {
    logger.error(new Error(err));
    process.exit(1);
});

//The error object needs to have a serialization to be able to log them in json format.
if (!('toJSON' in Error.prototype)) {
    Object.defineProperty(Error.prototype, 'toJSON', {
        value: function () {
            var alt = {};

            Object.getOwnPropertyNames(this).forEach(function (key) {
                if (typeof this[key] == 'Error') {
                    alt[key] = this[key].toJSON();
                } else {
                    alt[key] = this[key];
                }
            }, this);

            return alt;
        },
        configurable: true,
        writable: true
    });
};