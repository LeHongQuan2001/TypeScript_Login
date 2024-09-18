"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const roleController_1 = require("../controllers/roleController");
const router = express_1.default.Router();
/**
 * @swagger
 * /roles:
 *   get:
 *     description: Get a list of all roles
 */
router.use(authenticateToken_1.default);
router.get('', roleController_1.index);
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     description: Get role details by ID
 */
router.get('/:id', roleController_1.getRole);
/**
 * @swagger
 * /roles/create:
 *   post:
 *     description: Create a new role
 */
router.post('/create', roleController_1.createRole);
/**
 * @swagger
 * /roles/update/{id}:
 *   put:
 *     description: Update role information
 */
router.put('/update/:id', roleController_1.updateRole);
/**
 * @swagger
 * /roles/delete:
 *   delete:
 *     description: Delete a role
 */
router.delete('/delete', roleController_1.deleteRole);
exports.default = router;
