"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const roleController_1 = require("../controllers/roleController");
const router = express_1.default.Router();
router.use(authenticateToken_1.default);
router.get('', roleController_1.index);
router.get('/:id', roleController_1.getRole);
router.post('/create', roleController_1.createRole);
router.put('/update/:id', roleController_1.updateRole);
router.delete('/delete/', roleController_1.deleteRole);
exports.default = router;
