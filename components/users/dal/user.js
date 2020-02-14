const logger = require('winston');

// Configure the user model based on the user schema
const mongoose = require('mongoose');
const UserSchema = require('../models').user;
const User = mongoose.model('User', UserSchema);

// UserDAL contains all the database operations to the Users Schema
class UserDAL {

    // Function for creating a user based on promises 
    async create(name, avatar) {
        const user = new User();
        user.name = name;
        user.avatar = avatar;

        return await user.save().catch((err) => {
            const newError = new Error(`error creating user with name "${name}" and avatar "${avatar}": ${err}`);
            logger.error(newError);
        });
    }

    // Function for retrieve the model by the id
    async get(id) {
        return await User.findOne({_id: id}).catch((err) => {
            const newError = new Error(`error getting article ${id}: ${err}`);
            logger.error(newError);
        });
    }
}

module.exports = UserDAL;