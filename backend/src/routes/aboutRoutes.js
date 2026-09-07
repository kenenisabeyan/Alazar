import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getAboutPageData,
  getAdminAboutFullData,
  updateAboutProfile,
  capabilityCrud,
  disciplineCrud,
  expertiseCrud,
  tagCrud,
  statisticCrud,
  skillCategoryCrud,
  skillCrud,
  softwareCrud,
  workExperienceCrud,
  achievementCrud,
  awardCrud,
  gearCategoryCrud,
  gearCrud,
  btsCategoryCrud,
  btsMediaCrud,
  ctaBenefitCrud,
  socialLinkCrud,
  sectionCrud,
  updateAvailability,
  updateCtaSection,
  updateContactInformation,
  updateFooterSettings
} from '../controllers/aboutController.js';

const router = express.Router();

// ── Public Endpoint ─────────────────────────────────────────────────────────
router.get('/data', getAboutPageData);

// ── Admin Protected Endpoints ───────────────────────────────────────────────
router.use('/admin', requireAuth);

router.get('/admin/full', getAdminAboutFullData);
router.put('/admin/profile', updateAboutProfile);

// Helper function to attach standard CRUD routes for a given entity
const registerCrudRoutes = (path, crud) => {
  router.post(`/admin/${path}`, crud.create);
  router.put(`/admin/${path}/:id`, crud.update);
  router.delete(`/admin/${path}/:id`, crud.delete);
  router.patch(`/admin/${path}/:id/toggle`, crud.toggleVisibility);
  router.patch(`/admin/${path}/reorder`, crud.reorder);
};

registerCrudRoutes('capabilities', capabilityCrud);
registerCrudRoutes('disciplines', disciplineCrud);
registerCrudRoutes('expertise', expertiseCrud);
registerCrudRoutes('tags', tagCrud);
registerCrudRoutes('statistics', statisticCrud);
registerCrudRoutes('skill-categories', skillCategoryCrud);
registerCrudRoutes('skills', skillCrud);
registerCrudRoutes('software', softwareCrud);
registerCrudRoutes('work-experience', workExperienceCrud);
registerCrudRoutes('achievements', achievementCrud);
registerCrudRoutes('awards', awardCrud);
registerCrudRoutes('gear-categories', gearCategoryCrud);
registerCrudRoutes('gear', gearCrud);
registerCrudRoutes('bts-categories', btsCategoryCrud);
registerCrudRoutes('bts-media', btsMediaCrud);
registerCrudRoutes('cta-benefits', ctaBenefitCrud);
registerCrudRoutes('social-links', socialLinkCrud);
registerCrudRoutes('sections', sectionCrud);

router.put('/admin/availability', updateAvailability);
router.put('/admin/cta', updateCtaSection);
router.put('/admin/contact', updateContactInformation);
router.put('/admin/footer', updateFooterSettings);

export default router;
