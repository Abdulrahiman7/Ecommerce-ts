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
exports.User = void 0;
const mongodb_1 = require("mongodb");
const database_1 = require("../util/database");
class User {
    constructor(name, email, password, number, cart, _id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.number = number;
        this.cart = cart;
        this._id = _id instanceof mongodb_1.ObjectId ? _id.toString() : _id;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = (0, database_1.getDb)();
                return yield db.collection('users').insertOne(this);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = (0, database_1.getDb)();
                return db.collection('users').findOne({ email: email });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    addToCart(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = (0, database_1.getDb)();
                const updatedCart = { items: [Object.assign(Object.assign({}, product), { quantity: 1 })] };
                return yield db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(this._id) }, { $set: { cart: updatedCart } });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.User = User;
