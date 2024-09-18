// router.ts (hoặc file tương ứng)
import express from 'express';
import { getUser, index, createUser, updateUser, deleteUser } from '../controllers/userController';
import authenticateToken from '../middlewares/authenticateToken';
import { uploads } from '../middlewares/multer';

const router = express.Router();

router.use(authenticateToken);
/**
 * @swagger
 * /:
 *   get:
 *     description: Get a list of all users
 */
router.get('', index);

/**
 * @swagger
 * /get-user:
 *   get:
 *     description: Get user details
 */
router.get('/get-user', getUser);

/**
 * @swagger
 * /create:
 *   post:
 *     description: Create a new user
 */
router.post('/create', uploads.single("avatar"), createUser);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     description: Update user information
 */
router.put('/update/:id', uploads.single("avatar"), updateUser);

/**
 * @swagger
 * /delete:
 *   delete:
 *     description: Delete a user
 */
router.delete('/delete', deleteUser);

export default router;
