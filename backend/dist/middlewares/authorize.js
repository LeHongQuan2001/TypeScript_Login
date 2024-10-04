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
exports.authorize = void 0;
const roleModel_1 = __importDefault(require("../models/roleModel"));
const rolePermissionModel_1 = __importDefault(require("../models/rolePermissionModel"));
const permissionModel_1 = __importDefault(require("../models/permissionModel"));
const apiEndpointModel_1 = __importDefault(require("../models/apiEndpointModel"));
// Authorize middleware function
const authorize = (requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const user = req.user;
            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });
            const requestPath = req.originalUrl.split('?')[0];
            const roleRecord = yield roleModel_1.default.findOne({
                where: { name: user.role },
                include: [{
                        model: rolePermissionModel_1.default,
                        include: [{
                                model: permissionModel_1.default,
                                include: [apiEndpointModel_1.default]
                            }]
                    }]
            });
            if (!roleRecord)
                return res.status(404).json({ message: 'Role not found' });
            const permissionsList = ((_a = roleRecord.rolePermission) === null || _a === void 0 ? void 0 : _a.map((rp) => rp.permission)) || [];
            if (permissionsList.length === 0) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions or roles' });
            }
            const apiEndpoints = permissionsList.map((permission) => { var _a; return (_a = permission.apiEndpoint) === null || _a === void 0 ? void 0 : _a.path; });
            const normalizePath = (path) => {
                return path.replace(/:\w+/g, '[^/]+'); // Replace dynamic segments with a regex pattern
            };
            const hasApiAccess = (requestPath, endpoints) => {
                return endpoints.some(endpoint => {
                    const regex = new RegExp(`^${normalizePath(endpoint)}$`);
                    return regex.test(requestPath);
                });
            };
            const accessGranted = hasApiAccess(requestPath, apiEndpoints);
            if (!accessGranted) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions or roles' });
            }
            next();
        }
        catch (error) {
            console.error('Authorization error:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    });
};
exports.authorize = authorize;
