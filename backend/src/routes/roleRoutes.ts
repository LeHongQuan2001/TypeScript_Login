import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { index, getRole, createRole, updateRole, deleteRole } from '../controllers/roleController';

const router = express.Router();

/**
 * @swagger
 * /roles:
 *   get:
 *     description: Get a list of all roles
 */
router.use(authenticateToken);
router.get('', index);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     description: Get role details by ID
 */
router.get('/:id', getRole);

/**
 * @swagger
 * /roles/create:
 *   post:
 *     description: Create a new role
 */
router.post('/create', createRole);

/**
 * @swagger
 * /roles/update/{id}:
 *   put:
 *     description: Update role information
 */
router.put('/update/:id', updateRole);

/**
 * @swagger
 * /roles/delete:
 *   delete:
 *     description: Delete a role
 */
router.delete('/delete', deleteRole);

export default router;
