const logger = require('winston');
const express = require('express');
const errors = require('../errors');
const schemas = require('./schemas');
const articleSchema = schemas.article;
const paginationSchema = schemas.pagination;

class ArticleRouterBuilder {

    //Article Router builder to inject the dal classes
    static build(usersDAL, articleDAL) {
        var router = express.Router();

        // Endpoint to list the articles
        router.get('/', async function(req, res) {   
            const validationResult = await paginationSchema.validate(req.query);

            var page = 0;
            var size = 10;
            if (validationResult.value.page) {
                page = validationResult.value.page;
            }
            if (validationResult.value.size) {
                size = validationResult.value.size;
            }

            //Retrieve the model count to calculate the total pages
            const modelCount = await articleDAL.count().catch((err) => {
                logger.info(`GET articles with ${req.body} and result in error ${err}`);
            });

            if (!modelCount) {
                return res.status(500).json(errors.unknown_error);
            }

            const totalPages = Math.ceil(modelCount / size);
            var articlesResult = [];
            
            //If the page is higher or equals of total pages, request the article list page.
            if (page <= totalPages) {
                articlesResult = await articleDAL.getAll(page * size, size).catch((err) => {
                    logger.info(`GET articles with ${req.body} and result in error ${err}`);
                });    

                if (!articlesResult) {
                    return res.status(500).json(errors.unknown_error);
                }
            }

            res.status(200).json({
                result: articlesResult,
                page: Math.min(page, totalPages),
                totalPages: totalPages,
                size: size,
            });     

        });

        // Endpoint to create an article
        router.post('/', async function(req, res, next) {   
            const validationResult = await articleSchema.validate(req.body);

            if (validationResult.error) {
                logger.info(`POST article with ${req.body} and result in error ${validationResult.error}`);
                switch(validationResult.error.details[0].context.key) {
                    case "userId": return res.status(400).json(errors.invalid_userId)
                    case "title": return res.status(400).json(errors.invalid_title)
                    case "text": return res.status(400).json(errors.invalid_text)
                    default: return res.status(500).json(errors.unknown_error)
                }
            }

            const article = validationResult.value;

            if (!article) {
                return res.status(500).json(errors.unknown_error);
            }

            const user = await usersDAL.get(article.userId).catch((err) => {
                logger.info(`POST article with ${req.body} and result in error ${err}`);
            });

            if (!user) {
                return res.status(400).json(errors.invalid_userId);
            }

            const articleResult = await articleDAL.create(article.userId, article.title, article.title, article.tags).catch((err) => {
                logger.info(`POST article with ${req.body} and result in error ${err}`);
            });

            if (!articleResult) {
                return res.status(500).json(errors.unknown_error);
            }

            res.status(200).json(articleResult); 
        });

        // Endpoint to update an article
        router.put('/:id', async function(req, res, next) {   
            const id = req.params.id;

            if (!id) {
                return res.status(400).json(errors.invalid_article_id);
            }

            const validationResult = await articleSchema.validate(req.body);
            
            if (validationResult.error) {
                logger.info(`PUT article ${id} with ${req.body} and result in error ${validationResult.error}`);
                switch(validationResult.error.details[0].context.key) {
                    case "userId": return res.status(400).json(errors.invalid_userId)
                    case "title": return res.status(400).json(errors.invalid_title)
                    case "text": return res.status(400).json(errors.invalid_text)
                    default: return res.status(500).json(errors.unknown_error)
                }
                return 
            }
            
            const article = validationResult.value;
            
            if (!article) {
                return res.status(500).json(errors.unknown_error);
            }

            const user = await usersDAL.get(article.userId).catch((err) => {
                logger.info(`POST article with ${req.body} and result in error ${err}`);
            });

            if (!user) {
                return res.status(400).json(errors.invalid_userId);
            }
            
            const articleResult = await articleDAL.update(id, article.userId, article.title, article.text, article.tags).catch((err) => {
                logger.info(`PUT article ${id} with ${req.body} and result in error ${err}`);
            });

            if (!articleResult) {
                res.status(404).json(errors.article_not_exists); 
            }

            res.status(200).json(articleResult); 
        });

        // Endpoint to delete an article
        router.delete('/:id', async function(req, res, next) {   
            const id = req.params.id;

            if (!id) {
                return res.status(400).json(errors.invalid_article_id);
            }

            const result = await articleDAL.delete(id).catch((err) => {
                logger.info(`DELETE article ${id} and result in error ${err}`);
            });

            if (!result) {
                return res.status(404).send(errors.article_not_exists);                 
            }

            res.status(204).send(); 
        });

        return router;
    }
}

module.exports = ArticleRouterBuilder;
