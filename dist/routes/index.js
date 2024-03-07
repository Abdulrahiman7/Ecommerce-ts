"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../middleware/token");
const router = (0, express_1.Router)();
router.post('/addProduct', token_1.TokenAuthorization);
