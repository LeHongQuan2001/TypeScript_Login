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
exports.extractEndpointsFromSubRouter = exports.extractSubRoutes = exports.readFileContent = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const apiEndpointModel_1 = __importDefault(require("./models/apiEndpointModel"));
const database_1 = __importDefault(require("./configs/database")); // Import instance Sequelize
// Đọc nội dung file
const readFileContent = (filePath) => {
    return fs_1.default.readFileSync(filePath, 'utf8');
};
exports.readFileContent = readFileContent;
// Trích xuất các tuyến đường từ file router chính
const extractSubRoutes = (content) => {
    const routeRegex = /app\.use\(['"]([^'"]+)['"],\s*([^'"]+Routes)\)/g;
    const routes = [];
    let match;
    while ((match = routeRegex.exec(content)) !== null) {
        const routePath = match[1];
        const routeFile = match[2];
        routes.push({ path: routePath, file: routeFile });
    }
    return routes;
};
exports.extractSubRoutes = extractSubRoutes;
// Trích xuất các endpoint và mô tả từ file router con
const extractEndpointsFromSubRouter = (filePath) => {
    const content = (0, exports.readFileContent)(filePath);
    const endpointRegex = /router\.(get|post|put|delete|patch)\(\s*['"]([^'"]*)['"]/g;
    const descriptionRegex = /\/\*\*\s*\*\s*@swagger[\s\S]*?\*\s*description:\s*([^\r\n]+)/g;
    const endpoints = [];
    let match;
    // Tạo một mảng để lưu trữ các mô tả theo thứ tự
    const descriptions = [];
    // Tìm tất cả các mô tả
    let descMatch;
    while ((descMatch = descriptionRegex.exec(content)) !== null) {
        const description = descMatch[1].trim();
        descriptions.push(description);
    }
    // Tìm tất cả các endpoints và kết hợp với mô tả theo thứ tự xuất hiện
    let index = 0; // Để ánh xạ mô tả đúng với endpoint
    while ((match = endpointRegex.exec(content)) !== null) {
        const method = match[1].toUpperCase();
        const path = match[2];
        const description = descriptions[index] || 'No description available'; // Lấy mô tả theo thứ tự
        endpoints.push({
            method,
            path,
            description
        });
        index++; // Tăng index sau mỗi lần match
    }
    return endpoints;
};
exports.extractEndpointsFromSubRouter = extractEndpointsFromSubRouter;
// Nối các đường dẫn
const joinPaths = (basePath, relativePath) => {
    return path_1.default.posix.join(basePath.replace(/\/$/, ''), relativePath.replace(/^\//, ''));
};
// Đồng bộ hóa database và sau đó lưu endpoints
database_1.default.sync({ alter: true }).then(() => {
    // Đường dẫn tới file chính của router
    const filePath = path_1.default.join(__dirname, '../src/app.ts');
    const fileContent = (0, exports.readFileContent)(filePath);
    // Trích xuất các tuyến đường (sub-router)
    const subRoutes = (0, exports.extractSubRoutes)(fileContent);
    subRoutes.forEach((subRoute) => __awaiter(void 0, void 0, void 0, function* () {
        const subRouterPath = path_1.default.join(__dirname, `../src/routes/${subRoute.file}.ts`);
        const endpoints = (0, exports.extractEndpointsFromSubRouter)(subRouterPath);
        // Nối base path với các endpoint path
        const fullEndpoints = endpoints.map(endpoint => ({
            method: endpoint.method,
            path: joinPaths(subRoute.path, endpoint.path),
            description: endpoint.description
        }));
        try {
            for (const endpoint of fullEndpoints) {
                yield apiEndpointModel_1.default.create(endpoint); // Lưu từng endpoint vào DB
            }
            console.log(`Endpoints for ${subRoute.path} have been saved.`);
        }
        catch (error) {
            console.error('Error saving endpoints:', error);
        }
    }));
}).catch((error) => {
    console.error('Error syncing database:', error);
});
