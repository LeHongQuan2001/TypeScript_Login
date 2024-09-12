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
exports.deleteInfoLanguage = exports.updateInfoLanguage = exports.createInfoLanguage = exports.list = void 0;
const sequelize_1 = require("sequelize");
const languageModel_1 = __importDefault(require("../models/languageModel"));
const sequelize_typescript_1 = require("sequelize-typescript");
const list = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = '1', limit = '10', search = '') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const pageNo = isNaN(pageNumber) ? 1 : pageNumber;
    const limitNo = isNaN(limitNumber) ? 10 : limitNumber;
    let languages;
    if (search && search != "") {
        const valueLowCase = search.toLowerCase();
        languages = yield languageModel_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    sequelize_typescript_1.Sequelize.literal(`MATCH(name) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`),
                ],
            },
        });
    }
    else {
        languages = yield languageModel_1.default.findAll();
    }
    const startIndex = (pageNo - 1) * limitNo;
    const endIndex = pageNo * limitNo;
    const pages = Math.ceil(languages.length / limitNo);
    const result = languages.slice(startIndex, endIndex);
    return { result, pages };
});
exports.list = list;
const createInfoLanguage = (language) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('language', language);
    const result = yield languageModel_1.default.create(language);
    return result;
});
exports.createInfoLanguage = createInfoLanguage;
const updateInfoLanguage = (id, language) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield languageModel_1.default.update(language, { where: { id } });
    return result;
});
exports.updateInfoLanguage = updateInfoLanguage;
const deleteInfoLanguage = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    yield languageModel_1.default.destroy({ where: { id: ids } });
});
exports.deleteInfoLanguage = deleteInfoLanguage;
