import { query, saveMemoryStoreToDisk, memoryStore } from '../config/db.js';

/**
 * GET /api/settings
 * Returns all site settings as a flat key→value map.
 */
export const getSettings = async (req, res) => {
  try {
    const result = await query('SELECT * FROM site_settings ORDER BY key ASC', []);
    const map = {};
    result.rows.forEach(row => { map[row.key] = row.value; });
    res.json({ success: true, data: map });
  } catch (err) {
    console.error('Error in getSettings:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving settings' });
  }
};

/**
 * PUT /api/settings
 * Batch update: body is { key: value, key2: value2, ... }
 */
export const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ success: false, message: 'Body must be a settings object' });
    }

    const entries = Object.entries(updates);
    for (const [key, value] of entries) {
      await query(
        `INSERT INTO site_settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
        [key, String(value)]
      );
    }

    res.json({ success: true, message: `${entries.length} settings updated`, count: entries.length });
  } catch (err) {
    console.error('Error in updateSettings:', err);
    res.status(500).json({ success: false, message: 'Server error updating settings' });
  }
};
