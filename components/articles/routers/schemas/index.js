const articleSchema = require('./articleSchema');
const paginationSchema = require('./pagination');

module.exports = {
    article: articleSchema,
    pagination: paginationSchema
};
