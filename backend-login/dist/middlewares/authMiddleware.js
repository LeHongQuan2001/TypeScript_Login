"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseUtils = require('utils/responseUtils');
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, 'your_jwt_secret');
            req.user = decoded;
            next();
        }
        catch (error) {
            return responseUtils.unauthorized(res, 'Not authorized, token failed');
        }
    }
    else {
        return responseUtils.unauthorized(res, 'Not authorized, no token');
    }
};
exports.protect = protect;
