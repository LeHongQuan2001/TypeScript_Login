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
exports.deleteInfoUser = exports.updateInfoUser = exports.createNewUser = exports.getUserId = exports.list = void 0;
const sequelize_1 = require("sequelize");
const userModel_1 = __importDefault(require("../models/userModel"));
const roleModel_1 = __importDefault(require("../models/roleModel"));
const sequelize_typescript_1 = require("sequelize-typescript");
const bcrypt = require("bcryptjs");
const list = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = '1', limit = '10', search = '', role = '', status = '') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const pageNo = isNaN(pageNumber) ? 1 : pageNumber;
    const limitNo = isNaN(limitNumber) ? 10 : limitNumber;
    let whereConditions = {};
    if (search && search !== "") {
        console.log('search', search);
        const valueLowCase = search.toLowerCase();
        whereConditions = Object.assign(Object.assign({}, whereConditions), { [sequelize_1.Op.or]: [
                sequelize_typescript_1.Sequelize.literal(`MATCH(username, email, phone) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`),
            ] });
    }
    if (role && role !== "") {
        whereConditions = Object.assign(Object.assign({}, whereConditions), { role_id: role });
    }
    if (status && status !== "") {
        whereConditions = Object.assign(Object.assign({}, whereConditions), { status: status });
    }
    const users = yield userModel_1.default.findAll({
        include: {
            model: roleModel_1.default,
            as: "role",
            attributes: ["id", "name"],
        },
        where: whereConditions,
    });
    // Pagination
    const startIndex = (pageNo - 1) * limitNo;
    const endIndex = pageNo * limitNo;
    const pages = Math.ceil(users.length / limitNo);
    const result = users.slice(startIndex, endIndex);
    if (result)
        return { result, pages };
    else
        throw new Error("Failed");
});
exports.list = list;
const getUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByPk(id, {
        include: { model: roleModel_1.default, as: "role", attributes: ["id", "name"] },
    });
    return user;
});
exports.getUserId = getUserId;
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('user', user);
    const existingUserByEmail = yield userModel_1.default.findOne({ where: { email: user.email } });
    if (existingUserByEmail) {
        throw new Error('Email already exists');
    }
    const existingUserByPhone = yield userModel_1.default.findOne({ where: { phone: user.phone } });
    if (existingUserByPhone) {
        throw new Error('Phone number already exists');
    }
    const hashPW = yield bcrypt.hash(user.password, 10);
    user.password = hashPW;
    const newUser = yield userModel_1.default.create(user);
    return newUser;
});
exports.createNewUser = createNewUser;
const updateInfoUser = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.password) {
        const hashPW = yield bcrypt.hash(user.password, 10);
        user.password = hashPW;
    }
    const result = yield userModel_1.default.update(user, {
        where: { id: userId },
    });
    return result;
});
exports.updateInfoUser = updateInfoUser;
const deleteInfoUser = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.destroy({ where: { id: ids } });
    return { message: "Users deleted successfully" };
});
exports.deleteInfoUser = deleteInfoUser;
