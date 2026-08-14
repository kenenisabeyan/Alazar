import { query } from '../config/db.js';

// Create a new inquiry (Contact Form Submission)
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

    const result = await query(
      `INSERT INTO inquiries (first_name, last_name, email, project_type, budget, details, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'new')
       RETURNING *`,
      [firstName, lastName || '', email, projectType || 'freelance-video', budget || '$3k - $5k', details]
    );

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received! Alazar will contact you shortly.',
      data: result.rows[0]
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

// Get all inquiries (Admin)
export const getInquiries = async (req, res) => {
  try {
    const { status } = req.query;
    let sql = 'SELECT * FROM inquiries';
    const params = [];

    if (status) {
      params.push(status);
      sql += ' WHERE status = $1';
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (error) {
    console.error('Error in getInquiries:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving inquiries', error: error.message });
  }
};

// Update inquiry status (Admin: 'new', 'read', 'contacted', 'archived')
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

// Delete inquiry (Admin)
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM inquiries WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Error in deleteInquiry:', error);
    res.status(500).json({ success: false, message: 'Server error deleting inquiry', error: error.message });
  }
};
