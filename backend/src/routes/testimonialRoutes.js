import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', requireAuth, createTestimonial);
router.put('/:id', requireAuth, updateTestimonial);
router.delete('/:id', requireAuth, deleteTestimonial);

export default router;
