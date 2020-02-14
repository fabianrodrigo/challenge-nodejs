const Joi = require('@hapi/joi');

//Joi schema to automate the json body pagination validation for user endpoints
const paginationSchema = Joi.object({
    page: Joi.number()
        .integer(),
    size: Joi.number()
        .integer()
});

module.exports = paginationSchema;
