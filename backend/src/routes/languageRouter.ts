import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { index, createLanguage, updateLanguage, deleteLanguage } from '../controllers/languageController';
import { uploads } from '../middlewares/multer';

const router = express.Router();

router.use(authenticateToken);
router.get('', index);
router.post('/create',uploads.single("flag"), createLanguage);
router.put('/update/:id',uploads.single("flag"), updateLanguage);
router.delete('/delete', deleteLanguage);

export default router;
