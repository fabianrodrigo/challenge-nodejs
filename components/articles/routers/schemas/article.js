const Joi = require('@hapi/joi');

const articleSchema = Joi.object({
    userId: Joi.number()
        .integer()
        .required(),
    title: Joi.string()
        .min(1)
        .max(255)
        .required(),
    text: Joi.string()
        .min(1)
        .required(),
    tags: Joi.array().items(Joi.string()
        .max(255))
});

module.exports = articleSchema;
