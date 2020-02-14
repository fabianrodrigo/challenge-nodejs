const logger = require('winston');

require('../../../utils/db');

const ardal = require('../dal');
const articleDAL = new ardal.ArticleDAL();

//Call to the users dal to be able to set the predefined user needed to create articles
const usDal = require('../../users/dal');
const userDAL = new usDal.UserDAL();

//Define mocha functions
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;

//Define chai functions
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

describe('Article DB operations', () => {

    it('Creates an article and then get the same article to proof that the creation works', async () => {
        var article = {
            title: 'Title article',
            text: 'Text article',
            tags: ['tag1', 'tag2']
        };
        
        const doc = await userDAL.create("Test", "http://thisisavalidurl.com");
        article.userId = doc._id;
        logger.info(`Created user ${article.userId} for article tests`);
        
        const docCreate = await articleDAL.create(article.userId, article.title, article.text, article.tags);
        assert.isNumber(docCreate._id);
        expect(article.userId).to.be.equal(docCreate.userId);
        expect(article.title).to.be.equal(docCreate.title);
        expect(article.text).to.be.equal(docCreate.text);
        assert.deepEqual(article.tags, docCreate.tags);
        
        const docGet = await articleDAL.get(docCreate.id);
        assert.isNumber(docGet._id);
        expect(article.userId).to.be.equal(docGet.userId);
        expect(article.name).to.be.equal(docGet.name);
        expect(article.avatar).to.be.equal(docGet.avatar);
        assert.deepEqual(article.tags, docGet.tags);
    });

    it('Creates an article, then update it and finally get the same article to proof that the update works', async () => {
        var article = {
            title: 'Title article',
            text: 'Text article',
            tags: ['tag1', 'tag2']
        };
        var updatedArticle = {
            title: 'Updated title article',
            text: 'Updated text article',
            tags: ['tag3', 'tag4', 'tag5']
        };

        const doc = await userDAL.create("Test", "http://thisisavalidurl.com");
        article.userId = doc._id;
        updatedArticle.userId = doc._id;
        logger.info(`Created user ${article.userId} for article tests`);
        
        const docCreate = await articleDAL.create(article.userId, article.title, article.text, article.tags);
        assert.isNumber(docCreate._id);
        expect(article.userId).to.be.equal(docCreate.userId);
        expect(article.title).to.be.equal(docCreate.title);
        expect(article.text).to.be.equal(docCreate.text);
        assert.deepEqual(article.tags, docCreate.tags);

        const docUpdate = await articleDAL.update(docCreate._id, updatedArticle.userId, updatedArticle.title, updatedArticle.text, updatedArticle.tags);
        expect(docCreate._id).to.be.equal(docUpdate._id);
        expect(updatedArticle.userId).to.be.equal(docUpdate.userId);
        expect(updatedArticle.title).to.be.equal(docUpdate.title);
        expect(updatedArticle.text).to.be.equal(docUpdate.text);
        assert.deepEqual(updatedArticle.tags, docUpdate.tags);

        const docGet = await articleDAL.get(docUpdate._id);
        assert.isNumber(docGet._id);
        expect(docCreate._id).to.be.equal(docGet._id);
        expect(updatedArticle.userId).to.be.equal(docGet.userId);
        expect(updatedArticle.name).to.be.equal(docGet.name);
        expect(updatedArticle.avatar).to.be.equal(docGet.avatar);
        assert.deepEqual(updatedArticle.tags, docGet.tags);
    });

    it('Creates an article, then delete it and finally try to get the same article to proof that the deletion works', async () => {
        var article = {
            title: 'Title article',
            text: 'Text article',
            tags: ['tag1', 'tag2']
        };

        const doc = await userDAL.create("Test", "http://thisisavalidurl.com");
        article.userId = doc._id;
        logger.info(`Created user ${article.userId} for article tests`);
        
        const docCreate = await articleDAL.create(article.userId, article.title, article.text, article.tags);
        assert.isNumber(docCreate._id);
        expect(article.userId).to.be.equal(docCreate.userId);
        expect(article.title).to.be.equal(docCreate.title);
        expect(article.text).to.be.equal(docCreate.text);
        
        await articleDAL.delete(docCreate._id);
 
        const docGet = await articleDAL.get(docCreate._id);
        assert.isNull(docGet);
    });
});