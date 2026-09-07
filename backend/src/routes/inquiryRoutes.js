import express from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  updateInquiryPriority,
  deleteInquiry,
  getPublicContactData,
  updateContactSettings
} from '../controllers/inquiryController.js';

const router = express.Router();

// Public routes
router.post('/', createInquiry);
router.get('/settings', getPublicContactData);

// Admin routes
router.put('/settings', updateContactSettings);
router.post('/settings', updateContactSettings);
router.get('/', getInquiries);
router.patch('/:id/status', updateInquiryStatus);
router.patch('/:id/priority', updateInquiryPriority);
router.delete('/:id', deleteInquiry);

export default router;
