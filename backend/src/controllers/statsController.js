import { query } from '../config/db.js';

export const getStats = async (req, res) => {
  try {
    const statsResult = await query('SELECT * FROM stats ORDER BY id ASC', []);
    const projectsResult = await query('SELECT COUNT(*) FROM projects', []);
    const inquiriesResult = await query('SELECT COUNT(*) FROM inquiries', []);

    res.json({
      success: true,
      data: {
        stats: statsResult.rows,
        totalProjects: parseInt(projectsResult.rows[0]?.count || 0),
        totalInquiries: parseInt(inquiriesResult.rows[0]?.count || 0),
      }
    });
  } catch (error) {
    console.error('Error in getStats:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving stats', error: error.message });
  }
};

export const updateStat = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, label } = req.body;

    if (!value) return res.status(400).json({ success: false, message: 'Value is required' });

    const result = await query(
      `UPDATE stats SET value = $1, label = COALESCE($2, label) WHERE key_name = $3 RETURNING *`,
      [value, label, key]
    );

    if (result.rowCount === 0) {
      // Upsert if not found
      const upsert = await query(
        `INSERT INTO stats (key_name, value, label) VALUES ($1, $2, $3)
         ON CONFLICT (key_name) DO UPDATE SET value = EXCLUDED.value, label = EXCLUDED.label
         RETURNING *`,
        [key, value, label || key]
      );
      return res.json({ success: true, data: upsert.rows[0] });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating stat', error: error.message });
  }
};
