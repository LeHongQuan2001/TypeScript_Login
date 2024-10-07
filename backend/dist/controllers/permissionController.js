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
exports.deletePerm = exports.updatePerm = exports.createPerm = exports.groupPerm = exports.getId = exports.index = void 0;
const permissionService_1 = require("../services/permissionService");
const responseUtils_1 = require("../utils/responseUtils");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, search, role, status } = req.query;
    const Permissions = yield (0, permissionService_1.list)(page, limit, search, role, status);
    (0, responseUtils_1.ok)(res, Permissions);
});
exports.index = index;
const getId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Permissions = yield (0, permissionService_1.getIdPermission)(id);
    (0, responseUtils_1.ok)(res, Permissions);
});
exports.getId = getId;
const groupPerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, permissionService_1.groupPermData)();
    (0, responseUtils_1.ok)(res, result);
});
exports.groupPerm = groupPerm;
const createPerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield (0, permissionService_1.createInfoPermission)(data);
    (0, responseUtils_1.ok)(res, result);
});
exports.createPerm = createPerm;
const updatePerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield (0, permissionService_1.updateInfoPermission)(id, data);
    (0, responseUtils_1.ok)(res, result);
});
exports.updatePerm = updatePerm;
const deletePerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    yield (0, permissionService_1.deleteInfoPermission)(ids);
    (0, responseUtils_1.ok)(res, {
        message: "Permissions deleted successfully",
    });
});
exports.deletePerm = deletePerm;
