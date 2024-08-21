import { Request, Response } from 'express';
import { loginUser } from '../services/authServices';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "P@ssw0rd!"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 token:
 *                   type: string
 *                   description: The user's authentication token
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                 details:
 *                   type: string
 *                   description: Additional error details
 */
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(401).json({ message: 'Invalid credentials', details: 'Unknown error' });
        }
    }
};
