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
exports.deleteProduct = exports.fetchProductById = exports.fetchProducts = exports.addProduct = void 0;
const Product_1 = require("../model/Product");
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, description, imageUrl, id } = req.body;
        const product = new Product_1.Product(title, price, description, imageUrl, id);
        product.save();
        console.log(product);
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
    }
    ;
});
exports.addProduct = addProduct;
const fetchProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield Product_1.Product.fetchAll();
        res.status(200).json(allProducts);
    }
    catch (err) {
        console.log(err);
    }
    ;
});
exports.fetchProducts = fetchProducts;
const fetchProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('entered controllers');
        const prodId = req.params.id;
        console.log(prodId);
        const product = yield Product_1.Product.findById(prodId);
        res.status(200).json(product);
    }
    catch (err) {
        console.log('Error in the controller of admin');
    }
    ;
});
exports.fetchProductById = fetchProductById;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodId = req.params.id;
        const product = yield Product_1.Product.deleteById(prodId);
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
    }
    ;
});
exports.deleteProduct = deleteProduct;
