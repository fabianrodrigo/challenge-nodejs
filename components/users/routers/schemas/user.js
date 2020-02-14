const Joi = require('@hapi/joi');

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
