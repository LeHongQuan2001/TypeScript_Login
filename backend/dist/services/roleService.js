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
exports.deleteInfoRole = exports.updateInfoRole = exports.createInfoRole = exports.getRoleId = exports.list = void 0;
const roleModel_1 = __importDefault(require("../models/roleModel"));
const rolePermissionModel_1 = __importDefault(require("../models/rolePermissionModel"));
const permissionModel_1 = __importDefault(require("../models/permissionModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const groupPermissionModel_1 = __importDefault(require("../models/groupPermissionModel"));
const sequelize_1 = require("sequelize");
const list = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = '1', limit = '10', search = '') {
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
                        attributes: ["id", "name", "groupId"],
                        include: [
                            {
                                model: groupPermissionModel_1.default,
                                as: 'groupPermission',
                                attributes: ["id", "name"]
                            }
                        ]
                    }
                ]
            },
            {
                model: userModel_1.default,
                as: 'users',
                attributes: ["id", "username", "avatar"]
            }
        ],
        order: [['id', 'ASC']],
    });
    const roleIds = roles.map(role => role.id);
    const userCounts = yield userModel_1.default.findAll({
        attributes: [
            'role_id',
            [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.col('id')), 'userCount']
        ],
        where: {
            role_id: {
                [sequelize_1.Op.in]: roleIds
            }
        },
        group: ['role_id']
    });
    const result = roles.map(role => {
        const countRecord = userCounts.find(count => count.get('role_id') === role.id);
        const userCount = countRecord ? countRecord.get('userCount') : 0;
        return Object.assign(Object.assign({}, role.toJSON()), { userCount });
    });
    return { result };
});
exports.list = list;
const getRoleId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield roleModel_1.default.findByPk(id, {
        include: [
            {
                model: rolePermissionModel_1.default,
                as: 'rolePermission',
                attributes: ["id", "roleId", "permissionId"],
                include: [
                    {
                        model: permissionModel_1.default,
                        as: 'permission',
                        attributes: ["id", "name", "groupId"],
                        include: [
                            {
                                model: groupPermissionModel_1.default,
                                as: 'groupPermission',
                                attributes: ["id", "name"]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    return { role };
});
exports.getRoleId = getRoleId;
const createInfoRole = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = data.name;
        const permissionIds = data.permissionIds || [];
        const newRole = yield roleModel_1.default.create({ name });
        if (permissionIds.length > 0) {
            for (const permissionId of permissionIds) {
                const permission = yield permissionModel_1.default.findByPk(permissionId);
                if (!permission) {
                    throw new Error(`Permission with ID ${permissionId} not found`);
                }
                yield rolePermissionModel_1.default.create({ roleId: newRole.id, permissionId });
            }
        }
        return { newRole };
    }
    catch (error) {
        console.error('Error creating role or assigning permissions:', error);
        throw error;
    }
});
exports.createInfoRole = createInfoRole;
const updateInfoRole = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = data.name;
        const permissionIds = data.permissionIds || [];
        const role = yield roleModel_1.default.findByPk(id);
        if (!role) {
            throw new Error(`Role with ID ${id} not found`);
        }
        role.name = name;
        yield role.save();
        yield rolePermissionModel_1.default.destroy({ where: { roleId: id } });
        for (const permissionId of permissionIds) {
            const permission = yield permissionModel_1.default.findByPk(permissionId);
            if (!permission) {
                throw new Error(`Permission with ID ${permissionId} not found`);
            }
            yield rolePermissionModel_1.default.create({ roleId: id, permissionId });
        }
        return { role };
    }
    catch (error) {
        console.error('Error updating role or assigning permissions:', error);
        throw error;
    }
});
exports.updateInfoRole = updateInfoRole;
const deleteInfoRole = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield roleModel_1.default.destroy({ where: { id: ids } });
        yield rolePermissionModel_1.default.destroy({ where: { roleId: ids } });
        return { message: 'Roles deleted successfully' };
    }
    catch (error) {
        console.error('Error deleting roles:', error);
        throw error;
    }
});
exports.deleteInfoRole = deleteInfoRole;
