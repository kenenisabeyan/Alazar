import express from 'express';
import { getServices } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', getServices);

export default router;
