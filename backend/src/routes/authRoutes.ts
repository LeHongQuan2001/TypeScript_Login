import express from 'express';
import { login, deleteOtp, forgotPassword, sendMail, verifyEmail, newPassword } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login user
 */
router.post('/login', login);
router.delete("/delete-otp", deleteOtp);
router.post("/forgot-password", forgotPassword );
router.post("/send-email", sendMail );
router.post("/verify-email", verifyEmail );
router.put("/newpassword", newPassword);

export default router;
