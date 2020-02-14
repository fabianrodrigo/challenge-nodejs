const ServerBuilder = require('../../../www');
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

//Mock the user dal
const UserDALMock = require('./mocks').UserDALMock;
const userDALMock = new UserDALMock();

const builtServer = ServerBuilder.build(userDALMock, null);
const server = builtServer.server;

describe('Users endpoint positive cases', () => {
    it('Creates new user with authentication using valid name and avatar.', async () => {
        const user = {
            name: 'Peter',
            avatar: 'http://www.validurl.com/validpage.html'
        };
        
        const res = await request(server)
            .post('/api/users')
            .set('Authorization', auth)
            .send(user);

        expect(200).to.be.equal(res.status);
        assert.exists(res.body);
        assert.notExists(res.body.error);
        assert.exists(res.body._id);
        assert.exists(res.body.name);
        assert.exists(res.body.avatar);
    });
});

describe('User endpoint error tests', () => {
    it('Creates new user without authetication and it should return unauthorized access', async () => {
        const user = {
        };
        
        const res = await request(server)
            .post('/api/users')
            .send(user);

        expect(403).to.be.equal(res.status);
    });

    it('Creates new user with authentication using empty name, it should fail.', async () => {
        const user = {
            name: '',
            avatar: 'http://www.validurl.com/validpage.html'
        };
        
        const res = await request(server)
            .post('/api/users')
            .set('Authorization', auth)
            .send(user);

        expect(400).to.be.equal(res.status);
        expect(errors.invalid_name.error).to.be.equal(res.body.error);   
        expect(errors.invalid_name.errorCode).to.be.equal(res.body.errorCode);   
    });

    it('Creates new user with authentication using no name, it should fail.', async () => {
        const user = {
            avatar: 'http://www.validurl.com/validpage.html'
        };
        
        const res = await request(server)
            .post('/api/users')
            .set('Authorization', auth)
            .send(user);

        expect(400).to.be.equal(res.status);
        expect(errors.invalid_name.error).to.be.equal(res.body.error);   
        expect(errors.invalid_name.errorCode).to.be.equal(res.body.errorCode);
    });

    it('Creates new user with authentication using empty avatar, it should fail.', async () => {
        const user = {
            name: 'Peter',
            avatar: ''
        };
        
        const res = await request(server)
            .post('/api/users')
            .set('Authorization', auth)
            .send(user);

        expect(400).to.be.equal(res.status);
        expect(errors.invalid_avatar.error).to.be.equal(res.body.error);   
        expect(errors.invalid_avatar.errorCode).to.be.equal(res.body.errorCode);
    });
});
