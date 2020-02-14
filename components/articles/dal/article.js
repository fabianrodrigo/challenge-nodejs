const logger = require('winston');

// Configure the user model based on the user schema
const mongoose = require('mongoose');
const ArticleSchema = require('../models').article;
const Article = mongoose.model('Article', ArticleSchema);

// ArticleDAL contains all the database operations to the Users Schema
class ArticleDAL {

    // Function for creating a user based on promises 
    async create(userId, title, text, tags) {
        const article = new Article();
        article.userId = userId;
        article.title = title;
        article.text = text;
        article.tags = tags;

        return await article.save().catch((err) => {
            const newError = new Error(`error creating article with title "${title}" and text "${text}: ${err.message}"`);
            logger.error(newError);
        });
    }

    // Function for retrieve the model by the id
    async get(id) {
        return await Article.findOne({_id: id}).catch((err) => {
            const newError = new Error(`error getting article ${id}: ${err.message}`);
            logger.error(newError);
        });
    }

    // Function for updating a user based on promises 
    async update(id, userId, title, text, tags) {
        const article = {
            _id: id,
            userId: userId,
            title: title,
            text: text,   
            tags: tags
        }
    
        const doc = await Article.updateOne({_id: id}, article).catch((err) => {
            const newError = new Error(`error updating article ${id}: ${err.message}`);
            logger.error(newError);
        });

        if (doc.nModified == 0) {
            return;
        }

        return article;
    }

    // Function for deleting a user based on promises 
    async delete(id) {
        const doc = await Article.deleteOne({_id: id}).catch((err) => {
            const newError = new Error(`error deleting article ${id}: ${err.message}`);
            logger.error(newError);
        });

        if (doc.deletedCount == 0) {
            return;
        }

        return doc.deletedCount;
    }

    // Function for retrieve all models paginated
    async getAll(offset, limit) {
        return await Article.find({}, {}, { skip: offset, limit: limit }).catch((err) => {
            const newError = new Error(`error listing articles: ${err}`);
            logger.error(newError);
        });
    }

    // Function for retrieve model count
    async count() {
        return await Article.countDocuments({}).catch((err) => {
            const newError = new Error(`error getting article count: ${err}`);
            logger.error(newError);
        });
    }
}

module.exports = ArticleDAL;