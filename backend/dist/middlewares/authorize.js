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
const permissionModel_1 = __importDefault(require("../models/permissionModel"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
const authorize = (requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.user;
            console.log('user1', user);
            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });
            // Tìm Role dựa trên tên
            const roleRecord = yield roleModel_1.default.findOne({
                where: { name: requiredRole }
            });
            if (!roleRecord)
                return res.status(404).json({ message: 'Role not found' });
            // Tìm các Permission dựa trên groupId
            const permissionsList = yield permissionModel_1.default.findAll({
                where: { groupId: roleRecord.id }
            });
            if (!permissionsList || permissionsList.length === 0) {
                return res.status(403).json({ message: 'No permissions found for this role' });
            }
            console.log('roleRecord', roleRecord);
            // console.log('permissionsList', permissionsList);
            // Kiểm tra nếu user có tất cả các quyền cần thiết
            const hasPermission = permissionsList.every(permission => user.permissions.includes(permission.id.toString()));
            console.log('user2', user);
            console.log('requiredRole', requiredRole);
            const hasRole = user.roles.includes(requiredRole);
            if (!hasPermission || !hasRole) {
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
