class ArticleDALMock {

    constructor() {
        this.counter = 0;
        this._users = [];
    }

    createSync(userId, title, text, tags) {
        var user = {
            userId: userId,
            title: title,
            text: text,
            tags: tags
        };
        this._users[this.counter] = user;
        user._id = this.counter;

        this.counter++;

        return user;
    }

    create(userId, title, text, tags) {
        const self = this;
        return new Promise((resolve, reject) => {
            const user = self.createSync(userId, title, text, tags);
            resolve(user);     
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            resolve(this._users[id]);     
        });
    }

    update(id, userId, title, text, tags) {
        return new Promise((resolve, reject) => {
            this._users[id] = {
                _id: id,
                userId: userId,
                title: title,
                text: text,
                tags: tags
            };

            resolve({
                nModified: 1
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            delete this._users[id];
            resolve({
                deletedCount: 1
            });
        });
    }

    getAll(offset, limit) {
        return new Promise((resolve, reject) => {
            resolve(this._users.slice(offset, offset + limit));
        });
    }

    count() {
        return new Promise((resolve, reject) => {
            resolve(this._users);
        });
    }
}

module.exports = ArticleDALMock;
