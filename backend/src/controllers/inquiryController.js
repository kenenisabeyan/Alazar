import { query } from '../config/db.js';

// Helper: Generate unique inquiry reference code (e.g. INQ-2026-000101)
const generateReferenceNumber = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `INQ-${year}-${randomNum}`;
};

// Default Contact Settings & Metadata
const defaultContactSettings = {
  hero: {
    eyebrow: "Direct PostgreSQL Sync",
    title: "Let's Build Something Great.",
    description: "Ready to start your next video or design project? Fill out the brief below — your inquiry goes straight into the PERN backend.",
    isVisible: true
  },
  metaItems: [
    { id: 1, label: 'Email', value: 'a.asdesach1@gmail.com', copyable: true, type: 'email' },
    { id: 2, label: 'Phone / WhatsApp', value: '+1 (555) 123-4567', copyable: true, type: 'phone' },
    { id: 3, label: 'Response Time', value: 'Within 24 hours', copyable: false, type: 'info' }
  ],
  availability: {
    statusText: "Accepting Q3 / Q4 Projects Worldwide",
    isAvailable: true
  },
  budgetRanges: [
    { value: 'under-3k', label: '< $3,000' },
    { value: '$3k - $5k', label: '$3,000 – $5,000' },
    { value: '$5k - $10k', label: '$5,000 – $10,000' },
    { value: '$10k+', label: '$10,000+' }
  ],
  serviceTypes: [
    { value: 'freelance-video', label: 'Video Editing & Color Grading' },
    { value: 'freelance-design', label: 'Brand Design & Graphics' },
    { value: 'in-person', label: 'On-Set Filming & Directing' },
    { value: 'full-package', label: 'Full Package (Video + Design)' }
  ]
};

let currentContactSettings = { ...defaultContactSettings };

// ── Public Contact Aggregator ────────────────────────────────────────────────
export const getPublicContactData = async (req, res) => {
  try {
    res.json({
      success: true,
      data: currentContactSettings
    });
  } catch (error) {
    console.error('Error in getPublicContactData:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving contact metadata' });
  }
};

// ── Update Contact Settings (Admin CMS) ──────────────────────────────────────
export const updateContactSettings = async (req, res) => {
  try {
    const { hero, metaItems, availability, budgetRanges, serviceTypes } = req.body;

    if (hero) currentContactSettings.hero = { ...currentContactSettings.hero, ...hero };
    if (metaItems) currentContactSettings.metaItems = metaItems;
    if (availability) currentContactSettings.availability = { ...currentContactSettings.availability, ...availability };
    if (budgetRanges) currentContactSettings.budgetRanges = budgetRanges;
    if (serviceTypes) currentContactSettings.serviceTypes = serviceTypes;

    res.json({
      success: true,
      message: 'Contact page settings updated successfully',
      data: currentContactSettings
    });
  } catch (error) {
    console.error('Error in updateContactSettings:', error);
    res.status(500).json({ success: false, message: 'Failed to update contact settings' });
  }
};

// ── Create Inquiry (Form Submission) ─────────────────────────────────────────
export const createInquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, projectType, budget, details } = req.body;

    if (!firstName || !email || !details) {
      return res.status(400).json({
        success: false,
        message: 'First name, email, and project details are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const refNumber = generateReferenceNumber();

    const result = await query(
      `INSERT INTO inquiries (first_name, last_name, email, project_type, budget, details, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'new')
       RETURNING *`,
      [firstName, lastName || '', email, projectType || 'freelance-video', budget || '$3k - $5k', details]
    );

    const createdInquiry = {
      ...result.rows[0],
      reference_number: refNumber,
      priority: 'medium'
    };

    res.status(201).json({
      success: true,
      message: `Your inquiry has been received! Reference: ${refNumber}`,
      referenceNumber: refNumber,
      data: createdInquiry
    });
  } catch (error) {
    console.error('Error in createInquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry',
      error: error.message
    });
  }
};

// ── Get all inquiries (Admin CRM) ─────────────────────────────────────────────
export const getInquiries = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    let sql = 'SELECT * FROM inquiries WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }

    if (priority && priority !== 'all') {
      params.push(priority);
      sql += ` AND priority = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      sql += ` AND (LOWER(first_name) LIKE $${params.length} OR LOWER(last_name) LIKE $${params.length} OR LOWER(email) LIKE $${params.length} OR LOWER(details) LIKE $${params.length})`;
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);

    // Decorate rows with reference numbers & priority
    const decoratedRows = (result.rows || []).map((row, idx) => ({
      ...row,
      reference_number: row.reference_number || `INQ-2026-${String(1000 + (row.id || idx)).padStart(6, '0')}`,
      priority: row.priority || 'medium',
      notes: row.notes || []
    }));

    res.json({
      success: true,
      count: decoratedRows.length,
      data: decoratedRows
    });
  } catch (error) {
    console.error('Error in getInquiries:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving inquiries', error: error.message });
  }
};

// ── Update Inquiry Status ───────────────────────────────────────────────────
export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await query(
      `UPDATE inquiries 
       SET status = $1 
       WHERE id = $2 
       RETURNING *`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, message: 'Inquiry status updated', data: result.rows[0] });
  } catch (error) {
    console.error('Error in updateInquiryStatus:', error);
    res.status(500).json({ success: false, message: 'Server error updating inquiry', error: error.message });
  }
};

// ── Update Inquiry Priority ──────────────────────────────────────────────────
export const updateInquiryPriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    const result = await query(
      `UPDATE inquiries 
       SET priority = $1 
       WHERE id = $2 
       RETURNING *`,
      [priority, id]
    );

    res.json({ success: true, message: 'Inquiry priority updated', data: result.rows[0] || { id, priority } });
  } catch (error) {
    console.error('Error updating priority:', error);
    res.status(500).json({ success: false, message: 'Error updating priority' });
  }
};

// ── Delete Inquiry ────────────────────────────────────────────────────────────
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM inquiries WHERE id = $1 RETURNING *', [id]);

    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Error in deleteInquiry:', error);
    res.status(500).json({ success: false, message: 'Server error deleting inquiry', error: error.message });
  }
};
