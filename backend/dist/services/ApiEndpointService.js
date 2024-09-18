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
exports.ApiEndpointService = void 0;
// src/service/ApiEndpointService.ts
const typeorm_1 = require("typeorm");
const apiEndpointModel_1 = __importDefault(require("../models/apiEndpointModel"));
class ApiEndpointService {
    constructor() {
        this.apiEndpointRepository = (0, typeorm_1.getRepository)(apiEndpointModel_1.default);
    }
    saveEndpoints(endpoints) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const endpoint of endpoints) {
                const apiEndpoint = new apiEndpointModel_1.default();
                apiEndpoint.method = endpoint.method;
                apiEndpoint.path = endpoint.path;
                apiEndpoint.description = endpoint.description || 'No description provided'; // Gán giá trị mặc định nếu cần
                yield this.apiEndpointRepository.save(apiEndpoint);
            }
        });
    }
}
exports.ApiEndpointService = ApiEndpointService;
