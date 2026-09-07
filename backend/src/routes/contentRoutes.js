import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getFaqs, createFaq, updateFaq, deleteFaq,
  getGear, createGear, updateGear, deleteGear,
  getAwards, createAward, updateAward, deleteAward,
  getSkills, createSkill, updateSkill, deleteSkill,
  getCareer, createCareer, updateCareer, deleteCareer,
  getClientLogos, createClientLogo, updateClientLogo, deleteClientLogo,
  getBtsGallery, createBtsItem, updateBtsItem, deleteBtsItem,
  getColorGrading, createColorGrading, updateColorGrading, deleteColorGrading,
  getGuarantees, createGuarantee, updateGuarantee, deleteGuarantee,
  getPricingOptions, createPricingOption, updatePricingOption, deletePricingOption,
  getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink,
  getPageSections, updatePageSection,
  getCaseStudies, createCaseStudy, updateCaseStudy, deleteCaseStudy,
} from '../controllers/contentController.js';

const router = express.Router();

// ── FAQs ──────────────────────────────────────────────────────────────────────
router.get('/faqs', getFaqs);
router.post('/faqs', requireAuth, createFaq);
router.put('/faqs/:id', requireAuth, updateFaq);
router.delete('/faqs/:id', requireAuth, deleteFaq);

// ── Gear ──────────────────────────────────────────────────────────────────────
router.get('/gear', getGear);
router.post('/gear', requireAuth, createGear);
router.put('/gear/:id', requireAuth, updateGear);
router.delete('/gear/:id', requireAuth, deleteGear);

// ── Awards ────────────────────────────────────────────────────────────────────
router.get('/awards', getAwards);
router.post('/awards', requireAuth, createAward);
router.put('/awards/:id', requireAuth, updateAward);
router.delete('/awards/:id', requireAuth, deleteAward);

// ── Skills ────────────────────────────────────────────────────────────────────
router.get('/skills', getSkills);
router.post('/skills', requireAuth, createSkill);
router.put('/skills/:id', requireAuth, updateSkill);
router.delete('/skills/:id', requireAuth, deleteSkill);

// ── Career Experience ─────────────────────────────────────────────────────────
router.get('/career', getCareer);
router.post('/career', requireAuth, createCareer);
router.put('/career/:id', requireAuth, updateCareer);
router.delete('/career/:id', requireAuth, deleteCareer);

// ── Client Logos ──────────────────────────────────────────────────────────────
router.get('/client-logos', getClientLogos);
router.post('/client-logos', requireAuth, createClientLogo);
router.put('/client-logos/:id', requireAuth, updateClientLogo);
router.delete('/client-logos/:id', requireAuth, deleteClientLogo);

// ── BTS Gallery ───────────────────────────────────────────────────────────────
router.get('/bts-gallery', getBtsGallery);
router.post('/bts-gallery', requireAuth, createBtsItem);
router.put('/bts-gallery/:id', requireAuth, updateBtsItem);
router.delete('/bts-gallery/:id', requireAuth, deleteBtsItem);

// ── Color Grading Samples ─────────────────────────────────────────────────────
router.get('/color-grading', getColorGrading);
router.post('/color-grading', requireAuth, createColorGrading);
router.put('/color-grading/:id', requireAuth, updateColorGrading);
router.delete('/color-grading/:id', requireAuth, deleteColorGrading);

// ── Hiring Guarantees ─────────────────────────────────────────────────────────
router.get('/guarantees', getGuarantees);
router.post('/guarantees', requireAuth, createGuarantee);
router.put('/guarantees/:id', requireAuth, updateGuarantee);
router.delete('/guarantees/:id', requireAuth, deleteGuarantee);

// ── Pricing Options ───────────────────────────────────────────────────────────
router.get('/pricing', getPricingOptions);
router.post('/pricing', requireAuth, createPricingOption);
router.put('/pricing/:id', requireAuth, updatePricingOption);
router.delete('/pricing/:id', requireAuth, deletePricingOption);

// ── Social Links ──────────────────────────────────────────────────────────────
router.get('/social-links', getSocialLinks);
router.post('/social-links', requireAuth, createSocialLink);
router.put('/social-links/:id', requireAuth, updateSocialLink);
router.delete('/social-links/:id', requireAuth, deleteSocialLink);

// ── Page Sections ─────────────────────────────────────────────────────────────
router.get('/page-sections', getPageSections);
router.put('/page-sections/:id', requireAuth, updatePageSection);

// ── Case Studies ──────────────────────────────────────────────────────────────
router.get('/case-studies', getCaseStudies);
router.post('/case-studies', requireAuth, createCaseStudy);
router.put('/case-studies/:id', requireAuth, updateCaseStudy);
router.delete('/case-studies/:id', requireAuth, deleteCaseStudy);

export default router;
