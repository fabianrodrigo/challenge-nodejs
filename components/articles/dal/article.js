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
            const newError = new Error(`error creating article with title "${title}" and text "${text}: ${err}"`);
            logger.error(newError);
            throw newError;
        });
    }

    // Function for retrieve the model by the id
    async get(id) {
        return await Article.findOne({_id: id}).catch((err) => {
            const newError = new Error(`error getting article ${id}: ${err}`);
            logger.error(newError);
            throw newError;
        });
    }

    async update(id, userId, title, text, tags) {
        const doc = await this.get(id).catch((err) => {
            const newError = new Error(`error updating article ${id}: ${err}`);
            logger.error(newError);
            throw newError;
        });

        doc.userId = userId;
        doc.title = title;
        doc.text = text;   
        doc.tags = tags;
        return doc.save().catch((err) => {
            const newError = new Error(`error updating article ${id}: ${err}`);
            logger.error(newError);
            throw newError;
        });;
    }

    async delete(id) {
        const doc = await this.get(id).catch((err) => {
            const newError = new Error(`error updating article ${id}: ${err}`);
            logger.error(newError);
            throw newError;
        });

        return await Article.remove(doc).catch((err) => {
            const newError = new Error(`error updating article ${id}: ${err}`);
            logger.error(newError);
            throw newError;
        });
    }
}

module.exports = ArticleDAL;