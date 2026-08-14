import express from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/inquiryController.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', getInquiries);
router.patch('/:id/status', updateInquiryStatus);
router.delete('/:id', deleteInquiry);

export default router;
