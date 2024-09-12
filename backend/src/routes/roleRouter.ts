import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { index, getRole } from '../controllers/roleController';

const router = express.Router();

router.use(authenticateToken);
router.get('', index);
router.get('/:id', getRole);


export default router;
