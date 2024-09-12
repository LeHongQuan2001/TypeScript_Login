import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { index, getRole, createRole, updateRole, deleteRole } from '../controllers/roleController';

const router = express.Router();

router.use(authenticateToken);
router.get('', index);
router.get('/:id', getRole);
router.post('/create', createRole);
router.put('/update/:id', updateRole);
router.delete('/delete/', deleteRole);


export default router;
