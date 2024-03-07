"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.mongoConnect = void 0;
const mongodb_1 = require("mongodb");
let _db;
const mongoConnect = callback => {
    mongodb_1.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster.cbjfzzk.mongodb.net/?retryWrites=true&w=majority`)
        .then(client => {
        console.log('connected');
        _db = client.db();
        callback();
    })
        .catch(err => console.log(err));
};
exports.mongoConnect = mongoConnect;
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'Database not found';
};
exports.getDb = getDb;
