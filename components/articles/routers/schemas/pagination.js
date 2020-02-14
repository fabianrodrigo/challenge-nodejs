const Joi = require('@hapi/joi');

const paginationSchema = Joi.object({
    page: Joi.number()
        .integer(),
    size: Joi.number()
        .integer()
});

module.exports = paginationSchema;
