"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.sign = void 0;
const configs_1 = __importDefault(require("../configs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sign = (userId, userRole) => {
    const access_token = jsonwebtoken_1.default.sign({ userId, role: userRole }, configs_1.default.jwt.secret, {
        expiresIn: configs_1.default.jwt.ttl,
    });
    return access_token;
};
exports.sign = sign;
const signRefreshToken = (userId, userRole) => {
    const refresh_token = jsonwebtoken_1.default.sign({ userId, role: userRole }, configs_1.default.jwt.secret, {
        expiresIn: "1y",
    });
    return refresh_token;
};
exports.signRefreshToken = signRefreshToken;
