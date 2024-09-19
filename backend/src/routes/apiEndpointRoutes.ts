import express from 'express';
import { index, getLists } from '../controllers/apiEndpointController';

const router = express.Router();

/**
 * @swagger
 * /apiendpoints:
 *   get:
 *     description: Get a list of all apiendpoints
 */
router.get('', index);

/**
 * @swagger
 * /apiendpoints/getlists:
 *   get:
 *     description: Get a list of apiendpoints
 */
router.get('/getlists', getLists);


export default router;
