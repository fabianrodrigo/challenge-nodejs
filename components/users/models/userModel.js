const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

//Mongoose schema for user documents in Mongo
const userSchema = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
}, {
    versionKey: false
});

userSchema.plugin(AutoIncrement, {id: 'user_id_counter'});

module.exports = userSchema;
