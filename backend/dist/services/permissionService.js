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
exports.deleteInfoPerm = exports.updateInfoPerm = exports.createInfoPerm = exports.groupPermData = exports.getIdPerm = exports.list = void 0;
const apiEndpointModel_1 = __importDefault(require("../models/apiEndpointModel"));
const groupPermissionModel_1 = __importDefault(require("../models/groupPermissionModel"));
const permissionModel_1 = __importDefault(require("../models/permissionModel"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
const rolePermissionModel_1 = __importDefault(require("../models/rolePermissionModel"));
const list = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = "1", limit = "10", search = "", role = "", status = "") {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const pageNo = isNaN(pageNumber) ? 1 : pageNumber;
    const limitNo = isNaN(limitNumber) ? 10 : limitNumber;
    const permissions = yield permissionModel_1.default.findAll({
        include: [
            {
                model: groupPermissionModel_1.default,
                as: "groupPermission",
                attributes: ["id", "name"],
            },
            {
                model: rolePermissionModel_1.default,
                as: "rolePermission",
                attributes: ["id"],
                include: [
                    {
                        model: roleModel_1.default,
                        as: "role",
                        attributes: ["id", "name"],
                    },
                ],
            },
            {
                model: apiEndpointModel_1.default,
                as: "apiEndpoint",
                attributes: ["id", "description"],
            }
        ],
        attributes: ["id", "name"],
    });
    const startIndex = (pageNo - 1) * limitNo;
    const endIndex = pageNo * limitNo;
    const pages = Math.ceil(permissions.length / limitNo);
    const result = permissions.slice(startIndex, endIndex);
    return { result, pages };
});
exports.list = list;
const getIdPerm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield permissionModel_1.default.findByPk(id, {
        include: [
            {
                model: groupPermissionModel_1.default,
                as: "groupPermission",
                attributes: ["id", "name"],
            }
        ]
    });
    return permission;
});
exports.getIdPerm = getIdPerm;
const groupPermData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield groupPermissionModel_1.default.findAll();
    return result;
});
exports.groupPermData = groupPermData;
const createInfoPerm = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { permissionName, apiEndpoint, groupPermission } = data;
        let groupPerm = yield groupPermissionModel_1.default.findOne({ where: { id: groupPermission } });
        if (!groupPerm) {
            groupPerm = yield groupPermissionModel_1.default.create({ name: groupPermission });
        }
        const permission = yield permissionModel_1.default.findOne({ where: { name: permissionName } });
        if (!permission) {
            const result = yield permissionModel_1.default.create({
                name: permissionName,
                apiId: apiEndpoint,
                groupId: groupPerm.id
            });
            return result;
        }
        else {
            throw new Error("Permission already exists");
        }
    }
    catch (error) {
        console.error("Error creating permission:", error);
        throw error;
    }
});
exports.createInfoPerm = createInfoPerm;
const updateInfoPerm = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { editPermissionName, editApiEndpoint, groupPermission } = data;
        const permission = yield permissionModel_1.default.findByPk(id);
        if (!permission) {
            throw new Error("Permission not found");
        }
        if (editPermissionName && groupPermission && editApiEndpoint) {
            permission.name = editPermissionName;
            permission.apiId = editApiEndpoint;
            const groupPerm = yield groupPermissionModel_1.default.findByPk(groupPermission);
            if (!groupPerm) {
                throw new Error("Group permission not found");
            }
            permission.groupId = groupPerm.id;
        }
        else {
            throw new Error("No data to update");
        }
        yield permission.save();
        return permission;
    }
    catch (error) {
        console.error("Error updating permission:", error);
        throw error;
    }
});
exports.updateInfoPerm = updateInfoPerm;
const deleteInfoPerm = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ids', ids);
    try {
        yield permissionModel_1.default.destroy({ where: { id: ids } });
    }
    catch (error) {
        console.error("Error deleting permission:", error);
        throw error;
    }
});
exports.deleteInfoPerm = deleteInfoPerm;
