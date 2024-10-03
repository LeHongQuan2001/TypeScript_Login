import { Router, Request, Response } from 'express';

const uploadRouter = Router();

uploadRouter.post('/upload', async (req: Request, res: Response) => {
    if (req.file && req.file.filename) {
        const fileUrl = `http://localhost:5000/${req.file.filename}`;
        res.json({ url: fileUrl });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

export default uploadRouter;
