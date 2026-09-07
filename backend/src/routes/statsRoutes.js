import express from 'express';
import { getStats, updateStat } from '../controllers/statsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getStats);
router.put('/:key', requireAuth, updateStat);

export default router;
