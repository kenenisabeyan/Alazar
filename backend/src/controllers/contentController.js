import { query } from '../config/db.js';

/**
 * Generic Content Controller Factory
 * Creates a full CRUD controller for a given table with optional ordering.
 *
 * Tables supported:
 *   faqs, gear, awards, client_logos, hiring_guarantees,
 *   skills, career_experience, color_grading_samples, bts_gallery,
 *   pricing_options, page_sections
 */

// ─── FAQs ────────────────────────────────────────────────────────────────────
export const getFaqs = async (req, res) => {
  try {
    const r = await query('SELECT * FROM faqs ORDER BY sort_order ASC, id ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createFaq = async (req, res) => {
  try {
    const { question, answer, sort_order } = req.body;
    if (!question || !answer) return res.status(400).json({ success: false, message: 'Question and answer required' });
    const r = await query(
      `INSERT INTO faqs (question, answer, sort_order) VALUES ($1, $2, $3) RETURNING *`,
      [question, answer, sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateFaq = async (req, res) => {
  try {
    const { question, answer, sort_order } = req.body;
    const r = await query(
      `UPDATE faqs SET question = COALESCE($1, question), answer = COALESCE($2, answer),
       sort_order = COALESCE($3, sort_order), updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *`,
      [question, answer, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteFaq = async (req, res) => {
  try {
    const r = await query('DELETE FROM faqs WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Gear ────────────────────────────────────────────────────────────────────
export const getGear = async (req, res) => {
  try {
    const r = await query('SELECT * FROM gear ORDER BY category ASC, sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createGear = async (req, res) => {
  try {
    const { category, name, description, sort_order } = req.body;
    if (!category || !name) return res.status(400).json({ success: false, message: 'Category and name required' });
    const r = await query(
      `INSERT INTO gear (category, name, description, sort_order) VALUES ($1, $2, $3, $4) RETURNING *`,
      [category, name, description || '', sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateGear = async (req, res) => {
  try {
    const { category, name, description, sort_order } = req.body;
    const r = await query(
      `UPDATE gear SET category = COALESCE($1, category), name = COALESCE($2, name),
       description = COALESCE($3, description), sort_order = COALESCE($4, sort_order),
       updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *`,
      [category, name, description, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Gear item not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteGear = async (req, res) => {
  try {
    const r = await query('DELETE FROM gear WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Gear item not found' });
    res.json({ success: true, message: 'Gear item deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Awards ───────────────────────────────────────────────────────────────────
export const getAwards = async (req, res) => {
  try {
    const r = await query('SELECT * FROM awards ORDER BY year DESC, sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createAward = async (req, res) => {
  try {
    const { year, title, project, sort_order } = req.body;
    if (!year || !title) return res.status(400).json({ success: false, message: 'Year and title required' });
    const r = await query(
      `INSERT INTO awards (year, title, project, sort_order) VALUES ($1, $2, $3, $4) RETURNING *`,
      [year, title, project || '', sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateAward = async (req, res) => {
  try {
    const { year, title, project, sort_order } = req.body;
    const r = await query(
      `UPDATE awards SET year = COALESCE($1, year), title = COALESCE($2, title),
       project = COALESCE($3, project), sort_order = COALESCE($4, sort_order) WHERE id = $5 RETURNING *`,
      [year, title, project, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Award not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteAward = async (req, res) => {
  try {
    const r = await query('DELETE FROM awards WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Award not found' });
    res.json({ success: true, message: 'Award deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Skills ───────────────────────────────────────────────────────────────────
export const getSkills = async (req, res) => {
  try {
    const r = await query('SELECT * FROM skills ORDER BY category ASC, sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createSkill = async (req, res) => {
  try {
    const { category, name, level, description, sort_order } = req.body;
    if (!category || !name) return res.status(400).json({ success: false, message: 'Category and name required' });
    const r = await query(
      `INSERT INTO skills (category, name, level, description, sort_order) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [category, name, level || 80, description || '', sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateSkill = async (req, res) => {
  try {
    const { category, name, level, description, sort_order } = req.body;
    const r = await query(
      `UPDATE skills SET category = COALESCE($1, category), name = COALESCE($2, name),
       level = COALESCE($3, level), description = COALESCE($4, description),
       sort_order = COALESCE($5, sort_order), updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *`,
      [category, name, level, description, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteSkill = async (req, res) => {
  try {
    const r = await query('DELETE FROM skills WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, message: 'Skill deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Career Experience ────────────────────────────────────────────────────────
export const getCareer = async (req, res) => {
  try {
    const r = await query('SELECT * FROM career_experience ORDER BY sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createCareer = async (req, res) => {
  try {
    const { period, role, company, location, description, achievements, sort_order } = req.body;
    if (!period || !role || !company) return res.status(400).json({ success: false, message: 'Period, role, company required' });
    const r = await query(
      `INSERT INTO career_experience (period, role, company, location, description, achievements, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [period, role, company, location || '', description || '', achievements || [], sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateCareer = async (req, res) => {
  try {
    const { period, role, company, location, description, achievements, sort_order } = req.body;
    const r = await query(
      `UPDATE career_experience SET period = COALESCE($1, period), role = COALESCE($2, role),
       company = COALESCE($3, company), location = COALESCE($4, location),
       description = COALESCE($5, description), achievements = COALESCE($6, achievements),
       sort_order = COALESCE($7, sort_order), updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *`,
      [period, role, company, location, description, achievements, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Career entry not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteCareer = async (req, res) => {
  try {
    const r = await query('DELETE FROM career_experience WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Career entry not found' });
    res.json({ success: true, message: 'Career entry deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Client Logos ─────────────────────────────────────────────────────────────
export const getClientLogos = async (req, res) => {
  try {
    const r = await query('SELECT * FROM client_logos ORDER BY sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createClientLogo = async (req, res) => {
  try {
    const { name, display_text, logo_url, sort_order } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required' });
    const r = await query(
      `INSERT INTO client_logos (name, display_text, logo_url, sort_order) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, display_text || name, logo_url || null, sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateClientLogo = async (req, res) => {
  try {
    const { name, display_text, logo_url, sort_order } = req.body;
    const r = await query(
      `UPDATE client_logos SET name = COALESCE($1, name), display_text = COALESCE($2, display_text),
       logo_url = COALESCE($3, logo_url), sort_order = COALESCE($4, sort_order) WHERE id = $5 RETURNING *`,
      [name, display_text, logo_url, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Logo not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteClientLogo = async (req, res) => {
  try {
    const r = await query('DELETE FROM client_logos WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Logo not found' });
    res.json({ success: true, message: 'Client logo deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── BTS Gallery ──────────────────────────────────────────────────────────────
export const getBtsGallery = async (req, res) => {
  try {
    const r = await query('SELECT * FROM bts_gallery ORDER BY sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createBtsItem = async (req, res) => {
  try {
    const { title, location, image, caption, sort_order } = req.body;
    if (!title || !image) return res.status(400).json({ success: false, message: 'Title and image required' });
    const r = await query(
      `INSERT INTO bts_gallery (title, location, image, caption, sort_order) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, location || '', image, caption || '', sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateBtsItem = async (req, res) => {
  try {
    const { title, location, image, caption, sort_order } = req.body;
    const r = await query(
      `UPDATE bts_gallery SET title = COALESCE($1, title), location = COALESCE($2, location),
       image = COALESCE($3, image), caption = COALESCE($4, caption),
       sort_order = COALESCE($5, sort_order) WHERE id = $6 RETURNING *`,
      [title, location, image, caption, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'BTS item not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteBtsItem = async (req, res) => {
  try {
    const r = await query('DELETE FROM bts_gallery WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'BTS item not found' });
    res.json({ success: true, message: 'BTS item deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Color Grading Samples ────────────────────────────────────────────────────
export const getColorGrading = async (req, res) => {
  try {
    const r = await query('SELECT * FROM color_grading_samples ORDER BY sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createColorGrading = async (req, res) => {
  try {
    const { title, log_image, graded_image, camera, color_space, lut, iso, sort_order } = req.body;
    if (!title || !log_image || !graded_image) return res.status(400).json({ success: false, message: 'Title, log_image, graded_image required' });
    const r = await query(
      `INSERT INTO color_grading_samples (title, log_image, graded_image, camera, color_space, lut, iso, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [title, log_image, graded_image, camera || '', color_space || '', lut || '', iso || '', sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateColorGrading = async (req, res) => {
  try {
    const { title, log_image, graded_image, camera, color_space, lut, iso, sort_order } = req.body;
    const r = await query(
      `UPDATE color_grading_samples SET title = COALESCE($1, title), log_image = COALESCE($2, log_image),
       graded_image = COALESCE($3, graded_image), camera = COALESCE($4, camera),
       color_space = COALESCE($5, color_space), lut = COALESCE($6, lut),
       iso = COALESCE($7, iso), sort_order = COALESCE($8, sort_order) WHERE id = $9 RETURNING *`,
      [title, log_image, graded_image, camera, color_space, lut, iso, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Sample not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteColorGrading = async (req, res) => {
  try {
    const r = await query('DELETE FROM color_grading_samples WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Sample not found' });
    res.json({ success: true, message: 'Color grading sample deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Hiring Guarantees ────────────────────────────────────────────────────────
export const getGuarantees = async (req, res) => {
  try {
    const r = await query('SELECT * FROM hiring_guarantees ORDER BY sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createGuarantee = async (req, res) => {
  try {
    const { title, description, sort_order } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title required' });
    const r = await query(
      `INSERT INTO hiring_guarantees (title, description, sort_order) VALUES ($1, $2, $3) RETURNING *`,
      [title, description || '', sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateGuarantee = async (req, res) => {
  try {
    const { title, description, sort_order } = req.body;
    const r = await query(
      `UPDATE hiring_guarantees SET title = COALESCE($1, title), description = COALESCE($2, description),
       sort_order = COALESCE($3, sort_order) WHERE id = $4 RETURNING *`,
      [title, description, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Guarantee not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteGuarantee = async (req, res) => {
  try {
    const r = await query('DELETE FROM hiring_guarantees WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Guarantee not found' });
    res.json({ success: true, message: 'Guarantee deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Pricing Options ──────────────────────────────────────────────────────────
export const getPricingOptions = async (req, res) => {
  try {
    const r = await query('SELECT * FROM pricing_options ORDER BY type ASC, sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createPricingOption = async (req, res) => {
  try {
    const { type, option_id, label, base_price, multiplier, price, sort_order } = req.body;
    if (!type || !option_id || !label) return res.status(400).json({ success: false, message: 'Type, option_id, label required' });
    const r = await query(
      `INSERT INTO pricing_options (type, option_id, label, base_price, multiplier, price, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [type, option_id, label, base_price || null, multiplier || null, price || null, sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updatePricingOption = async (req, res) => {
  try {
    const { label, base_price, multiplier, price, sort_order } = req.body;
    const r = await query(
      `UPDATE pricing_options SET label = COALESCE($1, label), base_price = COALESCE($2, base_price),
       multiplier = COALESCE($3, multiplier), price = COALESCE($4, price),
       sort_order = COALESCE($5, sort_order) WHERE id = $6 RETURNING *`,
      [label, base_price, multiplier, price, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Pricing option not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deletePricingOption = async (req, res) => {
  try {
    const r = await query('DELETE FROM pricing_options WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Pricing option not found' });
    res.json({ success: true, message: 'Pricing option deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Social Links ──────────────────────────────────────────────────────────────
export const getSocialLinks = async (req, res) => {
  try {
    const r = await query('SELECT * FROM social_links ORDER BY sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createSocialLink = async (req, res) => {
  try {
    const { name, url, handle, type, sort_order } = req.body;
    if (!name || !url) return res.status(400).json({ success: false, message: 'Name and URL required' });
    const r = await query(
      `INSERT INTO social_links (name, url, handle, type, sort_order) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, url, handle || '', type || 'link', sort_order || 0]
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateSocialLink = async (req, res) => {
  try {
    const { name, url, handle, type, sort_order } = req.body;
    const r = await query(
      `UPDATE social_links SET name = COALESCE($1, name), url = COALESCE($2, url),
       handle = COALESCE($3, handle), type = COALESCE($4, type),
       sort_order = COALESCE($5, sort_order) WHERE id = $6 RETURNING *`,
      [name, url, handle, type, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Social link not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteSocialLink = async (req, res) => {
  try {
    const r = await query('DELETE FROM social_links WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Social link not found' });
    res.json({ success: true, message: 'Social link deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Page Sections (Visibility Toggles) ──────────────────────────────────────
export const getPageSections = async (req, res) => {
  try {
    const r = await query('SELECT * FROM page_sections ORDER BY page ASC, sort_order ASC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updatePageSection = async (req, res) => {
  try {
    const { visible, sort_order } = req.body;
    const r = await query(
      `UPDATE page_sections SET visible = COALESCE($1, visible), sort_order = COALESCE($2, sort_order) WHERE id = $3 RETURNING *`,
      [visible, sort_order, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Section not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// ─── Case Studies (add full CRUD to existing) ─────────────────────────────────
export const getCaseStudies = async (req, res) => {
  try {
    const r = await query('SELECT * FROM case_studies ORDER BY created_at DESC', []);
    res.json({ success: true, data: r.rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const createCaseStudy = async (req, res) => {
  try {
    const { client, project, metric, metric_label, result, deliverables, image } = req.body;
    if (!client || !project) return res.status(400).json({ success: false, message: 'Client and project required' });
    const r = await query(
      `INSERT INTO case_studies (client, project, metric, metric_label, result, deliverables, image)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [client, project, metric || '', metric_label || '', result || '', deliverables || [], image || '']
    );
    res.status(201).json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const updateCaseStudy = async (req, res) => {
  try {
    const { client, project, metric, metric_label, result, deliverables, image } = req.body;
    const r = await query(
      `UPDATE case_studies SET client = COALESCE($1, client), project = COALESCE($2, project),
       metric = COALESCE($3, metric), metric_label = COALESCE($4, metric_label),
       result = COALESCE($5, result), deliverables = COALESCE($6, deliverables),
       image = COALESCE($7, image) WHERE id = $8 RETURNING *`,
      [client, project, metric, metric_label, result, deliverables, image, req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Case study not found' });
    res.json({ success: true, data: r.rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
export const deleteCaseStudy = async (req, res) => {
  try {
    const r = await query('DELETE FROM case_studies WHERE id = $1 RETURNING *', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ success: false, message: 'Case study not found' });
    res.json({ success: true, message: 'Case study deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
