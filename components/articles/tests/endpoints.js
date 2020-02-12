const server = require('../../../www');
const errors = require('../errors');

//Define mocha functions
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

//Define chai functions
const chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;
const request = chai.request;

const auth = process.env.AUTHORIZATION;

describe('Endpoints positive cases', () => {
    it('Creates new article with authentication using valid user_id, title, text and tags.', () => {
        const article = {
            user_id: 1,
            title: 'This is the article title',
            text: 'This is the article body',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .post('/api/articles')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(200).to.be.equal(res.status);
                assert.exists(res.body);
                assert.notExists(res.body.error);           
            });
    });

    it('Update article with authentication using valid user_id, title, text and tags.', () => {
        const article = {
            title: 'This is the article title',
            text: 'This is the article body',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .put('/api/articles/1')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(200).to.be.equal(res.status);
                assert.exists(res.body);
                assert.notExists(res.body.error);           
            });
    });

    it('Delete article with authentication.', () => {
        request(server)
            .delete('/api/articles/1')
            .set('Authorization', auth)
            .end((err, res) => {
                if (err) return done(err);
                expect(200).to.be.equal(res.status);
                assert.exists(res.body);
                assert.notExists(res.body.error);           
            });
    });

    it('List all articles with authentication', () => {
        request(server)
            .get('/api/articles')
            .set('Authorization', auth)
            .end((err, res) => {
                if (err) return done(err);
                expect(200).to.be.equal(res.status);
                assert.exists(res.body);
                assert.notExists(res.body.error);           
            });
    });
});

describe('Endpoint error tests', () => {
    it('Creates new article without authetication and it should return unauthorized access', () => {
        const article = {
        };
        
        request(server)
            .post('/api/articles')
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(403).to.be.equal(res.status);        
            });
    });

    it('Update article without authetication and it should return unauthorized access', () => {
        const article = {
        };
        
        request(server)
            .put('/api/articles/1')
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(403).to.be.equal(res.status);        
            });
    });

    it('Delete article without authetication', () => {
        request(server)
            .delete('/api/articles')
            .end((err, res) => {
                if (err) return done(err);
                expect(403).to.be.equal(res.status);        
            });
    });

    it('List all articles without authetication', () => {
        request(server)
            .get('/api/articles')
            .end((err, res) => {
                if (err) return done(err);
                expect(403).to.be.equal(res.status);        
            });
    });

    it('Creates new article with authentication but invalid user_id, it should fail', () => {
        const article = {
            user_id: -1,
            title: 'This is the article title',
            text: 'This is the article body',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .post('/api/articles')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_user_id.error).to.be.equal(res.body.error);   
                expect(errors.invalid_user_id.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Update article with authentication but invalid user_id, it should fail', () => {
        const article = {
            title: 'This is the article title',
            text: 'This is the article body',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .put('/api/articles/-1')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_user_id.error).to.be.equal(res.body.error);   
                expect(errors.invalid_user_id.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Creates new article with authentication but no user_id, it should fail.', () => {
        const article = {
            title: 'This is the article title',
            text: 'This is the article body',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .post('/api/articles')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status); 
                expect(errors.invalid_user_id.error).to.be.equal(res.body.error);   
                expect(errors.invalid_user_id.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Creates new article with authentication using empty title, it should fail.', () => {
        const article = {
            user_id: 1,
            title: '',
            text: 'This is the article body',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .post('/api/articles')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_title.error).to.be.equal(res.body.error);   
                expect(errors.invalid_title.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Update article with authentication using empty title, it should fail.', () => {
        const article = {
            title: '',
            text: 'This is the article body',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .put('/api/articles/1')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_title.error).to.be.equal(res.body.error);   
                expect(errors.invalid_title.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Creates new article with authentication using no title, it should fail.', () => {
        const article = {
            user_id: 1,
            text: 'This is the article body',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .post('/api/articles')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_title.error).to.be.equal(res.body.error);   
                expect(errors.invalid_title.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Update article with authentication using no title, it should fail.', () => {
        const article = {
            text: 'This is the article body',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .put('/api/articles/1')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_title.error).to.be.equal(res.body.error);   
                expect(errors.invalid_title.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Creates new article with authentication using empty body, it should fail.', () => {
        const article = {
            user_id: 1,
            title: 'This is the article title',
            text: '',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .post('/api/articles')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_body.error).to.be.equal(res.body.error);   
                expect(errors.invalid_body.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Updates article with authentication using empty body, it should fail.', () => {
        const article = {
            title: 'This is the article title',
            text: '',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .put('/api/articles/1')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_body.error).to.be.equal(res.body.error);   
                expect(errors.invalid_body.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Creates new article with authentication using no body, it should fail.', () => {
        const article = {
            user_id: 1,
            title: 'This is the article title',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .post('/api/articles')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_body.error).to.be.equal(res.body.error);   
                expect(errors.invalid_body.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Update article with authentication using no body, it should fail.', () => {
        const article = {
            title: 'This is the article title',
            tags: [ "tag1", "tag2", "tag3" ]
        };
        
        request(server)
            .put('/api/articles/1')
            .set('Authorization', auth)
            .send(article)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_body.error).to.be.equal(res.body.error);   
                expect(errors.invalid_body.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

});
