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
/**
 * @swagger
 * /permissions:
 *   get:
 *     description: Get a list of all permissions
 */
router.get('', permissionController_1.index);
/**
 * @swagger
 * /permissions/getIdPerm/{id}:
 *   get:
 *     description: Get permission details by ID
 */
router.get('/getIdPerm/:id', permissionController_1.getId);
/**
 * @swagger
 * /permissions/groupper:
 *   get:
 *     description: Get grouped permissions
 */
router.get('/groupper', permissionController_1.groupPerm);
/**
 * @swagger
 * /permissions/create:
 *   post:
 *     description: Create a new permission
 */
router.post('/create', permissionController_1.createPerm);
/**
 * @swagger
 * /permissions/update/{id}:
 *   put:
 *     description: Update permission information
 */
router.put('/update/:id', permissionController_1.updatePerm);
/**
 * @swagger
 * /permissions/delete:
 *   delete:
 *     description: Delete a permission
 */
router.delete('/delete', permissionController_1.deletePerm);
exports.default = router;
