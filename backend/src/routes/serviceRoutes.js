import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getServices,
  getAdminServicesFullData,
  createService,
  updateService,
  deleteService,
  createEstimateRequest
} from '../controllers/serviceController.js';

const router = express.Router();

// Public Routes
router.get('/', getServices);
router.post('/estimate-request', createEstimateRequest);

// Admin Protected Routes
router.use('/admin', requireAuth);
router.get('/admin/full', getAdminServicesFullData);
router.post('/admin/services', createService);
router.put('/admin/services/:id', updateService);
router.delete('/admin/services/:id', deleteService);

export default router;
