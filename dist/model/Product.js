"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = require("../util/database");
const mongodb_1 = require("mongodb");
class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id instanceof mongodb_1.ObjectId ? id.toString() : id;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dbRes;
                const db = (0, database_1.getDb)();
                if (this._id) {
                    const id = this._id;
                    const productObjectId = new mongodb_1.ObjectId(id);
                    dbRes = yield db.collection('products').updateOne({ _id: productObjectId }, { $set: { 'title': this.title,
                            'price': this.price,
                            'description': this.description,
                            'imageUrl': this.imageUrl } });
                }
                else {
                    dbRes = yield db.collection('products').insertOne(this);
                }
                return dbRes;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = (0, database_1.getDb)();
                return yield db.collection('products').find().toArray();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static findById(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = (0, database_1.getDb)();
                const product = yield db.collection('products').findOne({ _id: new mongodb_1.ObjectId(prodId) });
                console.log(product);
                return product;
            }
            catch (err) {
                console.log('error in the findbyid in the model');
            }
        });
    }
    static deleteById(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = (0, database_1.getDb)();
                return yield db.collection('products').deleteOne({ _id: new mongodb_1.ObjectId(prodId) });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.Product = Product;
