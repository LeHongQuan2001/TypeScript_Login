import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { index, getId, groupPerm, createPerm, updatePerm, deletePerm } from '../controllers/permissionController';

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /permissions:
 *   get:
 *     description: Get a list of all permissions
 */
router.get('', index);

/**
 * @swagger
 * /permissions/getIdPerm/{id}:
 *   get:
 *     description: Get permission details by ID
 */
router.get('/getIdPerm/:id', getId);

/**
 * @swagger
 * /permissions/groupper:
 *   get:
 *     description: Get grouped permissions
 */
router.get('/groupper', groupPerm);

/**
 * @swagger
 * /permissions/create:
 *   post:
 *     description: Create a new permission
 */
router.post('/create', createPerm);

/**
 * @swagger
 * /permissions/update/{id}:
 *   put:
 *     description: Update permission information
 */
router.put('/update/:id', updatePerm);

/**
 * @swagger
 * /permissions/delete:
 *   delete:
 *     description: Delete a permission
 */
router.delete('/delete', deletePerm);

export default router;
