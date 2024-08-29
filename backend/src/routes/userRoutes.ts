import express from 'express';
import { getUser, index, createUser } from '../controllers/userController';
import authenticateToken from '../middlewares/authenticateToken';
import { uploads } from '../middlewares/multer';

const router = express.Router();

router.use(authenticateToken);
router.get('', index);
router.get('/get-user', getUser);
router.post('/create', uploads.single("avatar"), createUser);

export default router;
