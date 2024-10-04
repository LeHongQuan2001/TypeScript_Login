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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.index = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const userServices_1 = require("../services/userServices");
const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
const attachFlagUrl = (file) => {
    return file && file.filename ? `${baseUrl}/${file.filename}` : undefined;
};
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, search, role, status } = req.query;
        const result = yield (0, userServices_1.list)(page, limit, search, role, status);
        (0, responseUtils_1.ok)(res, result);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, responseUtils_1.unauthorized)(res, error.message || "Unauthorized access");
        }
        else {
            (0, responseUtils_1.unauthorized)(res, "Unknown error occurred");
        }
    }
});
exports.index = index;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const user = yield (0, userServices_1.getUserId)(id);
    (0, responseUtils_1.ok)(res, user);
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const avtUrl = attachFlagUrl(req.file);
        if (avtUrl) {
            user.avatar = avtUrl;
        }
        const newUser = yield (0, userServices_1.createNewUser)(user);
        (0, responseUtils_1.ok)(res, newUser);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, responseUtils_1.invalidated)(res, error.message || "Unauthorized access");
        }
        else {
            (0, responseUtils_1.invalidated)(res, "Unknown error occurred");
        }
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = req.body;
        const avtUrl = attachFlagUrl(req.file);
        if (avtUrl) {
            user.avatar = avtUrl;
        }
        yield (0, userServices_1.updateInfoUser)(userId, user);
        (0, responseUtils_1.ok)(res, { user: "Update successful" });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, responseUtils_1.invalidated)(res, error.message || "Unauthorized access");
        }
        else {
            (0, responseUtils_1.invalidated)(res, "Unknown error occurred");
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    yield (0, userServices_1.deleteInfoUser)(ids);
    (0, responseUtils_1.ok)(res, { Delete: "Successfull" });
});
exports.deleteUser = deleteUser;
