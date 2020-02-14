const userSchema = require('./userSchema');

//Public facade to access all directory content
module.exports = {
    user: userSchema
};
