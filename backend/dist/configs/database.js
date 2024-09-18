"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
const userModel_1 = __importDefault(require("../models/userModel"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
const permissionModel_1 = __importDefault(require("../models/permissionModel"));
const languageModel_1 = __importDefault(require("../models/languageModel"));
const groupPermissionModel_1 = __importDefault(require("../models/groupPermissionModel"));
const rolePermissionModel_1 = __importDefault(require("../models/rolePermissionModel"));
const apiEndpointModel_1 = __importDefault(require("../models/apiEndpointModel"));
const environment = process.env.DATABASE_ENV || "development";
const dbConfig = config_1.default[environment];
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    dialectOptions: dbConfig.dialectOptions,
    models: [userModel_1.default, roleModel_1.default, permissionModel_1.default, languageModel_1.default, groupPermissionModel_1.default, rolePermissionModel_1.default, apiEndpointModel_1.default],
    logging: true,
});
exports.default = sequelize;
