"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const languageRoutes_1 = __importDefault(require("./routes/languageRoutes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const permissionRoutes_1 = __importDefault(require("./routes/permissionRoutes"));
const apiEndpointRoutes_1 = __importDefault(require("./routes/apiEndpointRoutes"));
const siteRouter_1 = __importDefault(require("./routes/siteRouter"));
const authenticateJWT_1 = require("./middlewares/authenticateJWT");
const authorize_1 = require("./middlewares/authorize");
const statusUser_1 = __importDefault(require("./middlewares/statusUser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth API',
            version: '1.0.0',
            description: 'Authentication API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/controllers/authController.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public/uploads')));
app.use('/auth', authRoutes_1.default);
// app.use('/users', userRoutes);
app.use('/users', statusUser_1.default, authenticateJWT_1.authenticateJWT, (0, authorize_1.authorize)('admin'), userRoutes_1.default);
app.use('/languages', statusUser_1.default, authenticateJWT_1.authenticateJWT, (0, authorize_1.authorize)('admin'), languageRoutes_1.default);
app.use('/roles', statusUser_1.default, authenticateJWT_1.authenticateJWT, (0, authorize_1.authorize)('admin'), roleRoutes_1.default);
app.use('/permissions', statusUser_1.default, authenticateJWT_1.authenticateJWT, (0, authorize_1.authorize)('admin'), permissionRoutes_1.default);
app.use('/apiEndpoints', apiEndpointRoutes_1.default);
app.use('/sites', siteRouter_1.default);
app.listen(5000, () => console.log('Server running on port 5000'));
