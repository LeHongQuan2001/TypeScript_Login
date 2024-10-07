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
exports.getRoles = exports.getPermissions = exports.getLanguages = void 0;
const siteServices_1 = require("../services/siteServices");
const responseUtils_1 = require("../utils/responseUtils");
const getLanguages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const languages = yield (0, siteServices_1.listLanguages)();
    (0, responseUtils_1.ok)(res, languages);
});
exports.getLanguages = getLanguages;
const getPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    const permissions = yield (0, siteServices_1.listPermissions)(token);
    (0, responseUtils_1.ok)(res, permissions);
});
exports.getPermissions = getPermissions;
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield (0, siteServices_1.listRoles)();
    (0, responseUtils_1.ok)(res, roles);
});
exports.getRoles = getRoles;
