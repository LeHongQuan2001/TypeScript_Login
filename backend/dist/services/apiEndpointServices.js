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
exports.getFullList = exports.list = void 0;
const sequelize_1 = require("sequelize");
const apiEndpointModel_1 = __importDefault(require("../models/apiEndpointModel"));
const permissionModel_1 = __importDefault(require("../models/permissionModel"));
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    const apiEndpoints = yield apiEndpointModel_1.default.findAll();
    return { apiEndpoints };
});
exports.list = list;
const getFullList = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingApiEndpointIds = yield permissionModel_1.default.findAll({
        attributes: ['apiId'],
        raw: true
    }).then(permissions => permissions.map(permission => permission.apiId));
    const apiEndpoints = yield apiEndpointModel_1.default.findAll({
        where: {
            id: {
                [sequelize_1.Op.notIn]: existingApiEndpointIds
            }
        }
    });
    return { apiEndpoints };
});
exports.getFullList = getFullList;
