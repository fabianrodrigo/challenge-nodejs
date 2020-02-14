const articleSchema = require('./articleSchema');
const paginationSchema = require('./pagination');

//Public facade to access all directory content
module.exports = {
    article: articleSchema,
    pagination: paginationSchema
};
