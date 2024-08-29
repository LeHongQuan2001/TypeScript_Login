import multer, { StorageEngine } from "multer";
import { Request } from "express";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

export { uploads };
