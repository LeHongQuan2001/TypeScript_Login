"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const languageController_1 = require("../controllers/languageController");
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
router.use(authenticateToken_1.default);
/**
 * @swagger
 * /languages:
 *   get:
 *     description: Get a list of all languages
 */
router.get('', languageController_1.index);
/**
 * @swagger
 * /languages/create:
 *   post:
 *     description: Create a new language
 */
router.post('/create', multer_1.uploads.single("flag"), languageController_1.createLanguage);
/**
 * @swagger
 * /languages/update/{id}:
 *   put:
 *     description: Update language information
 */
router.put('/update/:id', multer_1.uploads.single("flag"), languageController_1.updateLanguage);
/**
 * @swagger
 * /languages/delete:
 *   delete:
 *     description: Delete a language
 */
router.delete('/delete', languageController_1.deleteLanguage);
exports.default = router;
