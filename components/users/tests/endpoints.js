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
    it('Creates new user with authentication using valid name and avatar.', () => {
        const user = {
            name: 'Peter',
            avatar: 'http://www.validurl.com/validpage.html'
        };
        
        request(server)
            .post('/api/users')
            .set('Authorization', auth)
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(200).to.be.equal(res.status);
                assert.exists(res.body);
                assert.notExists(res.body.error);           
            });
    });
});

describe('Endpoint error tests', () => {
    it('Creates new user without authetication and it should return unauthorized access', () => {
        const user = {
        };
        
        request(server)
            .post('/api/user')
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(403).to.be.equal(res.status);        
            });
    });

    it('Creates new user with authentication using empty name, it should fail.', () => {
        const user = {
            name: '',
            avatar: 'http://www.validurl.com/validpage.html'
        };
        
        request(server)
            .post('/api/users')
            .set('Authorization', auth)
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_name.error).to.be.equal(res.body.error);   
                expect(errors.invalid_name.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Creates new user with authentication using no name, it should fail.', () => {
        const user = {
            avatar: 'http://www.validurl.com/validpage.html'
        };
        
        request(server)
            .post('/api/user')
            .set('Authorization', auth)
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_name.error).to.be.equal(res.body.error);   
                expect(errors.invalid_name.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Creates new user with authentication using empty avatar, it should fail.', () => {
        const user = {
            name: 'Peter',
            avatar: ''
        };
        
        request(server)
            .post('/api/user')
            .set('Authorization', auth)
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_avatar.error).to.be.equal(res.body.error);   
                expect(errors.invalid_avatar.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Creates new user with authentication using no avatar, it should fail.', () => {
        const article = {
            name: 'Peter'
        };
        
        request(server)
            .post('/api/user')
            .set('Authorization', auth)
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_avatar.error).to.be.equal(res.body.error);   
                expect(errors.invalid_avatar.errorCode).to.be.equal(res.body.errorCode);   
            });
    });

    it('Creates new user with authentication using broken url avatar, it should fail.', () => {
        const user = {
            name: 'Peter',
            avatar: 'this is an invalid url'
        };
        
        request(server)
            .post('/api/user')
            .set('Authorization', auth)
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(400).to.be.equal(res.status);
                expect(errors.invalid_avatar.error).to.be.equal(res.body.error);   
                expect(errors.invalid_avatar.errorCode).to.be.equal(res.body.errorCode);   
            });
    });
});
