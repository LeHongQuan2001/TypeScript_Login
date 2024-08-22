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
exports.login = void 0;
const authServices_1 = require("../services/authServices");
const responseUtils_1 = require("../utils/responseUtils");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, authServices_1.loginUser)(email, password);
        (0, responseUtils_1.ok)(res, user);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, responseUtils_1.unauthorized)(res, error.message);
        }
        else {
            (0, responseUtils_1.unauthorized)(res, 'Invalid credentials');
        }
    }
});
exports.login = login;
