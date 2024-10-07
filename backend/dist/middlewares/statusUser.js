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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseUtils_1 = require("../utils/responseUtils");
const userModel_1 = __importDefault(require("../models/userModel"));
const configs_1 = __importDefault(require("../configs"));
const mustStatusUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        (0, responseUtils_1.unauthorized)(res);
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const user = yield new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, configs_1.default.jwt.secret, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                resolve(decoded);
            });
        });
        req.user = user;
        const profileUser = yield userModel_1.default.findOne({ where: { id: user.userId } });
        if ((profileUser === null || profileUser === void 0 ? void 0 : profileUser.status) === 'inactive') {
            res.status(403).json({ message: 'User is inactive' });
            return;
        }
        next();
    }
    catch (error) {
        (0, responseUtils_1.unauthorized)(res);
        return;
    }
});
exports.default = mustStatusUser;
