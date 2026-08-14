import { query } from '../config/db.js';

export const getTestimonials = async (req, res) => {
  try {
    const result = await query('SELECT * FROM testimonials ORDER BY id ASC');
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
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
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [quote, author, title || 'Client', company, avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', rating || 5]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error in createTestimonial:', error);
    res.status(500).json({ success: false, message: 'Server error creating testimonial', error: error.message });
  }
};
