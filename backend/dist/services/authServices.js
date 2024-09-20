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
exports.newPasswordService = exports.verifyEmailService = exports.sendMailService = exports.forgotPwService = exports.deleteOtpService = exports.loginUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtUtils_1 = require("../utils/jwtUtils");
const verificationModel_1 = __importDefault(require("../models/verificationModel"));
const nodemailer_1 = require("../kernels/nodemailer");
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
    throw new Error("Invalid credentials");
});
exports.loginUser = loginUser;
const deleteOtpService = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield verificationModel_1.default.destroy({ where: { code: otp } });
    return result;
});
exports.deleteOtpService = deleteOtpService;
const forgotPwService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
exports.forgotPwService = forgotPwService;
const sendMailService = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ where: { email: code.to } });
    if (user) {
        const verification = {
            user_id: user.id,
            code: code.text,
        };
        yield verificationModel_1.default.create(verification);
        code.text = `Your verification code is: ${code.text}`;
        const result = (0, nodemailer_1.sendMail)(code);
        return result;
    }
    else {
        throw new Error("User not found");
    }
});
exports.sendMailService = sendMailService;
const verifyEmailService = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield verificationModel_1.default.findOne({ where: { code: otp } });
    return result;
});
exports.verifyEmailService = verifyEmailService;
const newPasswordService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield bcrypt_1.default.hash(body.password, 10);
    const result = yield userModel_1.default.update({ password: password }, { where: { email: body.email } });
    return result;
});
exports.newPasswordService = newPasswordService;
