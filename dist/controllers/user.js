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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const user_1 = require("../model/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
function generateToken(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.JWT_SECRET_KEY) {
                return jsonwebtoken_1.default.sign({ email: email }, process.env.JWT_SECRET_KEY);
            }
            else
                throw new Error('invalid jwt');
        }
        catch (err) {
            console.log(err);
        }
    });
}
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, number } = req.body;
        const activeUser = user_1.User.findUser(email);
        if (activeUser !== null) {
            res.status(400).json({ msg: 'user already exist' });
        }
        (0, bcrypt_1.hash)(password, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(500).json({ message: 'internal server error' });
            }
            else {
                const user = new user_1.User(name, email, hash, number);
                user.save();
                res.status(200).json(user);
            }
        }));
    }
    catch (err) {
        console.log(err);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        user_1.User.findUser(email)
            .then(user => {
            if (user.password) {
                const comparePassword = (0, bcrypt_1.compare)(password, user.password)
                    .then(x => {
                    if (x == true) {
                        const token = generateToken(email);
                        res.status(200).json({ user, token });
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.login = login;
