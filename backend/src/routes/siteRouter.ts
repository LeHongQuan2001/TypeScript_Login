import express from 'express';
import { getLanguages, getPermissions } from '../controllers/siteController';
import { getUser } from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * /languages:
 *   get:
 *     description: Get a list of all languages for navbar
 */
router.get('/getLanguages', getLanguages);

/**
 * @swagger
 * /get-user:
 *   get:
 *     description: Get user details
 */
router.get('/get-user', getUser);

/**
 * @swagger
 * /getPermissions:
 *   get:
 *     description: Get getPermissions
 */
router.get('/getPermissions', getPermissions);



export default router;