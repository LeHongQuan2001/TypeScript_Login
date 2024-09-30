import express from 'express';
import { getLanguages } from '../controllers/siteController';
import { getUser } from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * /languages:
 *   get:
 *     description: Get a list of all languages
 */
router.get('', getLanguages);

/**
 * @swagger
 * /get-user:
 *   get:
 *     description: Get user details
 */
router.get('/get-user', getUser);



export default router;