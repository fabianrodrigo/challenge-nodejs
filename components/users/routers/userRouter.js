const logger = require('winston');
const express = require('express');
const errors = require('../errors');
const userSchema = require('./schemas').user;

class UserRouterBuilder {

    //User Router builder to inject the dal classes
    static build(userDAL) {
        var router = express.Router();

        // Endpoint to create a user
        router.post('/', async function(req, res, next) { 
            const validationResult = await userSchema.validate(req.body);
            
            if (validationResult.error) {
                logger.info(`POST user with ${req.body} and result in error ${validationResult.error}`);
                switch(validationResult.error.details[0].context.key) {
                    case "name": return res.status(400).json(errors.invalid_name)
                    case "avatar": return res.status(400).json(errors.invalid_avatar)
                    default: return res.status(500).json(errors.unknown_error)
                }
            }
            
            const user = validationResult.value;
            
            const userResult = await userDAL.create(user.name, user.avatar).catch((err) => {
                logger.info(`POST user with ${req.body} and result in error ${err.message}`);
            });

            if (!userResult) {
                return res.status(500).json(errors.unknown_error);
            }

            res.status(200).json(userResult); 
        });

        return router;
    }
}

module.exports = UserRouterBuilder;
