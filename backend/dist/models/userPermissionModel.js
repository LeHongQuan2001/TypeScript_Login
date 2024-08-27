"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// userPermissionsModel.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
const userModel_1 = __importDefault(require("./userModel"));
const permissionModel_1 = __importDefault(require("./permissionModel"));
class UserPermission extends sequelize_1.Model {
    ;
}
UserPermission.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    permissionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: permissionModel_1.default,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    sequelize: db_1.default,
    tableName: 'userpermissions',
    timestamps: true,
});
UserPermission.belongsTo(userModel_1.default, { foreignKey: 'userId' });
userModel_1.default.hasMany(UserPermission, { foreignKey: 'userId' });
UserPermission.belongsTo(permissionModel_1.default, { foreignKey: 'permissionId' });
permissionModel_1.default.hasMany(UserPermission, { foreignKey: 'permissionId' });
exports.default = UserPermission;
