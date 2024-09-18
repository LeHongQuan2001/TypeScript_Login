import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { index, getId, groupPerm, createPerm, updatePerm, deletePerm } from '../controllers/permissionController';

const router = express.Router();

router.use(authenticateToken);
router.get('', index);
router.get('/getIdPerm/:id', getId);
router.get('/groupper', groupPerm);
router.post('/create', createPerm);
router.put('/update/:id', updatePerm);
router.delete('/delete', deletePerm);

export default router;
