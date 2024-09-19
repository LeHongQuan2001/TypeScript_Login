"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const rolePermissionModel_1 = __importDefault(require("./rolePermissionModel"));
const groupPermissionModel_1 = __importDefault(require("./groupPermissionModel"));
const apiEndpointModel_1 = __importDefault(require("./apiEndpointModel"));
let Permission = class Permission extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Permission.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Permission.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => apiEndpointModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Permission.prototype, "apiId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => groupPermissionModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Permission.prototype, "groupId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => apiEndpointModel_1.default),
    __metadata("design:type", apiEndpointModel_1.default)
], Permission.prototype, "apiEndpoint", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => groupPermissionModel_1.default),
    __metadata("design:type", groupPermissionModel_1.default)
], Permission.prototype, "groupPermission", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => rolePermissionModel_1.default),
    __metadata("design:type", Array)
], Permission.prototype, "rolePermission", void 0);
Permission = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'permissions',
        timestamps: true,
    })
], Permission);
exports.default = Permission;
