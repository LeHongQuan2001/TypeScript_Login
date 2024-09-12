import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { index } from '../controllers/permissionController';

const router = express.Router();

router.use(authenticateToken);
router.get('', index);

export default router;
