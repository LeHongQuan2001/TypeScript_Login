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
exports.getLists = exports.index = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const apiEndpointServices_1 = require("../services/apiEndpointServices");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiEndpoints = yield (0, apiEndpointServices_1.list)();
    (0, responseUtils_1.ok)(res, apiEndpoints);
});
exports.index = index;
const getLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiEndpoints = yield (0, apiEndpointServices_1.getFullList)();
    (0, responseUtils_1.ok)(res, apiEndpoints);
});
exports.getLists = getLists;
