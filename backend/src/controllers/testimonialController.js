import { query } from '../config/db.js';

export const getTestimonials = async (req, res) => {
  try {
    const result = await query('SELECT * FROM testimonials ORDER BY id ASC', []);
    res.json({ success: true, count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error('Error in getTestimonials:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving testimonials', error: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { quote, author, title, company, avatar, rating } = req.body;
    if (!quote || !author || !company) {
      return res.status(400).json({ success: false, message: 'Quote, author and company are required' });
    }
    const result = await query(
      `INSERT INTO testimonials (quote, author, title, company, avatar, rating)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [quote, author, title || 'Client', company, avatar || '', rating || 5]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error in createTestimonial:', error);
    res.status(500).json({ success: false, message: 'Server error creating testimonial', error: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { quote, author, title, company, avatar, rating } = req.body;
    const result = await query(
      `UPDATE testimonials SET
         quote   = COALESCE($1, quote),
         author  = COALESCE($2, author),
         title   = COALESCE($3, title),
         company = COALESCE($4, company),
         avatar  = COALESCE($5, avatar),
         rating  = COALESCE($6, rating),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
      [quote, author, title, company, avatar, rating, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating testimonial', error: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const result = await query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting testimonial', error: error.message });
  }
};
