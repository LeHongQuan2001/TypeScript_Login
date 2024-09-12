"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const permissionController_1 = require("../controllers/permissionController");
const router = express_1.default.Router();
router.use(authenticateToken_1.default);
router.get('', permissionController_1.index);
exports.default = router;
