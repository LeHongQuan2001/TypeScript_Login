"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login user
 */
router.post('/login', authController_1.login);
router.delete("/delete-otp", authController_1.deleteOtp);
router.post("/forgot-password", authController_1.forgotPassword);
router.post("/send-email", authController_1.sendMail);
router.post("/verify-email", authController_1.verifyEmail);
router.put("/newpassword", authController_1.newPassword);
exports.default = router;
