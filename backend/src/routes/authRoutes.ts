import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login user
 */
router.post('/login', login);

export default router;
