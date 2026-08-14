import { query } from '../config/db.js';

export const getStats = async (req, res) => {
  try {
    const statsResult = await query('SELECT * FROM stats ORDER BY id ASC');
    const projectCountResult = await query('SELECT COUNT(*) FROM projects');
    const inquiryCountResult = await query('SELECT COUNT(*) FROM inquiries');

    res.json({
      success: true,
      data: {
        stats: statsResult.rows,
        totalProjects: parseInt(projectCountResult.rows[0].count, 10),
        totalInquiries: parseInt(inquiryCountResult.rows[0].count, 10)
      }
    });
  } catch (error) {
    console.error('Error in getStats:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving stats', error: error.message });
  }
};
