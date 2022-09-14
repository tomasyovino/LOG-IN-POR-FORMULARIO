const MongoStore = require('connect-mongo');

const mongoOptions = {
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://tomyov24:Alessandro.24@cluster0.zft9dcg.mongodb.net/?retryWrites=true&w=majority",
        ttl: 600,
    }),
    secret: "foo",
    resave: false,
    saveUninitialized: false,
}

module.exports = {mongoOptions};