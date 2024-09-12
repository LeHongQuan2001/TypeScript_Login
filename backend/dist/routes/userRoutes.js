"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
router.use(authenticateToken_1.default);
router.get('', userController_1.index);
router.get('/get-user', userController_1.getUser);
router.post('/create', multer_1.uploads.single("avatar"), userController_1.createUser);
router.put('/update/:id', multer_1.uploads.single("avatar"), userController_1.updateUser);
router.delete('/delete', userController_1.deleteUser);
exports.default = router;
