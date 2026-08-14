import { query } from '../config/db.js';

export const getServices = async (req, res) => {
  try {
    const result = await query('SELECT * FROM services ORDER BY id ASC');
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (error) {
    console.error('Error in getServices:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving services', error: error.message });
  }
};
