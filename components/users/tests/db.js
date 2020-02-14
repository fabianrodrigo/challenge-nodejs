require('../../../utils/db');

const dal = require('../dal');
const userDAL = new dal.UserDAL();

//Define mocha functions
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

//Define chai functions
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

describe('User DB operations', () => {
    it('Creates a username and then get the same user to proof that the creation works', async () => {
        const user = {
            name: 'Peter',
            avatar: 'http://www.validurl.com/validpage.html'
        };
        
        const doc = await userDAL.create(user.name, user.avatar)
        assert.isNotNull(doc._id);
        expect(user.name).to.be.equal(doc.name);
        expect(user.avatar).to.be.equal(doc.avatar);
                
        const docGet = await userDAL.get(doc._id);
        assert.isNotNull(docGet._id);
        expect(user.name).to.be.equal(docGet.name);
        expect(user.avatar).to.be.equal(docGet.avatar);
    });
});