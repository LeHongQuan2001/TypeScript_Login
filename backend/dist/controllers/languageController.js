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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLanguage = exports.updateLanguage = exports.createLanguage = exports.index = void 0;
const languageService_1 = require("../services/languageService");
const responseUtils_1 = require("../utils/responseUtils");
const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
const attachFlagUrl = (file) => {
    return file && file.filename ? `${baseUrl}/${file.filename}` : undefined;
};
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, search } = req.query;
        const languages = yield (0, languageService_1.list)(page, limit, search);
        (0, responseUtils_1.ok)(res, languages);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch languages' });
    }
});
exports.index = index;
const createLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const language = req.body;
        const flagUrl = attachFlagUrl(req.file);
        if (flagUrl) {
            language.flag = flagUrl;
        }
        const result = yield (0, languageService_1.createInfoLanguage)(language);
        (0, responseUtils_1.ok)(res, result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create language' });
    }
});
exports.createLanguage = createLanguage;
const updateLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const language = req.body;
        const flagUrl = attachFlagUrl(req.file);
        if (flagUrl) {
            language.flag = flagUrl;
        }
        const result = yield (0, languageService_1.updateInfoLanguage)(id, language);
        (0, responseUtils_1.ok)(res, result);
    }
    catch (error) {
        res.status(500).json({ error: `Failed to update language` });
    }
});
exports.updateLanguage = updateLanguage;
const deleteLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body;
        yield (0, languageService_1.deleteInfoLanguage)(ids);
        (0, responseUtils_1.ok)(res, { message: "Languages deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete languages' });
    }
});
exports.deleteLanguage = deleteLanguage;
