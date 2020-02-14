const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    _id: { type: Number },
    userId: { type: Number, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: [String] },
}, {
    versionKey: false
});

articleSchema.plugin(AutoIncrement, {id: 'article_id_counter'});

module.exports = articleSchema;
