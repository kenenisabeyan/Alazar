import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getPublicPortfolioData,
  getProjectBySlugOrId,
  getAdminPortfolioFullData,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectFeatured
} from '../controllers/portfolioController.js';

const router = express.Router();

// ── Public Routes ────────────────────────────────────────────────────────────
router.get('/data', getPublicPortfolioData);
router.get('/project/:identifier', getProjectBySlugOrId);

// ── Admin Protected Routes ──────────────────────────────────────────────────
router.use('/admin', requireAuth);

router.get('/admin/full', getAdminPortfolioFullData);
router.post('/admin/projects', createProject);
router.put('/admin/projects/:id', updateProject);
router.delete('/admin/projects/:id', deleteProject);
router.patch('/admin/projects/:id/toggle-featured', toggleProjectFeatured);

export default router;
