const Joi = require('@hapi/joi');

//Joi schema to automate the json body validation for user endpoints
const userSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(255)
        .required(),
    avatar: Joi.string()
        .uri()
        .min(1)
        .max(255)
        .required()
});

module.exports = userSchema;
