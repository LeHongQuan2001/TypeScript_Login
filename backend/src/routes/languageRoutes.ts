import express from 'express';
import authenticateToken from '../middlewares/authenticateToken';
import { index, createLanguage, updateLanguage, deleteLanguage } from '../controllers/languageController';
import { uploads } from '../middlewares/multer';

const router = express.Router();

// router.use(authenticateToken);

/**
 * @swagger
 * /languages:
 *   get:
 *     description: Get a list of all languages
 */
router.get('', authenticateToken, index);

/**
 * @swagger
 * /languages/create:
 *   post:
 *     description: Create a new language
 */
router.post('/create', authenticateToken, uploads.single("flag"), createLanguage);

/**
 * @swagger
 * /languages/update/{id}:
 *   put:
 *     description: Update language information
 */
router.put('/update/:id', authenticateToken, uploads.single("flag"), updateLanguage);

/**
 * @swagger
 * /languages/delete:
 *   delete:
 *     description: Delete a language
 */
router.delete('/delete', authenticateToken, deleteLanguage);

export default router;
