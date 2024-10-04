"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.ts (hoặc file tương ứng)
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
router.use(authenticateToken_1.default);
/**
 * @swagger
 * /:
 *   get:
 *     description: Get a list of all users
 */
router.get('', userController_1.index);
/**
 * @swagger
 * /create:
 *   post:
 *     description: Create a new user
 */
router.post('/create', multer_1.uploads.single("avatar"), userController_1.createUser);
/**
 * @swagger
 * /update/{id}:
 *   put:
 *     description: Update user information
 */
router.put('/update/:id', multer_1.uploads.single("avatar"), userController_1.updateUser);
/**
 * @swagger
 * /delete:
 *   delete:
 *     description: Delete a user
 */
router.delete('/delete', userController_1.deleteUser);
exports.default = router;
