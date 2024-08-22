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
exports.loginUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtUtils_1 = require("../utils/jwtUtils");
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ where: { email } });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        const role = yield roleModel_1.default.findOne({ where: { id: user.role_id } });
        return {
            id: user.id,
            email: user.email,
            access_token: (0, jwtUtils_1.sign)(user.id.toString(), role === null || role === void 0 ? void 0 : role.name),
        };
    }
    throw new Error('Invalid credentials');
});
exports.loginUser = loginUser;
