"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Lấy JWT từ header Authorization
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, '8016af4e64e81ae37679660bdc1de8a028c0edf7bdb234d7d31ff3ac14a3c589'); // Giải mã token
        console.log('req11111111111', decoded);
        req.user = decoded; // Gắn thông tin user vào req.user
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};
exports.authenticateJWT = authenticateJWT;
