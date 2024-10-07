"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiEndpointController_1 = require("../controllers/apiEndpointController");
const router = express_1.default.Router();
/**
 * @swagger
 * /apiendpoints:
 *   get:
 *     description: Get a list of all apiendpoints
 */
router.get('', apiEndpointController_1.index);
/**
 * @swagger
 * /apiendpoints/getlists:
 *   get:
 *     description: Get a list of apiendpoints
 */
router.get('/getlists', apiEndpointController_1.getLists);
exports.default = router;
