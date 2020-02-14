class UserDALMock {

    constructor() {
        this.counter = 0;
        this._users = {};
    }

    createSync(name, avatar) {       
        var user = {
            name: name,
            avatar: avatar,
        };

        this._users[this.counter] = user;
        user._id = this.counter;

        this.counter++;

        return user;
    }

    create(name, avatar) {
        const self = this;
        return new Promise((resolve, reject) => {
            const user = self.createSync(name, avatar);
            resolve(user);
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            resolve(this._users[id]);     
        });
    }

    update(id, name, avatar) {
        return new Promise((resolve, reject) => {
            this._users[id] = {
                _id: id,
                name: name,
                avatar: avatar,
            };

            resolve({
                nModified: 1,
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            delete this._users[id];
            resolve({
                deletedCount: 1,
            });
        });
    }
}

module.exports = UserDALMock;
