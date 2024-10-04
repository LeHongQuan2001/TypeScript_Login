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
exports.listRoles = exports.listPermissions = exports.listLanguages = void 0;
const configs_1 = __importDefault(require("../configs"));
const apiEndpointModel_1 = __importDefault(require("../models/apiEndpointModel"));
const languageModel_1 = __importDefault(require("../models/languageModel"));
const permissionModel_1 = __importDefault(require("../models/permissionModel"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
const rolePermissionModel_1 = __importDefault(require("../models/rolePermissionModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const listLanguages = () => __awaiter(void 0, void 0, void 0, function* () {
    const languages = yield languageModel_1.default.findAll();
    return { languages };
});
exports.listLanguages = listLanguages;
const listPermissions = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = data.split(" ")[1];
    const user = yield new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, configs_1.default.jwt.secret, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
    const roles = yield roleModel_1.default.findAll({
        include: [
            {
                model: rolePermissionModel_1.default,
                as: 'rolePermission',
                attributes: ["id", "roleId", "permissionId"],
                include: [
                    {
                        model: permissionModel_1.default,
                        as: 'permission',
                        attributes: ["id", "name", "apiId", "groupId"],
                        include: [
                            {
                                model: apiEndpointModel_1.default,
                                as: 'apiEndpoint',
                                attributes: ["path"]
                            }
                        ]
                    }
                ]
            }
        ],
        where: { name: user.role },
    });
    const apiPaths = roles.flatMap(role => role.rolePermission.map(rp => { var _a; return (_a = rp.permission.apiEndpoint) === null || _a === void 0 ? void 0 : _a.path; }));
    return { apiPaths };
});
exports.listPermissions = listPermissions;
const listRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roleModel_1.default.findAll();
    return { roles };
});
exports.listRoles = listRoles;
