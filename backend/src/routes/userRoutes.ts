import express from 'express';
import { getUser, index, createUser, updateUser, deleteUser } from '../controllers/userController';
import authenticateToken from '../middlewares/authenticateToken';
import { uploads } from '../middlewares/multer';

const router = express.Router();

router.use(authenticateToken);
router.get('', index);
router.get('/get-user', getUser);
router.post('/create', uploads.single("avatar"), createUser);
router.put('/update/:id', uploads.single("avatar"), updateUser);
router.delete('/delete', deleteUser);

export default router;
