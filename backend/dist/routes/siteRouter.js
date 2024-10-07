"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const siteController_1 = require("../controllers/siteController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
/**
 * @swagger
 * /languages:
 *   get:
 *     description: Get a list of all languages for navbar
 */
router.get('/getLanguages', siteController_1.getLanguages);
/**
 * @swagger
 * /get-user:
 *   get:
 *     description: Get user details
 */
router.get('/get-user', userController_1.getUser);
/**
 * @swagger
 * /getPermissions:
 *   get:
 *     description: Get getPermissions
 */
router.get('/getPermissions', siteController_1.getPermissions);
/**
 * @swagger
 * /getRoles:
 *   get:
 *     description: Get getRoles
 */
router.get('/getRoles', siteController_1.getRoles);
exports.default = router;
