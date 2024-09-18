"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEndpoints = exports.readFileContent = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readFileContent = (relativePath) => {
    const filePath = path_1.default.join(__dirname, relativePath);
    return fs_1.default.readFileSync(filePath, 'utf-8');
};
exports.readFileContent = readFileContent;
const extractEndpoints = (content) => {
    const endpointRegex = /router\.(get|post|put|delete)\(['"]([^'"]+)['"]/g;
    const endpoints = [];
    let match;
    while ((match = endpointRegex.exec(content)) !== null) {
        const method = match[1].toUpperCase();
        const path = match[2];
        const description = match[3] || 'No description provided'; // Gán giá trị mặc định nếu không có description
        endpoints.push({ method, path, description });
    }
    return endpoints;
};
exports.extractEndpoints = extractEndpoints;
