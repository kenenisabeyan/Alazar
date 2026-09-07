import express from 'express';
import { uploadFile, listFiles, deleteFile, upload } from '../controllers/mediaController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/upload', requireAuth, upload.single('file'), uploadFile);
router.get('/', requireAuth, listFiles);
router.delete('/:filename', requireAuth, deleteFile);

export default router;
